<?php
require './modelo.php';
$tipo = $_GET['tipo'];
$crono = $_GET['crono'];
$yacis = yacisCronoTipo($tipo,$crono);
header('Content-type:application/json;charset=utf-8');
echo json_encode($yacis);
