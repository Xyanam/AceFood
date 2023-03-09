<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IngredientController extends Controller
{
    public function getIngredients(Request $request)
    {
        $title = $request->query('title');
        $builder = DB::table('ingredients')
            ->select('ingredients.id', 'ingredients.ingredient')
            ->where('ingredients.ingredient', 'like', "%{$title}%")
            ->get()
            ->map(function ($item) {
                return [
                    'value' => $item->id,
                    'label' => $item->ingredient
                ];
            });
        return $builder;
    }
}
