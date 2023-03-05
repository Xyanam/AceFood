<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\KitchenController;
use App\Http\Controllers\RecipeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        $user = $request->user();
        $user->image = base64_encode(Storage::get(str_replace('/storage', 'public/', $user->image)));
        return $user;
    });
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::get('/recipes', [RecipeController::class, 'index']);
Route::get('/recipes/{id}', [RecipeController::class, 'show']);
Route::get('/recipes/{id}/ingredients', [RecipeController::class, 'getIngredients']);
Route::get('/recipes/{id}/comments', [RecipeController::class, 'getComments']);
Route::post('/recipes/{id}/comments', [CommentController::class, 'createComment']);
Route::post('/recipes/deleteComment', [CommentController::class, 'deleteComment']);
Route::get('/kitchen', [KitchenController::class, 'index']);
Route::get('/category', [CategoryController::class, 'index']);
