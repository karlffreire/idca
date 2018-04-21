<?php
require './modelo.php';
$idyaci = filter_var($_GET['yaci'],FILTER_SANITIZE_STRING);

$yacis = selecYac($idyaci);
$objyacis;
if (!$yacis) {
  $objyacis = '{"copyright":"CC-BY","attribution":"A. Gilman and friends","data":[]}' ;
}
else {
  $objyacis = '{"copyright":"CC-BY","attribution":"A. Gilman and friends","data":'.json_encode($yacis).'}' ;
}

header('Content-type:application/json;charset=utf-8');
echo $objyacis;
