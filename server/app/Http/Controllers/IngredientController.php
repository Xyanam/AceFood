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

    public function createIngredient(Request $request)
    {
        $ingredient = $request['ingredient'];
        $calories = $request['calories'];
        $proteins = $request['proteins'];
        $fats = $request['fats'];
        $carbohydrates = $request['carbohydrates'];

        $ingredientExists = DB::table('ingredients')->where('ingredient', $ingredient)->exists();

        if ($ingredientExists) {
            return response('Ингредиент с таким названием уже существует', 400);
        }

        DB::table('ingredients')->insert([
            'ingredient' => $ingredient,
            'calories' => $calories,
            'proteins' => $proteins,
            'fats' => $fats,
            'carbohydrates' => $carbohydrates
        ]);

        return response('Ингредиент успешно создан', 200);
    }
}
