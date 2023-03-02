<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function createComment(Request $request)
    {
        $data = $request->all();
        $comment = Comment::create($data);
        $user = User::findOrFail($comment['user_id']);
        return response()->json([
            'id' => $comment->id,
            'user_id' => $comment->user_id,
            'recipe_id' => $comment->recipe_id,
            'text' => $comment->text,
            'created_at' => $comment->created_at->format('d.m.Y H:i'),
            'updated_at' => $comment->updated_at->format('d.m.Y H:i'),
            'name' => $user->name
        ]);
    }
}
