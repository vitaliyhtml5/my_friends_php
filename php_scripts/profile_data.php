<?php

require_once('./dbc.php');
require_once('./get_user_id.php');
session_start();

$userId = json_decode(getId(), true)['id'];

$profile = getDataProfile($userId, $dbc, "SELECT first_name,last_name,age,hobby,avatar FROM users 
WHERE id = $userId");
$news = getDataNews($dbc, "SELECT id AS id_main,text,image,DATE(created) AS created, 
(SELECT COUNT(*) FROM likes WHERE news_id = id_main) AS likes, 
(SELECT id FROM likes WHERE news_id = id_main AND users_id = $userId) AS liked 
FROM news 
WHERE users_id = $userId");
$data = array_merge($profile, $news);

header('Content-type: application/json');
print json_encode($data);

function getDataProfile($userId, $dbc, $query) {
    $result = mysqli_query($dbc, $query) or die(mysqli_error());
    $row = mysqli_fetch_array($result);
    $data[] = array(
        'id' => $userId,
        'first_name'=> $row['first_name'], 
        'last_name'=> $row['last_name'],
        'age'=> $row['age'],
        'hobby'=> $row['hobby'],
        'avatar'=> $row['avatar'],
    );
    return $data;
}

function getDataNews($dbc, $query) {
    $result = mysqli_query($dbc, $query) or die(mysqli_error());
    $data = [];
    while($row = mysqli_fetch_array($result)) {
        $data[] = array(
            'news_id'=> $row['id_main'],
            'text'=> $row['text'],
            'image'=> $row['image'],
            'created'=> $row['created'],
            'likes'=> $row['likes'],
            'liked'=> ($row['liked'] === null) ? false : true
        );
    }
    return $data;
}

mysqli_close($dbc);


