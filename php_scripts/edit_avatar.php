<?php

require_once('./dbc.php');
require_once('./server_res.php');

$current_dir = '/opt/lampp/htdocs/my_friends_php/img/avatars/';
$data = json_decode(file_get_contents('php://input'), true);
$image = $data['image'];
$user_id = $data['id'];
$old_image = $data['old_image'];

$query = "UPDATE users SET avatar = '$image' WHERE id = $user_id";
$result = mysqli_query($dbc, $query) or die(mysqli_error());
res_result(200, 'Avatar was changed');
unlink($current_dir . $old_image);

mysqli_close($dbc);