<?php
require './modelo.php';

$tiposmuest = listaTiposMuestra();
header('Content-type:application/json;charset=utf-8');
echo json_encode($tiposmuest);
