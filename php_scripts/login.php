<?php
require_once('./dbc.php');
require_once('./server_res.php');

$data = json_decode(file_get_contents('php://input'), true);
$user = mysqli_real_escape_string($dbc, trim($data['user']));
$password = mysqli_real_escape_string($dbc, trim($data['password']));
$remember = mysqli_real_escape_string($dbc, trim($data['remember']));

$query = "SELECT login, password FROM users WHERE login = '$user' AND password = SHA('$password')"; 
$result = mysqli_query($dbc, $query) or die(mysqli_error());

mysqli_num_rows($result) === 1 ? $login_access = true : $login_access = false;

if (empty($user) || empty($password)) {
    res_result(400, 'Fields should be filled');
} elseif ($login_access === false) {
    res_result(401, 'Incorrect credentials');
} elseif ($login_access && $remember) {
    setcookie('my_friends_access', createToken(get_id_user($user, $password, $dbc)), time() + (60 * 60 * 24 * 90));
    res_result(200, 'Access is allowed');
} elseif ($login_access && !$remember) {
    session_start();
    $_SESSION['token'] = createToken(get_id_user($user, $password, $dbc));
    res_result(200, 'Access is allowed');
}

// Get user id
function get_id_user($user, $password, $dbc) {
    $query = "SELECT id FROM users WHERE login = '$user' AND password = SHA('$password')";
    $result = mysqli_query($dbc, $query) or die(mysqli_error());
    $data = mysqli_fetch_array($result);
    return $data['id'];
}

mysqli_close($dbc);

// Create Token
function createToken($id) {
    $headers = ['alg'=>'HS256','typ'=>'JWT'];
    $headers_encoded = base64url_encode(json_encode($headers));
    $payload = ['id'=>$id];
    $payload_encoded = base64url_encode(json_encode($payload));
    $key = 'secret';
    $signature = hash_hmac('SHA256',"$headers_encoded.$payload_encoded",$key,true);
    $signature_encoded = base64url_encode($signature);
    $token = "$headers_encoded.$payload_encoded.$signature_encoded";
    return $token;
}

function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}