<?php
require './modelo.php';
session_start();

if ((!isset($_SESSION['usidca']) ||  !isset($_SESSION['pssidca']) || $_SESSION['proyecto'] != 'idearq_carbon')) {
  header('location:./entrando.php');
}

$prov = filter_var($_GET['prov'],FILTER_SANITIZE_STRING);
$tipos = filter_var($_GET['tipo'],FILTER_SANITIZE_STRING);
$cronos = filter_var($_GET['crono'],FILTER_SANITIZE_STRING);
$tmuestra = filter_var($_GET['tmuestra'],FILTER_SANITIZE_STRING);
$tmat = filter_var($_GET['tmat'],FILTER_SANITIZE_STRING);
$edadmin = filter_var($_GET['edadmin'],FILTER_SANITIZE_STRING);
$edadmax = filter_var($_GET['edadmax'],FILTER_SANITIZE_STRING);
$stdevmin = filter_var($_GET['stdevmin'],FILTER_SANITIZE_STRING);
$stdevmax = filter_var($_GET['stdevmax'],FILTER_SANITIZE_STRING);
$metod = filter_var($_GET['metod'],FILTER_SANITIZE_STRING);
$lab = filter_var($_GET['lab'],FILTER_SANITIZE_STRING);

$yacis = selecDataciones($prov,$tipos,$cronos,$tmuestra,$tmat,$edadmin,$edadmax,$stdevmin,$stdevmax,$metod,$lab);
$objyacis;
if (!$yacis) {
  $objyacis = '{"copyright":"CC-BY","attribution":"A. Gilman and friends","data":[]}' ;
}
else {
  $objyacis = '{"copyright":"CC-BY","attribution":"A. Gilman and friends","data":'.json_encode($yacis).'}' ;
}
header('Content-type:application/json;charset=utf-8');

echo $objyacis;
