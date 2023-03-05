<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CommentController extends Controller
{
    public function createComment(Request $request)
    {
        $data = $request->all();
        $comment = Comment::create($data);
        $user = User::findOrFail($comment['user_id']);
        $img = $comment->image = base64_encode(Storage::get(str_replace('/storage', 'public/', $user->image)));
        return response()->json([
            'id' => $comment->id,
            'user_id' => $comment->user_id,
            'recipe_id' => $comment->recipe_id,
            'text' => $comment->text,
            'created_at' => $comment->created_at->setTimezone('Europe/Moscow')->format('d.m.Y H:i'),
            'updated_at' => $comment->updated_at->setTimezone('Europe/Moscow')->format('d.m.Y H:i'),
            'image' => $img,
            'name' => $user->name
        ]);
    }
    public function deleteComment(Request $request)
    {
        $comment = Comment::findOrFail($request['comment_id']);
        if ($comment) {
            $comment->delete();
            return response($comment, 200);
        }
    }
}
