<?php
require './modelo.php';

$rangos = listaRangos();
header('Content-type:application/json;charset=utf-8');
echo json_encode($rangos);
