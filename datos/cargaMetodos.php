<?php
require './modelo.php';

$metodos = listaMetodos();
header('Content-type:application/json;charset=utf-8');
echo json_encode($metodos);
