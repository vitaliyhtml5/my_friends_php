<?php

require_once('./dbc.php');
require_once('./server_res.php');

$current_dir = '/opt/lampp/htdocs/my_friends_php/img/news/';
$data = json_decode(file_get_contents('php://input'), true);
$news_id = $_GET['news_id'];
$news_image = $_GET['news_image'];

$query = "DELETE FROM news WHERE id = $news_id";
$result = mysqli_query($dbc, $query) or die(mysqli_error());

res_result(200, 'News was deleted');
unlink($current_dir . $news_image);

mysqli_close($dbc);