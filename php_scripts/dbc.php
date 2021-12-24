<?php

$dbc = mysqli_connect('localhost', 'root', '', 'my_friends') or die(mysqli_error());
mysqli_set_charset($dbc, 'utf8');