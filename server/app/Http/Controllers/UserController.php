<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function show($user_id)
    {
        $user = User::findOrFail($user_id);

        $recipes = DB::table('recipes')
            ->join('kitchens', 'kitchen_id', '=', 'kitchens.id')
            ->join('categories', 'category_id', '=', 'categories.id')
            ->join('users', 'user_id', '=', 'users.id')
            ->leftJoin('likes', 'recipes.id', '=', 'likes.recipe_id')
            ->where('recipes.user_id', '=', $user_id)
            ->select('recipes.*', 'kitchens.kitchen', 'categories.category', 'users.name', DB::raw('COUNT(likes.id) as like_count'))
            ->groupBy('recipes.id')
            ->get();

        $user->image = base64_encode(Storage::get(str_replace('/storage', 'public/', $user->image)));

        $recipeCount = $recipes->count();

        foreach ($recipes as $recipe) {
            $recipe->recipeImage = base64_encode(Storage::get(str_replace('/storage', 'public/', $recipe->recipeImage)));
        }

        $user->recipeCount = $recipeCount;

        $user->recipes = $recipes;

        $mostPopularRecipe = DB::table('recipes')
            ->leftJoin('likes', 'recipes.id', '=', 'likes.recipe_id')
            ->where('recipes.user_id', $user_id)
            ->select('recipes.*', DB::raw('COUNT(likes.id) as like_count'))
            ->groupBy('recipes.id')
            ->orderByDesc('like_count')
            ->first();

        if ($mostPopularRecipe) {
            $mostPopularRecipe->recipeImage = base64_encode(Storage::get(str_replace('/storage', 'public/', $mostPopularRecipe->recipeImage)));
        }

        $user->mostPopularRecipe = $mostPopularRecipe;

        return $user;
    }

    public function getLikedRecipes($user_id)
    {
        $likedRecipeIds = DB::table('likes')
            ->where('user_id', $user_id)
            ->pluck('recipe_id')
            ->toArray();

        $recipes = DB::table('recipes')
            ->join('kitchens', 'kitchen_id', '=', 'kitchens.id')
            ->join('categories', 'category_id', '=', 'categories.id')
            ->join('users', 'user_id', '=', 'users.id')
            ->leftJoin('likes', 'recipes.id', '=', 'likes.recipe_id')
            ->whereIn('recipes.id', $likedRecipeIds)
            ->select('recipes.*', 'kitchens.kitchen', 'categories.category', 'users.name', DB::raw('COUNT(likes.id) as like_count'))
            ->groupBy('recipes.id', 'kitchens.kitchen', 'categories.category', 'users.name')
            ->orderByDesc('like_count')
            ->get();

        foreach ($recipes as $recipe) {
            $recipe->recipeImage = base64_encode(Storage::get(str_replace('/storage', 'public/', $recipe->recipeImage)));
        }

        return $recipes;
    }

    public function banUser(Request $request)
    {
        $userId = $request->input('user_id');
        $banned = $request->input('banned');
        $reason = $request->input('reason');

        DB::table('users')
            ->where('id', '=', $userId)
            ->update(['banned' => $banned, 'reason' => $reason]);
    }

    public function getUsers()
    {
        $users = DB::table('users')
            ->where('banned', 0)
            ->orWhereNull('banned')
            ->get();

        foreach ($users as $user) {
            $user->image = base64_encode(Storage::get(str_replace('/storage', 'public/', $user->image)));
        }

        return response()->json($users);
    }

    public function getBannedUsers()
    {
        $users = DB::table('users')->where('banned', 1)->get();

        foreach ($users as $user) {
            $user->image = base64_encode(Storage::get(str_replace('/storage', 'public/', $user->image)));
        }

        return response()->json($users);
    }
}
