<?php
require './modelo.php';

$yacis = cargaYacis();
header('Content-type:application/json;charset=utf-8');
echo json_encode($yacis);
