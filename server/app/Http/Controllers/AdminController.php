<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    public function getAllRecipes()
    {
        $recipes = DB::table('recipes')
            ->join('kitchens', 'kitchen_id', '=', 'kitchens.id')
            ->join('categories', 'category_id', '=', 'categories.id')
            ->join('users', 'user_id', '=', 'users.id')
            ->leftJoin('likes', 'recipes.id', '=', 'likes.recipe_id')
            ->select('recipes.*', 'kitchens.kitchen', 'categories.category', 'users.name', DB::raw('COUNT(likes.id) as like_count'))
            ->where('recipes.moderated', '=', 'approved')
            ->groupBy('recipes.id', 'kitchens.kitchen', 'categories.category', 'users.name')
            ->orderByDesc('recipes.created_at')
            ->get();

        foreach ($recipes as $recipe) {
            $recipe->recipeImage = base64_encode(Storage::get(str_replace('/storage', 'public/', $recipe->recipeImage)));
        }
        return $recipes;
    }

    public function getPendingRecipes()
    {
        $recipes = DB::table('recipes')
            ->join('kitchens', 'kitchen_id', '=', 'kitchens.id')
            ->join('categories', 'category_id', '=', 'categories.id')
            ->join('users', 'user_id', '=', 'users.id')
            ->leftJoin('likes', 'recipes.id', '=', 'likes.recipe_id')
            ->select('recipes.*', 'kitchens.kitchen', 'categories.category', 'users.name', DB::raw('COUNT(likes.id) as like_count'))
            ->where('recipes.moderated', '=', 'pending')
            ->groupBy('recipes.id', 'kitchens.kitchen', 'categories.category', 'users.name')
            ->orderByDesc('recipes.created_at')
            ->get();

        foreach ($recipes as $recipe) {
            $recipe->recipeImage = base64_encode(Storage::get(str_replace('/storage', 'public/', $recipe->recipeImage)));
        }
        return $recipes;
    }

    public function updateRecipeStatus(Request $request)
    {
        $status = $request->input('status');
        $recipeId = $request->input('recipeId');

        DB::table('recipes')
            ->where('id', $recipeId)
            ->update(['moderated' => $status]);

        return response()->json(['message' => 'Статус рецепта успешно обновлен']);
    }
    public function deleteRecipe(Request $request)
    {
        $recipeId = $request->input('recipeId');

        DB::table('recipe_ingredients')
            ->where('recipe_id', $recipeId)
            ->delete();

        DB::table('comments')
            ->where('recipe_id', $recipeId)
            ->delete();

        DB::table('recipes')
            ->where('id', $recipeId)
            ->delete();

        return response()->json(['message' => 'Рецепт успешно удален']);
    }
}
