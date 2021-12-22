<?php

require_once('./dbc.php');
require_once('./server_res.php');

$user_id = $_GET['id'];

$query = "SELECT id,first_name,last_name,age,hobby,avatar FROM users WHERE id != $user_id";
$result = mysqli_query($dbc, $query) or die(mysqli_error());

while ($row = mysqli_fetch_array($result)) {
    $data_users[] = array(
        'id' => $row['id'],
        'first_name'=> $row['first_name'], 
        'last_name'=> $row['last_name'],
        'age'=> $row['age'],
        'hobby'=> $row['hobby'],
        'avatar'=> $row['avatar'],
    );
}

header('Content-type: application/json');
print json_encode($data_users);

mysqli_close($dbc);