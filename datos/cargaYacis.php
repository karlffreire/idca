<?php
require './modelo.php';

$yacis = listaYacis();
header('Content-type:application/json;charset=utf-8');
echo json_encode($yacis);
