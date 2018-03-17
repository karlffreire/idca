<?php
require './datos/conecta.php';
function prueba($param){
  $ces = "{".implode(',', $param)."}";
  $db = conectaBD();
 	$prp = pg_prepare($db,"ce","select id_cultural_entity from general.cultural_entity where id_cultural_entity = any ($1);");
 	$prp = pg_execute($db,"ce",array($ces));
	while ($row=pg_fetch_assoc($prp)){
		$yacis[] = $row;
	}
	pg_close($db);
	return $yacis;
}


 ?>
