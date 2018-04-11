<?php
require './modelo.php';
$tmuestra = $_GET['tmuestra'];
$tmat = $_GET['tmat'];
$edadmin = $_GET['edadmin'];
$edadmax = $_GET['edadmax'];
$stdevmin = $_GET['stdevmin'];
$stdevmax = $_GET['stdevmax'];
$metod = $_GET['metod'];
$lab = $_GET['lab'];

$yacis = selecPorDat($tmuestra,$tmat,$edadmin,$edadmax,$stdevmin,$stdevmax,$metod,$lab);
header('Content-type:application/json;charset=utf-8');
echo json_encode($yacis);
