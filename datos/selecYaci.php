<?php
require './modelo.php';
$idyaci = $_GET['yaci'];

$yacis = selecYac($idyaci);
header('Content-type:application/json;charset=utf-8');
echo json_encode($yacis);
