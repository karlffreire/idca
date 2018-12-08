<?php
require './modelo.php';
session_start();

if ((!isset($_SESSION['usidca']) ||  !isset($_SESSION['pssidca']) || $_SESSION['proyecto'] != 'idearq_carbon')) {
  header('location:./entrando.php');
}
$subtipyac = listaSubtiposYacTodo();
header('Content-type:application/json;charset=utf-8');
echo json_encode($subtipyac);
