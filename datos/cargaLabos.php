<?php
require './modelo.php';

$labos = listaLaboratorios();
header('Content-type:application/json;charset=utf-8');
echo json_encode($labos);
