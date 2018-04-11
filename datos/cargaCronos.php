<?php
require './modelo.php';

$cronos = listaCronos();
header('Content-type:application/json;charset=utf-8');
echo json_encode($cronos);
