<?php

require_once('./dbc.php');
require_once('./server_res.php');

$user_id = $_GET['user_id'];

$query = "SELECT n.id AS id_main,n.text,n.image,DATE(n.created) AS created_post, 
(SELECT COUNT(*) FROM likes WHERE news_id = id_main) AS likes, 
(SELECT id FROM likes WHERE news_id = id_main AND users_id = $user_id) AS liked,
u.first_name,u.last_name,u.avatar 
FROM news AS n JOIN users AS u 
ON n.users_id = u.id 
ORDER BY n.created DESC";

$result = mysqli_query($dbc, $query) or die(mysqli_error());
$data = [];

while($row = mysqli_fetch_array($result)) {
    $data[] = array(
        'news_id'=> $row['id_main'],
        'text'=> $row['text'],
        'image'=> $row['image'],
        'created'=> $row['created_post'],
        'likes'=> $row['likes'],
        'liked'=> ($row['liked'] === null) ? false : true,
        'first_name' => $row['first_name'],
        'last_name' => $row['last_name'],
        'avatar' => $row['avatar']
    );
}

header('Content-type: application/json');
print json_encode($data);

mysqli_close($dbc);