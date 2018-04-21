<?php
require './modelo.php';
$iddata = filter_var($_GET['datacion'],FILTER_SANITIZE_STRING);

$ext = selecDataExt($iddata);


  $objext = '{"copyright":"CC-BY","attribution":"A. Gilman and friends","data":'.json_encode($ext).'}' ;


header('Content-type:application/json;charset=utf-8');
echo $objext;
