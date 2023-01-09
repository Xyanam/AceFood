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


$params = explode('/', $q);

if (isset($params[1])) {
    $id = $params[1];
}

if($method === "GET"){
    getRecipes($connect);
}