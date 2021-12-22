<?php

function res_result($code, $message) {
    $err = array('code' => $code,'message' => $message);
    http_response_code($code);
    header('Content-type: application/json');
    print json_encode($err);
}