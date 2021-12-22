<?php

require_once('./dbc.php');
require_once('./server_res.php');

$data = json_decode(file_get_contents('php://input'), true);
$first_name = mysqli_real_escape_string($dbc, trim($data['first_name']));
$last_name = mysqli_real_escape_string($dbc, trim($data['last_name']));
$age = mysqli_real_escape_string($dbc, trim($data['age']));
$hobby = mysqli_real_escape_string($dbc, trim($data['hobby']));

if (empty($first_name) || empty($last_name) || empty($age) || empty($hobby)) {
    res_result(400, 'Fields should be filled');
} elseif(strlen($first_name) > 20 || strlen($last_name) > 20 || strlen($age) > 3 || strlen($hobby) > 20) {
    res_result(400, 'Incorrect lengths of value');
} else if (!is_numeric($age)) {
    res_result(400, 'Age must be interger');
} else {
    $id = (int)$data['id'];
    $query = "UPDATE users 
    SET first_name = '$first_name',
    last_name = '$last_name',
    age = $age,
    hobby = '$hobby'
    WHERE id = $id";
    $result = mysqli_query($dbc, $query) or die(mysqli_error());
    res_result(200, 'Profile was updated');
}

mysqli_close($dbc);