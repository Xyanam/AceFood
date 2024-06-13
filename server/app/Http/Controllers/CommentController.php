<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
            DB::table('comments_report')
                ->where('comment_id', $request['comment_id'])
                ->delete();

            $comment->delete();
            return response($comment, 200);
        }
    }

    public function updateComment(Request $request)
    {
        $commentId = $request->input('comment_id');
        $comment = Comment::findOrFail($commentId);

        if ($comment) {
            $comment->text = $request->input('text');
            $comment->save();

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
        } else {
            return response()->json(['error' => 'Comment not found.'], 404);
        }
    }

    public function reportComment(Request $request)
    {
        $commentId = $request->input('comment_id');
        $recipeId = $request->input('recipe_id');
        $userId = $request->input('user_id');


        $recipeId = DB::table('comments_report')->insertGetId([
            'user_id' => $userId,
            'recipe_id' => $recipeId,
            'comment_id' => $commentId,
            'reason' => $request['reason']
        ]);

        return response('', 200);
    }

    public function deleteFromReportComment(Request $request)
    {
        $id = $request->input('id');

        DB::table('comments_report')
            ->where('id', $id)
            ->delete();

        return response('', 200);
    }

    public function deleteComments(Request $request)
    {
        $id = $request->input('id');

        DB::table('comments')
            ->where('id', $id)
            ->delete();

        return response('', 200);
    }

    public function deleteAllUserComments(Request $request)
    {
        $user_id = $request->input('user_id');

        DB::table('comments_report')
            ->where('user_id', $user_id)
            ->delete();

        DB::table('comments')
            ->where('user_id', $user_id)
            ->delete();

        return response('', 200);
    }

    public function getReportComments()
    {
        $comments = DB::table('comments_report')
            ->join('users', 'comments_report.user_id', '=', 'users.id')
            ->join('comments', 'comments.id', '=', 'comments_report.comment_id')
            ->join('recipes', 'recipes.id', '=', 'comments_report.recipe_id')
            ->select('users.name', 'comments.user_id', 'comments.text', 'comments.recipe_id', 'recipes.title', 'comments_report.id', 'comments_report.reason', 'comments_report.comment_id')
            ->orderBy('comments.created_at', 'desc')
            ->get();

        return $comments;
    }
}
