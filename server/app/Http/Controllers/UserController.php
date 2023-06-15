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
            ->where('recipes.user_id', '=', $user_id)
            ->select('recipes.*', 'kitchens.kitchen', 'categories.category', 'users.name')
            ->get();

        $user->image = base64_encode(Storage::get(str_replace('/storage', 'public/', $user->image)));

        $recipeCount = $recipes->count();

        foreach ($recipes as $recipe) {
            $recipe->recipeImage = base64_encode(Storage::get(str_replace('/storage', 'public/', $recipe->recipeImage)));
        }

        $user->recipeCount = $recipeCount;

        $user->recipes = $recipes;

        return $user;
    }
}
