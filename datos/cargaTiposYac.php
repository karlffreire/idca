<?php
require './modelo.php';

$tipyac = listaTiposYac();
header('Content-type:application/json;charset=utf-8');
echo json_encode($tipyac);
