<?php
require './modelo.php';
session_start();
if ((!isset($_SESSION['usidca']) ||  !isset($_SESSION['pssidca']) || $_SESSION['proyecto'] != 'idearq_carbon')) {
  header('location:../entrando.php');
}
desconecta();

header('location:../entrando.php');
