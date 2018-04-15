<?php
require './modelo.php';
$prov = filter_var($_GET['prov'],FILTER_SANITIZE_STRING);
$tipos = filter_var($_GET['tipo'],FILTER_SANITIZE_STRING);
$cronos = filter_var($_GET['crono'],FILTER_SANITIZE_STRING);
$yacis = selecPorYac($prov,$tipos,$cronos);
$objyacis = '{"copyright":"CC-BY","attribution":"A. Gilman and friends","data":'.json_encode($yacis).'}' ;
header('Content-type:application/json;charset=utf-8');
echo $objyacis;
