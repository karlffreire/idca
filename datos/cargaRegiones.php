<?php
require './modelo.php';

$regiones = listaRegiones();
header('Content-type:application/json;charset=utf-8');
echo json_encode($regiones);
