<?php

require_once('./dbc.php');
require_once('./server_res.php');

$data = json_decode(file_get_contents('php://input'), true);
$news_id = $data['news_id'];
$text = $data['text'];

if (empty($text)) {
    res_result(400, 'Fields should be filled');
} elseif (strlen($text) > 400) {
    res_result(400, 'Incorrect lengths of value');
} else {
    $query = "UPDATE news SET text = '$text' WHERE id = $news_id";
    $result = mysqli_query($dbc, $query) or die(mysqli_error());
    res_result(200, 'News was edited');
}

mysqli_close($dbc);