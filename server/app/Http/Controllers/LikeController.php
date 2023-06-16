<?php

namespace App\Http\Controllers;

use App\Models\Likes;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function likeRecipe(Request $request)
    {
        $userId = $request->input('userId');
        $recipeId = $request->input('recipeId');

        $like = Likes::where('user_id', $userId)
            ->where('recipe_id', $recipeId)
            ->first();

        if ($like) {
            $like->delete();
            $message = 'Лайк удален';
        } else {
            $like = new Likes();
            $like->user_id = $userId;
            $like->recipe_id = $recipeId;
            $like->save();
            $message = 'Лайк добавлен';
        }

        return response()->json(['message' => $message]);
    }
}
