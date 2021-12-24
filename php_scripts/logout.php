<?php

require_once('./server_res.php');

session_start();

if (isset($_COOKIE['my_friends_access'])) {
    setcookie('my_friends_access', '1', time() - 3600);
    res_result(200, 'User is logged out');
} elseif (isset($_SESSION['token'])) {
    $_SESSION = array();
    session_destroy();
    res_result(200, 'User is logged out');
} else {
    res_result(500, 'Something went wrong');
}