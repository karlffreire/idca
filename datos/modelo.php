<?php
require '../datos/conexion.php';

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

function listaTiposMuestra(){
  $db = conectaBD();
 	$prp = pg_prepare($db,"lst-muestra","SELECT id_tipo_muestra_c14 as id, tipo_muestra_c14 as text FROM c14.tipo_muestra_c14 ORDER BY id;");
  $prp = pg_execute($db,"lst-muestra",array());
	while ($row=pg_fetch_assoc($prp)){
		$tipmuestra[] = $row;
	}
  pg_close($db);
  if (isset($tipmuestra)) {
    return $tipmuestra;
  }
  return null;
}

function listaTiposMaterial(){
  $db = conectaBD();
 	$prp = pg_prepare($db,"lst-material","SELECT id_tipo_material as id, tipo_material as text, nombre_esquema as grupo from c14.tipo_material_c14 inner join c14.esquemas_material_c14 on tipo_material_c14.id_esquemas_materiales_c14 = esquemas_material_c14.id_esquemas_material_c14 WHERE tipo_primario is true ORDER BY grupo,text");
  $prp = pg_execute($db,"lst-material",array());
	while ($row=pg_fetch_assoc($prp)){
		$tipmaterial[] = $row;
	}
  pg_close($db);
  if (isset($tipmaterial)) {
    return $tipmaterial;
  }
  return null;
}

function listaRangos(){
  $db = conectaBD();
  $prp = pg_prepare($db,"lst-rangos","select min(edad_c14) as fechamininit, max(edad_c14) as fechamaxinit, min(desviacion) as desvmininit, max(desviacion) as desvmaxinit from c14.datacion_c14;");
  $prp = pg_execute($db,"lst-rangos",array());
  $rangos=pg_fetch_assoc($prp);
  pg_close($db);
  if (isset($rangos)) {
    return $rangos;
  }
  return null;
}

function listaMetodos(){
  $db = conectaBD();
 	$prp = pg_prepare($db,"lst-metodos","SELECT id_metodos_medida as id, metodos_medida as text FROM c14.metodos_medida ORDER BY id;");
  $prp = pg_execute($db,"lst-metodos",array());
	while ($row=pg_fetch_assoc($prp)){
		$tipmaterial[] = $row;
	}
  pg_close($db);
  if (isset($tipmaterial)) {
    return $tipmaterial;
  }
  return null;
}

function listaLaboratorios(){
  $db = conectaBD();
 	$prp = pg_prepare($db,"lst-lab","SELECT id_laboratorio as id, sigla as text, nombre_completo as detalle FROM general.laboratorio ORDER BY text;");
  $prp = pg_execute($db,"lst-lab",array());
	while ($row=pg_fetch_assoc($prp)){
		$tipmaterial[] = $row;
	}
  pg_close($db);
  if (isset($tipmaterial)) {
    return $tipmaterial;
  }
  return null;
}
/*
======================================

            CONSULTAS

======================================
*/

function selecYac($yaci){
  $db = conectaBD();
  $prp = pg_prepare($db,"yaci","SELECT yacis_carbon.id_yaci,nombre_yaci, id_prov, cronotipo, ubicacion, id_material_c14, id_datacion_c14, id_tipo_muestra_c14, array_to_string(mostrar_tipomat,'#') as mostrar_tipomat, fecha, stdev, id_metodos_medida,id_laboratorio, sigla, nombre_completo, metodos_medida,tipo_muestra_c14 FROM public.yacis_carbon INNER JOIN public.data_carbon ON yacis_carbon.id_yaci = data_carbon.id_yaci WHERE yacis_carbon.id_yaci = $1;");
  $prp = pg_execute($db,"yaci",array($yaci));
  while ($row=pg_fetch_assoc($prp)){
    $dataciones[] = $row;
  }
  pg_close($db);
  if (isset($dataciones)) {
    return $dataciones;
  }
    return 'nodatos';
}

//SI SE ESTABLECEN LÍMITES EN LA INTERFAZ TAMBIÉN HAY QUE REPRODUCIRLOS AQUÍ ANTES DE LANZAR LA CONSULTA
function selecDataciones($pideprov,$pidetipo,$pidecronos,$pidetmuestra,$pidetmat,$pideedadmin,$pideedadmax,$pidestdevmin,$pidestdevmax,$pidemetod,$pidelab){
  $select ="SELECT yacis_carbon.id_yaci,nombre_yaci, id_prov, cronotipo, ubicacion, id_material_c14, id_datacion_c14, id_tipo_muestra_c14, array_to_string(mostrar_tipomat,'#') as mostrar_tipomat, fecha, stdev, id_metodos_medida,id_laboratorio, sigla, nombre_completo, metodos_medida,tipo_muestra_c14 FROM public.yacis_carbon INNER JOIN public.data_carbon ON yacis_carbon.id_yaci = data_carbon.id_yaci WHERE ";
  $where = '';
  if ($pideprov != '') {
    $provs = explode('-',$pideprov);
    $txtfilt = '';
    foreach ($provs as $key => $value) {
      if (filter_var($value,FILTER_VALIDATE_INT)) {
        $txtfilt .= $value.',';
      }
    }
    $where .= 'AND id_prov in ('.rtrim($txtfilt,',').')';
  }
  if ($pidetipo != '') {
    $tipos = explode('-',$pidetipo);
    $txtfilt = '';
    foreach ($tipos as $key => $value) {
      if (filter_var($value,FILTER_VALIDATE_INT)) {
        $txtfilt .= $value.',';
      }
    }
    $where .= ' AND arrtipo && ARRAY['.rtrim($txtfilt,',').']';
  }
  if ($pidecronos != '') {
    $cronos = explode('-',$pidecronos);
    $txtfilt = '';
    foreach ($cronos as $key => $value) {
      if (filter_var($value,FILTER_VALIDATE_INT)) {
        $txtfilt .= $value.',';
      }
    }
    $where .= ' AND arrcrono && ARRAY['.rtrim($txtfilt,',').']';
  }
  if ($pidetmuestra != '') {
    $tmuestra = explode('-',$pidetmuestra);
    $txtfilt = '';
    foreach ($tmuestra as $key => $value) {
      if (filter_var($value,FILTER_VALIDATE_INT)) {
        $txtfilt .= $value.',';
      }
    }
    $where .= ' AND id_tipo_muestra_c14 IN ('.rtrim($txtfilt,',').')';
  }
  if ($pidetmat != '') {
    $tmat = explode('-',$pidetmat);
    $txtfilt = '';
    foreach ($tmat as $key => $value) {
      if (filter_var($value,FILTER_VALIDATE_INT)) {
        $txtfilt .= $value.',';
      }
    }
    $where .= ' AND arrtiptax && ARRAY['.rtrim($txtfilt,',').']';
  }
  if ($pidemetod != '') {
    $metodos = explode('-',$pidemetod);
    $txtfilt = '';
    foreach ($metodos as $key => $value) {
      if (filter_var($value,FILTER_VALIDATE_INT)) {
        $txtfilt .= $value.',';
      }
    }
    $where .= ' AND id_metodos_medida IN ('.rtrim($txtfilt,',').')';
  }
  if ($pidelab != '') {
    $labs = explode('-',$pidelab);
    $txtfilt = '';
    foreach ($labs as $key => $value) {
      if (filter_var($value,FILTER_VALIDATE_INT)) {
        $txtfilt .= $value.',';
      }
    }
    $where .= ' AND id_laboratorio IN ('.rtrim($txtfilt,',').')';
  }
  if ($pideedadmin != '') {//Estas van en bloque porque si se inicializan las barras ya tenemos todos los valores
    $edadmin  = filter_var($pideedadmin,FILTER_VALIDATE_INT);
    $edadmax = filter_var($pideedadmax,FILTER_VALIDATE_INT);
    $stdevmin = filter_var($pidestdevmin,FILTER_VALIDATE_INT);
    $stdevmax = filter_var($pidestdevmax,FILTER_VALIDATE_INT);
    $where .= " AND fecha >= $edadmin AND fecha <= $edadmax AND stdev >= $stdevmin AND stdev <= $stdevmax";
  }
  $db = conectaBD();
  $resultado = pg_query($db,$select.ltrim(pg_escape_string($where),' AND'));//revisar pg_send_query y pg_connection_busy
  if (!$resultado) {
    return pg_last_error($db);
  }
  while ($row=pg_fetch_assoc($resultado)){
		$dataciones[] = $row;
	}
  pg_close($db);
  if (isset($dataciones)) {
    return $dataciones;
  }
  return null;
}

function selecDataExt($datacion){
  $db = conectaBD();
  $prp = pg_prepare($db,"biblio","SELECT material_c14.contexto_estratigrafico,evaluacion_asociacion.evaluacion_asociacion,material_c14.observaciones,datacion_c14.fecha_analisis,datacion_c14.num_datacion,datacion_c14.c_n,datacion_c14.d13c,datacion_c14.d15n,datacion_c14.cor_frac_isotopo,array_to_string(array_agg(referencia_completa),'#') as bibliografia
  FROM c14.material_c14
  	LEFT JOIN c14.datacion_c14 on material_c14.id_material_c14 = datacion_c14.id_material_c14
  	LEFT JOIN c14.evaluacion_asociacion on material_c14.id_evaluacion_asociacion = evaluacion_asociacion.id_evaluacion_asociacion
  	LEFT JOIN c14.datacion_c14_bibliografia_idearq on datacion_c14.id_datacion_c14 = datacion_c14_bibliografia_idearq.id_datacion_c14
  	LEFT JOIN general.bibliografia_idearq on datacion_c14_bibliografia_idearq.id_bibliografia_idearq = bibliografia_idearq.id_bibliografia_idearq
  WHERE datacion_c14.id_datacion_c14 = $1
  GROUP BY material_c14.id_material_c14,datacion_c14.id_datacion_c14,material_c14.contexto_estratigrafico,evaluacion_asociacion.evaluacion_asociacion,material_c14.observaciones,datacion_c14.fecha_analisis,datacion_c14.num_datacion,datacion_c14.c_n,datacion_c14.d13c,datacion_c14.d15n,datacion_c14.cor_frac_isotopo;");
  $prp = pg_execute($db,"biblio",array($datacion));
  $datosext=pg_fetch_assoc($prp);
  pg_close($db);
  if (isset($datosext)) {
    return $datosext;
  }
    return 'nodatos';
}

 ?>
