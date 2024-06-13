<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\RecipeIngredient;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class RecipeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $kitchen = $request->query('kitchen');
        $category = $request->query('category');
        $minCookingTime = $request->query('minCookingTime');
        $maxCookingTime = $request->query('maxCookingTime');

        $builder = DB::table('recipes')
            ->join('kitchens', 'kitchen_id', '=', 'kitchens.id')
            ->join('categories', 'category_id', '=', 'categories.id')
            ->join('users', 'user_id', '=', 'users.id')
            ->leftJoin('likes', 'recipes.id', '=', 'likes.recipe_id')
            ->select('recipes.*', 'kitchens.kitchen', 'categories.category', 'users.name', DB::raw('COUNT(likes.id) as like_count'))
            ->groupBy('recipes.id', 'kitchens.kitchen', 'categories.category', 'users.name')
            ->orderByDesc('like_count');


        if ($minCookingTime > 0 && $maxCookingTime > 0) {
            $builder->whereBetween('recipes.cookingTime', [$minCookingTime, $maxCookingTime]);
        } elseif ($maxCookingTime > 0) {
            $builder->where('recipes.cookingTime', '<=', $maxCookingTime);
        }

        if ($search) {
            $builder->where('recipes.title', 'like', "%{$search}%");
            $builder->where('recipes.moderated', '=', 'approved');
        }
        if ($kitchen) {
            $builder->where('kitchens.id', '=', "{$kitchen}");
            $builder->where('recipes.moderated', '=', 'approved');
        }
        if ($category) {
            $builder->where('categories.id', '=', "$category");
            $builder->where('recipes.moderated', '=', 'approved');
        }
        if ($kitchen && $category && $search) {
            $builder->where([
                ['kitchens.id', '=', "$kitchen"],
                ['categories.id', '=', "$category"],
                ['recipes.title', 'like', "%{$search}%"],
                ['recipes.moderated', '=', 'approved']
            ]);
        }

        $recipes = $builder->where('recipes.moderated', '=', 'approved')->get();
        foreach ($recipes as $recipe) {
            $recipe->recipeImage = base64_encode(Storage::get(str_replace('/storage', 'public/', $recipe->recipeImage)));
        }
        return $recipes;
        // ToDo paginate
    }

    public function show($id)
    {
        $recipe = DB::table('recipes')
            ->join('kitchens', 'kitchen_id', '=', 'kitchens.id')
            ->join('categories', 'category_id', '=', 'categories.id')
            ->join('users', 'user_id', '=', 'users.id')
            ->leftJoin('likes', 'recipes.id', '=', 'likes.recipe_id')
            ->select('recipes.*', 'kitchens.kitchen', 'categories.category', 'users.name', 'users.image')
            ->where('recipes.id', '=', "{$id}")
            ->groupBy('recipes.id', 'kitchens.kitchen', 'categories.category', 'users.name', 'users.image')
            ->first();

        $recipeArray = (array) $recipe;
        $recipeArray['recipeImage'] = base64_encode(Storage::get(str_replace('/storage', 'public/', $recipeArray['recipeImage'])));
        $recipeArray['image'] = base64_encode(Storage::get(str_replace('/storage', 'public/', $recipeArray['image'])));

        $likedUserIds = DB::table('likes')
            ->where('recipe_id', '=', $id)
            ->pluck('user_id')
            ->toArray();

        $recipeArray['likedUserIds'] = $likedUserIds;
        $recipeArray['likeCount'] = count($likedUserIds);

        return $recipeArray;
    }
    public function getIngredients($id)
    {
        return DB::table('recipe_ingredients')
            ->join('ingredients', 'ingredient_id', '=', 'ingredients.id')
            ->join('measures', 'measure_id', '=', 'measures.id')
            ->join('recipes', 'recipe_id', "=", 'recipes.id')
            ->select('ingredients.ingredient', 'ingredients.calories', 'ingredients.proteins', 'ingredients.fats', 'ingredients.fats', 'ingredients.carbohydrates', 'measures.measure', 'recipe_ingredients.amount')
            ->where('recipe_ingredients.recipe_id', '=', "{$id}")
            ->get();
    }
    public function getComments($id)
    {
        $comments = DB::table('comments')
            ->join('users', 'user_id', '=', 'users.id')
            ->where('comments.recipe_id', '=', "{$id}")
            ->select('users.name', 'users.image', 'comments.user_id', 'comments.text', 'comments.created_at', 'comments.recipe_id', 'comments.id')
            ->orderBy('comments.created_at', 'desc')
            ->get();
        $comments = $comments->map(function ($comment) {
            $comment->created_at = Carbon::parse($comment->created_at)->setTimezone('Europe/Moscow')->format('Y-m-d H:i');
            $comment->image = base64_encode(Storage::get(str_replace('/storage', 'public/', $comment->image)));
            return $comment;
        });

        return $comments;
    }

    public function addRecipe(Request $request)
    {
        $path = null;
        if ($request->hasFile('recipePicture')) {
            $path = $request->file('recipePicture')->store('public/recipe-pictures');
            $path = Storage::url($path);
        }
        $recipeId = DB::table('recipes')->insertGetId([
            'title' => $request['recipeName'],
            'kitchen_id' => $request['kitchen'],
            'category_id' => $request['category'],
            'user_id' => $request['user_id'],
            'cookingTime' => $request['cookingTime'],
            'text' => $request['cookingMethod'],
            'portion' => $request['portion'],
            'weight' => $request['weight'],
            'recipeImage' => $path,
            'rating' => $request['rating'],
            'moderated' => 'pending'
        ]);
        $ingredients = json_decode($request['ingredients'], true);
        foreach ($ingredients as $ingredient) {
            RecipeIngredient::insert([
                'recipe_id' => $recipeId,
                'ingredient_id' => $ingredient['ingredient_id'],
                'measure_id' => $ingredient['measure'],
                'amount' => $ingredient['amount'],
            ]);
        }
        return response('', 200);
    }
}
