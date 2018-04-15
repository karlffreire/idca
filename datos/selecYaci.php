<?php
require './modelo.php';
$idyaci = $_GET['yaci'];

$yacis = selecYac($idyaci);
$objyacis = '{"copyright":"CC-BY","attribution":"A. Gilman and friends","data":'.json_encode($yacis).'}' ;
header('Content-type:application/json;charset=utf-8');
echo $objyacis;
