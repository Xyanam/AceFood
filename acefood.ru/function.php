<?php

function getRecipes($connect){
    $sql = "SELECT * FROM `recipes`";
    $recipes = mysqli_query($connect, $sql);

    $recipesArray = [];

    while($recipe = mysqli_fetch_assoc($recipes)){
        $recipesArray[] = $recipe;
    }
    echo json_encode($recipesArray);
}