<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\KitchenController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\MeasureController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\UserController;
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
Route::get('/getReportComments', [CommentController::class, 'getReportComments']);

Route::post('/deleteFromReport', [CommentController::class, 'deleteFromReportComment']);
Route::post('/recipes/{id}/comments', [CommentController::class, 'createComment']);
Route::post('/recipes/deleteComment', [CommentController::class, 'deleteComment']);
Route::post('/deleteComment', [CommentController::class, 'deleteComments']);
Route::post('/deleteUserComments', [CommentController::class, 'deleteAllUserComments']);
Route::post('/recipes/updateComment', [CommentController::class, 'updateComment']);
Route::post('/recipes/reportComment', [CommentController::class, 'reportComment']);

Route::post('/addrecipe', [RecipeController::class, 'addRecipe']);
Route::post('/like', [LikeController::class, 'likeRecipe']);

Route::get('/kitchen', [KitchenController::class, 'index']);
Route::get('/category', [CategoryController::class, 'index']);
Route::get('/ingredients', [IngredientController::class, 'getIngredients']);
Route::get('/measure', [MeasureController::class, 'getMeasures']);

Route::get('/recipesAdmin', [AdminController::class, 'getAllRecipes']);
Route::get('/pendingRecipes', [AdminController::class, 'getPendingRecipes']);
Route::post('/updateStatus', [AdminController::class, 'updateRecipeStatus']);
Route::post('/deleteRecipe', [AdminController::class, 'deleteRecipe']);

Route::get('/userProfile/{id}', [UserController::class, 'show']);
Route::get('/userProfile/{id}/favourites', [UserController::class, 'getLikedRecipes']);
Route::get('/users', [UserController::class, 'getUsers']);
Route::get('/bannedUsers', [UserController::class, 'getBannedUsers']);

Route::post('/banUser', [UserController::class, 'banUser']);
Route::post('/createIngredient', [IngredientController::class, 'createIngredient']);
