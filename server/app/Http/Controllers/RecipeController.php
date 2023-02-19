<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RecipeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $kitchen = $request->query('kitchen');
        $category = $request->query('category');

        $builder = DB::table('recipes')
            ->join('kitchens', 'kitchen_id', '=', 'kitchens.id')
            ->join('categories', 'category_id', '=', 'categories.id')
            ->select('recipes.*', 'kitchens.kitchen', 'categories.category');

        if ($search) {
            $builder->where('recipes.title', 'like', "%{$search}%");
        }
        if ($kitchen) {
            $builder->where('kitchens.id', '=', "{$kitchen}");
        }
        if ($category) {
            $builder->where('categories.id', '=', "$category");
        }
        if ($kitchen && $category && $search) {
            $builder->where([
                ['kitchens.id', '=', "$kitchen"],
                ['categories.id', '=', "$category"],
                ['recipes.title', 'like', "%{$search}%"]
            ]);
        }
        return $builder->get();
        // ToDo paginate
    }
    public function show($id)
    {
        $recipe = DB::table('recipes')
            ->join('kitchens', 'kitchen_id', '=', 'kitchens.id')
            ->join('categories', 'category_id', '=', 'categories.id')
            ->select('recipes.*', 'kitchens.kitchen', 'categories.category')
            ->where('recipes.id', '=', "{$id}")
            ->first();
        return $recipe;
    }
}
