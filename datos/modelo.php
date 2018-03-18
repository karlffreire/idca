<?php
require '../datos/conecta.php';
function yacisCronoTipo($ids,$crono){
  $db = conectaBD();
 	$prp = pg_prepare($db,"ce1","select entity_name from general.cultural_entity left join general.cultural_entity_chrono_type on cultural_entity.id_cultural_entity = cultural_entity_chrono_type.id_cultural_entity where cultural_entity_chrono_type.id_cultural_entity_type = any ($1) and id_chronology = any ($2);");
  $prp = pg_execute($db,"ce1",array($ids,$crono));
	while ($row=pg_fetch_assoc($prp)){
		$yacis[] = $row;
	}
  pg_close($db);
  if (isset($yacis)) {
    return $yacis;
  }
  return null;
}


 ?>
