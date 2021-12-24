<?php

require_once('./dbc.php');
require_once('./server_res.php');

$data = json_decode(file_get_contents('php://input'), true);
$news_id = $data['news_id'];
$users_id = $data['users_id'];

if ($data['action'] === 'add') {
    change_like("INSERT INTO likes (news_id,users_id) VALUES ('$news_id','$users_id')",'Like was added',$dbc,$news_id);
} elseif ($data['action'] === 'remove') {
    change_like("DELETE FROM likes WHERE news_id = '$news_id' AND users_id = '$users_id'", 'Like was removed',$dbc,$news_id);
} else {
    res_result(500, 'Something went wrong');
}

function change_like($query, $message, $dbc, $news_id) {
    $result = mysqli_query($dbc, $query) or die(mysqli_error());
    
    $res = array('code' => 200,'message' => $message,'likes' => count_likes($dbc, $news_id));
    header('Content-type: application/json');
    print json_encode($res);
}

function count_likes($dbc, $news_id) {
    $query = "SELECT COUNT(*) AS count FROM likes WHERE news_id = $news_id";
    $result = mysqli_query($dbc, $query) or die(mysqli_error());
    $row = mysqli_fetch_array($result);
    
    return $row['count'];
}

mysqli_close($dbc);