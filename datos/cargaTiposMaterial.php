<?php
require './modelo.php';

$tiposmat = listaTiposMaterial();
header('Content-type:application/json;charset=utf-8');
echo json_encode($tiposmat);
