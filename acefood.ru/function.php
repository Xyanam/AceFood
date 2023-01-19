<?php

function getRecipes($connect)
{
    $sql = "SELECT * FROM `recipes`";
    $recipes = mysqli_query($connect, $sql);

    $recipesArray = [];

    while ($recipe = mysqli_fetch_assoc($recipes)) {
        $recipesArray[] = $recipe;
    }
    echo json_encode($recipesArray);
}

function getRecipe($connect, $id)
{
    $sql = "SELECT * FROM `recipes` where `recipe_id` = '$id'";
    $recipe = mysqli_query($connect, $sql);
    if (mysqli_num_rows($recipe) === 0) {
        http_response_code(404);
        $res = [
            "status" => false,
            "message" => "Рецепт не найден!"
        ];
        echo json_encode($res);
    } else {
        $recipe = mysqli_fetch_assoc($recipe);
        echo json_encode($recipe);
    }
}

function searchRecipeByTitle($connect, $title)
{
    $sql = "SELECT * from `recipes` where `title` LIKE '%$title%'";
    $recipes = mysqli_query($connect, $sql);

    $recipesArray = [];

    while ($recipe = mysqli_fetch_assoc($recipes)) {
        $recipesArray[] = $recipe;
    }
    echo json_encode($recipesArray);
}

function getCategories($connect)
{
    $sql = "SELECT * FROM `category`";
    $categories = mysqli_query($connect, $sql);

    $categoriesArray = [];
    while ($category = mysqli_fetch_assoc($categories)) {
        $categoriesArray[] = $category;
    }
    echo json_encode($categoriesArray);
}

function getKitchen($connect)
{
    $sql = "SELECT * FROM `kitchen`";
    $kitchens = mysqli_query($connect, $sql);
    $kitchensArray = [];

    while ($kitchen = mysqli_fetch_assoc($kitchens)) {
        $kitchensArray[] = $kitchen;
    }
    echo json_encode($kitchensArray);
}
