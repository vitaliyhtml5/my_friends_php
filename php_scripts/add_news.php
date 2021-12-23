<?php

require_once('./dbc.php');
require_once('./server_res.php');

$data = json_decode(file_get_contents('php://input'), true);
$text = $data['text'];
$image = $data['image'];
$user_id = $data['id'];

if (empty($text)) {
    res_result(400, 'Field should be filled');
} elseif(strlen($text) > 400) {
    res_result(400, 'Incorrect lengths of value');
} else {
    $query = "INSERT INTO news (text,image,users_id)
    VALUES ('$text','$image',$user_id)";
    $result = mysqli_query($dbc, $query) or die(mysqli_error());
    res_result(200, 'News was added');
}

mysqli_close($dbc);