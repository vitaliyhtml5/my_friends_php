<?php

require_once('./dbc.php');
require_once('./server_res.php');

$user_id = $_GET['user_id'];
$friend_id = $_GET['friend_id'];

$query = "SELECT id AS id_main,text,image,DATE(created) AS created, 
(SELECT COUNT(*) FROM likes WHERE news_id = id_main) AS likes, 
(SELECT id FROM likes WHERE news_id = id_main AND users_id = $user_id) AS liked 
FROM news 
WHERE users_id = $friend_id";

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

header('Content-type: application/json');
print json_encode($data);

mysqli_close($dbc);