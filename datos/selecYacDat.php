<?php
require './modelo.php';
$tmuestra = filter_var($_GET['tmuestra'],FILTER_SANITIZE_STRING);
$tmat = filter_var($_GET['tmat'],FILTER_SANITIZE_STRING);
$edadmin = filter_var($_GET['edadmin'],FILTER_SANITIZE_STRING);
$edadmax = filter_var($_GET['edadmax'],FILTER_SANITIZE_STRING);
$stdevmin = filter_var($_GET['stdevmin'],FILTER_SANITIZE_STRING);
$stdevmax = filter_var($_GET['stdevmax'],FILTER_SANITIZE_STRING);
$metod = filter_var($_GET['metod'],FILTER_SANITIZE_STRING);
$lab = filter_var($_GET['lab'],FILTER_SANITIZE_STRING);

$yacis = selecPorDat($tmuestra,$tmat,$edadmin,$edadmax,$stdevmin,$stdevmax,$metod,$lab);
header('Content-type:application/json;charset=utf-8');
$objyacis = '{"copyright":"CC-BY","attribution":"A. Gilman and friends","data":'.json_encode($yacis).'}' ;
header('Content-type:application/json;charset=utf-8');
echo $objyacis;
