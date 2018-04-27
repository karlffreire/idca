<?php
require './modelo.php';
session_start();

if ((!isset($_SESSION['usidca']) ||  !isset($_SESSION['pssidca']) || $_SESSION['proyecto'] != 'idearq_carbon')) {
  header('location:./entrando.php');
}

$iddata = filter_var($_GET['datacion'],FILTER_SANITIZE_STRING);

$ext = selecDataExt($iddata);


  $objext = '{"copyright":"CC-BY","attribution":"A. Gilman and friends","data":'.json_encode($ext).'}' ;


header('Content-type:application/json;charset=utf-8');
echo $objext;
