<?php
require './modelo.php';
$prov = $_GET['prov'];
$tipos = $_GET['tipo'];
$cronos = $_GET['crono'];
$yacis = selecPorYac($prov,$tipos,$cronos);
header('Content-type:application/json;charset=utf-8');
echo json_encode($yacis);
