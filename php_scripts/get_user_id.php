<?php

require_once('./server_res.php');

function getId() {
    if (isset($_COOKIE['my_friends_access'])) {
        return parseToken($_COOKIE['my_friends_access']);
        
    } elseif(isset($_SESSION['token'])) {
        return parseToken($_SESSION['token']);
    } else {
        http_response_code(401);
        res_result(401, 'Access is not allowed');
    }
}

function parseToken($value) {
    $key = 'secret';
    $jwtArr = array_combine(['header', 'payload', 'signature'], explode('.', $value));
    return base64_decode($jwtArr['payload']);
}