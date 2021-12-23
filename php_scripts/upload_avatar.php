<?php

require_once('./server_res.php');

$current_dir = '/opt/lampp/htdocs/my_friends_php/img/avatars/';

$file_extension = new SplFileInfo($_FILES['avatar']['name']);
$file_type = $file_extension->getExtension();

if (!isset($_FILES['avatar']['name'])) {
    res_result(422, 'Image is missed');
} elseif ($file_type !== 'png' && $file_type !== 'jpg' && $file_type !== 'jpeg') {
    res_result(422, 'Incorrect format');
} else {
    $target = $current_dir . time(). '_' . $_FILES['avatar']['name'];
    move_uploaded_file($_FILES['avatar']['tmp_name'], $target);

    $res = array('code' => 200,'message' => 'Image was uploaded', 'image' => time(). '_' . $_FILES['avatar']['name']);
    header('Content-type: application/json');
    print json_encode($res);
}