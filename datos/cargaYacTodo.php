<?php
require './modelo.php';
$prov = $_GET['prov'];
$tipos = $_GET['tipo'];
$cronos = $_GET['crono'];
$tmuestra = $_GET['tmuestra'];
$tmat = $_GET['tmat'];
$edadmin = $_GET['edadmin'];
$edadmax = $_GET['edadmax'];
$stdevmin = $_GET['stdevmin'];
$stdevmax = $_GET['stdevmax'];
$metod = $_GET['metod'];
$lab = $_GET['lab'];

$yacis = selecPorTodo($prov,$tipos,$cronos,$tmuestra,$tmat,$edadmin,$edadmax,$stdevmin,$stdevmax,$metod,$lab);
header('Content-type:application/json;charset=utf-8');
echo json_encode($yacis);
