<?php
require '../datos/conecta.php';
//la siguiente función es una prueba


/*
======================================

            LISTADOS

======================================
*/

function listaYacis(){
  $db = conectaBD();
 	$prp = pg_prepare($db,"lst-yac","SELECT id_cultural_entity as id,entity_name as text FROM general.cultural_entity WHERE id_cultural_entity IN (SELECT id_yaci FROM public.yacis_carbon) ORDER BY entity_name;");
  $prp = pg_execute($db,"lst-yac",array());
	while ($row=pg_fetch_assoc($prp)){
		$yacis[] = $row;
	}
  pg_close($db);
  if (isset($yacis)) {
    return $yacis;
  }
  return null;
}

function listaRegiones(){
  $db = conectaBD();
 	$prp = pg_prepare($db,"lst-reg","SELECT gid as id, prov_dist as text, paises as grupo FROM general.nut3 ORDER BY cod_pais,prov_dist;");
  $prp = pg_execute($db,"lst-reg",array());
	while ($row=pg_fetch_assoc($prp)){
		$regiones[] = $row;
	}
  pg_close($db);
  if (isset($regiones)) {
    return $regiones;
  }
  return null;
}

function listaTiposYac(){
  $db = conectaBD();
 	$prp = pg_prepare($db,"lst-tipyac","SELECT id_cultural_entity_type as id, cultural_entity_type_value as text, entity_type_schema as grupo FROM general.cultural_entity_type inner join general.cultural_entity_type_schema on cultural_entity_type.id_cultural_entity_type_schema = cultural_entity_type_schema.id_cultural_entity_type_schema WHERE (cultural_entity_type_schema.id_cultural_entity_type_schema = 3 and cultural_entity_type.tipo_primario = true) or cultural_entity_type_schema.id_cultural_entity_type_schema = 4 ORDER BY grupo,text;");
  $prp = pg_execute($db,"lst-tipyac",array());
	while ($row=pg_fetch_assoc($prp)){
		$tiposyac[] = $row;
	}
  pg_close($db);
  if (isset($tiposyac)) {
    return $tiposyac;
  }
  return null;
}

function listaCronos(){
  $db = conectaBD();
 	$prp = pg_prepare($db,"lst-cronos","SELECT id_chronology as id, tm_ordinal_era as text FROM general.chronology WHERE crono_primaria = true;");
  $prp = pg_execute($db,"lst-cronos",array());
	while ($row=pg_fetch_assoc($prp)){
		$cronos[] = $row;
	}
  pg_close($db);
  if (isset($cronos)) {
    return $cronos;
  }
  return null;
}

/*
======================================

            CONSULTAS

======================================
*/

function selecPorYac($prov,$tipo,$cronos){
  $db = conectaBD();
 	$prp = pg_prepare($db,"poryac","SELECT yacis_carbon.id_yaci, id_prov, cronotipo, ubicacion,x,y, id_material_c14, id_datacion_c14, id_tipo_muestra_c14, mostrar_tipomat, fecha, stdev, id_metodos_medida,id_laboratorio FROM public.yacis_carbon INNER JOIN public.data_carbon ON yacis_carbon.id_yaci = data_carbon.id_yaci WHERE id_prov = any ($1) and arrtipo && $2 and arrcrono && $3;");
  $prp = pg_execute($db,"poryac",array($prov,$tipo,$cronos));
	while ($row=pg_fetch_assoc($prp)){
		$yacis[] = $row;
	}
  pg_close($db);
  if (isset($yacis)) {
    return $yacis;
  }
  return null;
}

function selecPorDat($tmuestra,$tmat,$edadmin,$edadmax,$stdevmin,$stdevmax,$metod,$lab){
  $db = conectaBD();
 	$prp = pg_prepare($db,"pordat","SELECT yacis_carbon.id_yaci, id_prov, cronotipo, ubicacion,x,y, id_material_c14, id_datacion_c14, id_tipo_muestra_c14, mostrar_tipomat, fecha, stdev, id_metodos_medida,id_laboratorio FROM public.yacis_carbon INNER JOIN public.data_carbon ON yacis_carbon.id_yaci = data_carbon.id_yaci WHERE id_tipo_muestra_c14 = any ($1) and arrtiptax && $2 and fecha > $3 and fecha < $4 and stdev > $5 and stdev < $6 and id_metodos_medida = any ($7) and id_laboratorio = any ($8);");
  $prp = pg_execute($db,"pordat",array($tmuestra,$tmat,$edadmin,$edadmax,$stdevmin,$stdevmax,$metod,$lab));
	while ($row=pg_fetch_assoc($prp)){
		$yacis[] = $row;
	}
  pg_close($db);
  if (isset($yacis)) {
    return $yacis;
  }
  return null;
}

function selecYac($yaci){
  $db = conectaBD();
 	$prp = pg_prepare($db,"yaci","SELECT yacis_carbon.id_yaci, id_prov, cronotipo, ubicacion,x,y, id_material_c14, id_datacion_c14, id_tipo_muestra_c14, mostrar_tipomat, fecha, stdev, id_metodos_medida,id_laboratorio FROM public.yacis_carbon INNER JOIN public.data_carbon ON yacis_carbon.id_yaci = data_carbon.id_yaci WHERE yacis_carbon.id_yaci = $1;");
  $prp = pg_execute($db,"yaci",array($yaci));
	while ($row=pg_fetch_assoc($prp)){
		$yacis[] = $row;
	}
  pg_close($db);
  if (isset($yacis)) {
    return $yacis;
  }
  return null;
}

function selecPorTodo($prov,$tipo,$cronos,$tmuestra,$tmat,$edadmin,$edadmax,$stdevmin,$stdevmax,$metod,$lab){
  $db = conectaBD();
 	$prp = pg_prepare($db,"portodo","SELECT yacis_carbon.id_yaci, id_prov, cronotipo, ubicacion,x,y, id_material_c14, id_datacion_c14, id_tipo_muestra_c14, mostrar_tipomat, fecha, stdev, id_metodos_medida,id_laboratorio FROM public.yacis_carbon INNER JOIN public.data_carbon ON yacis_carbon.id_yaci = data_carbon.id_yaci WHERE id_prov = any ($1) and arrtipo && $2 and arrcrono && $3 and id_tipo_muestra_c14 = any ($4) and arrtiptax && $5 and fecha > $6 and fecha < $7 and stdev > $8 and stdev < $9 and id_metodos_medida = any ($10) and id_laboratorio = any ($11);");
  $prp = pg_execute($db,"portodo",array($prov,$tipo,$cronos,$tmuestra,$tmat,$edadmin,$edadmax,$stdevmin,$stdevmax,$metod,$lab));
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
