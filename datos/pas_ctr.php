<?php
require '../datos/conexion.php';
session_start();
$usuarios = explode(',',$config['usuario_web']);

$menda = filter_var($_POST['usr'], FILTER_SANITIZE_STRING);
$contra = filter_var($_POST['ctr'],FILTER_SANITIZE_STRING);

if (in_array($menda, $usuarios) && $contra == $config['contrasenya_web'] ) {
	$_SESSION['usidca']=$menda;
	$_SESSION['pssidca']=$contra;
	$_SESSION['proyecto']='idearq_carbon';
	header('location: ../index.php');
}
else {
	header('location: ../entrando.php?fallo=ident');
}
