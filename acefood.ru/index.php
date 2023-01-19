<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *, Authorization');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');
header('Content-type: json/application');

require 'connect.php';
require 'function.php';

$method = $_SERVER['REQUEST_METHOD'];
$q = $_GET['q'];

if (isset($_GET['title'])) {
    $searchTitle = $_GET['title'];
};


$params = explode('/', $q);

$data = file_get_contents('php://input');
$dataJson = json_decode($data, true);

if (isset($params[1])) {
    $id = $params[1];
}

if ($method === "GET") {
    if (isset($id)) {
        getRecipe($connect, $id);
    } elseif (isset($searchTitle)) {
        searchRecipeByTitle($connect, $searchTitle);
    } elseif ($q === 'category') {
        getCategories($connect);
    } elseif ($q === 'kitchen') {
        getKitchen($connect);
    } else {
        getRecipes($connect);
    }
}
