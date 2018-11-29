/*======================================================================================================================

        FUNCIONES IDEArq CARBON

======================================================================================================================*/

-- Function: c14.get_array_tipos_material(integer)

-- DROP FUNCTION c14.get_array_tipos_material(integer);

CREATE OR REPLACE FUNCTION c14.get_array_tipos_material(id_material integer)
  RETURNS integer[] AS
$BODY$
--función que devuelve un array de los tipos de material de un material. Asume que sólo hay un nivel en el esquema 1 de los tipos de material
DECLARE
tipo_mat integer[];

BEGIN
select array_agg(tipo_material_c14.id_tipo_material) into tipo_mat
from c14.material_c14 inner join c14.tipo_material_material_c14 on material_c14.id_material_c14 = tipo_material_material_c14.id_material_c14
		      inner join c14.tipo_material_c14 on tipo_material_material_c14.id_tipo_material = tipo_material_c14.id_tipo_material
where tipo_material_c14.id_esquemas_materiales_c14 = 1 and material_c14.id_material_c14 = id_material;

RETURN tipo_mat;

END;
$BODY$
  LANGUAGE plpgsql IMMUTABLE STRICT
  COST 100;
ALTER FUNCTION c14.get_array_tipos_material(integer)
  OWNER TO postgres;
GRANT EXECUTE ON FUNCTION c14.get_array_tipos_material(integer) TO general_edit;
GRANT EXECUTE ON FUNCTION c14.get_array_tipos_material(integer) TO c14_edit;
GRANT EXECUTE ON FUNCTION c14.get_array_tipos_material(integer) TO predimo_edit WITH GRANT OPTION;
GRANT EXECUTE ON FUNCTION c14.get_array_tipos_material(integer) TO postgres;
GRANT EXECUTE ON FUNCTION c14.get_array_tipos_material(integer) TO public;
GRANT EXECUTE ON FUNCTION c14.get_array_tipos_material(integer) TO visualizador;


--Función para limpiar arrays

CREATE OR REPLACE FUNCTION array_sort_unique (ANYARRAY) RETURNS ANYARRAY
LANGUAGE SQL
AS $body$
  SELECT ARRAY(
    SELECT DISTINCT $1[s.i]
    FROM generate_series(array_lower($1,1), array_upper($1,1)) AS s(i)
    ORDER BY 1
  );
$body$;

ALTER FUNCTION array_sort_unique(anyarray)
  OWNER TO postgres;
GRANT EXECUTE ON FUNCTION array_sort_unique(anyarray) TO general_edit;
GRANT EXECUTE ON FUNCTION array_sort_unique(anyarray) TO c14_edit;
GRANT EXECUTE ON FUNCTION array_sort_unique(anyarray) TO predimo_edit WITH GRANT OPTION;
GRANT EXECUTE ON FUNCTION array_sort_unique(anyarray) TO postgres;
GRANT EXECUTE ON FUNCTION array_sort_unique(anyarray) TO public;
GRANT EXECUTE ON FUNCTION array_sort_unique(anyarray) TO visualizador;


-- DROP FUNCTION c14.get_array_taxones(integer);

CREATE OR REPLACE FUNCTION c14.get_array_taxones(id_material integer)
  RETURNS integer[] AS
$BODY$
--función que devuelve un array de taxones para un material. Sólo devuelve el primer elemento (padre) de la jerarquía de taxones, lo que quiere decir que el array sólo tendrá más de un elemento cuando sea una muestra agregada de distintas especies
DECLARE
i integer;
r record;
tax integer[];
tax_comp integer[];

BEGIN
	FOR r IN SELECT tipo_material_c14.id_tipo_material
		 from c14.tipo_material_material_c14 inner join c14.tipo_material_c14 on tipo_material_material_c14.id_tipo_material = tipo_material_c14.id_tipo_material
		 where id_material_c14 = id_material and id_esquemas_materiales_c14 = 2
	LOOP
		tax := array_append(tax, r.id_tipo_material);
	END LOOP;

	IF array_length(tax,1) > 0 THEN
		FOR i in 1..array_upper(tax,1)
		LOOP
			tax_comp := array_append(tax_comp, (c14.id_tipo_material(tax[i]))[1]);
		END LOOP;
	END IF;

return array_sort_unique(tax_comp);

END;
$BODY$
  LANGUAGE plpgsql IMMUTABLE STRICT
  COST 100;

  ALTER FUNCTION c14.get_array_taxones(integer)
    OWNER TO postgres;
  GRANT EXECUTE ON FUNCTION c14.get_array_taxones(integer) TO general_edit;
  GRANT EXECUTE ON FUNCTION c14.get_array_taxones(integer) TO c14_edit;
  GRANT EXECUTE ON FUNCTION c14.get_array_taxones(integer) TO predimo_edit WITH GRANT OPTION;
  GRANT EXECUTE ON FUNCTION c14.get_array_taxones(integer) TO postgres;
  GRANT EXECUTE ON FUNCTION c14.get_array_taxones(integer) TO public;
  GRANT EXECUTE ON FUNCTION c14.get_array_taxones(integer) TO visualizador;

  -- Function: c14.get_array_taxones_completo(integer)

  -- DROP FUNCTION c14.get_array_taxones_completo(integer);

  CREATE OR REPLACE FUNCTION c14.get_array_taxones_completo(id_material integer)
    RETURNS integer[] AS
  $BODY$
  --función que devuelve un array de taxones para un material. Devuelve todos los elementos de la jerarquía de taxones, para todos los taxones, en el caso de que sea una muestra agregada.
  DECLARE
  i integer;
  r record;
  tax integer[];
  tax_comp integer[];

  BEGIN
  	FOR r IN SELECT tipo_material_c14.id_tipo_material
  		 from c14.tipo_material_material_c14 inner join c14.tipo_material_c14 on tipo_material_material_c14.id_tipo_material = tipo_material_c14.id_tipo_material
  		 where id_material_c14 = id_material and id_esquemas_materiales_c14 = 2
  	LOOP
  		tax := array_append(tax, r.id_tipo_material);
  	END LOOP;

  	IF array_length(tax,1) > 0 THEN
  		FOR i in 1..array_upper(tax,1)
  		LOOP
  			tax_comp := tax_comp || c14.id_tipo_material(tax[i]);
  		END LOOP;
  	END IF;

  return array_sort_unique(tax_comp);

  END;
  $BODY$
    LANGUAGE plpgsql IMMUTABLE STRICT
    COST 100;
  ALTER FUNCTION c14.get_array_taxones_completo(integer)
    OWNER TO postgres;
  GRANT EXECUTE ON FUNCTION c14.get_array_taxones_completo(integer) TO public;
  GRANT EXECUTE ON FUNCTION c14.get_array_taxones_completo(integer) TO postgres;
  GRANT EXECUTE ON FUNCTION c14.get_array_taxones_completo(integer) TO general_edit;
  GRANT EXECUTE ON FUNCTION c14.get_array_taxones_completo(integer) TO c14_edit;
  GRANT EXECUTE ON FUNCTION c14.get_array_taxones_completo(integer) TO predimo_edit WITH GRANT OPTION;
  GRANT EXECUTE ON FUNCTION c14.get_array_taxones_completo(integer) TO visualizador;


  -- Function: c14.es_genero(integer)

  -- DROP FUNCTION c14.es_genero(integer);

  CREATE OR REPLACE FUNCTION c14.es_genero(id_tipo integer)
    RETURNS boolean AS
  $BODY$

  /* función que devuelve true si el id_tipo_material_c14 introducido es genero (nivel 2 de la jerarquia de taxones)
  */

  DECLARE
  esquema integer;
  primario_tipo boolean;
  primario_padre boolean;
  padre integer;


  BEGIN
  select id_esquemas_materiales_c14 INTO esquema from c14.tipo_material_c14 where id_tipo_material = id_tipo;

  IF esquema = 2 THEN

  	select tipo_primario INTO primario_tipo from c14.tipo_material_c14 where id_tipo_material = id_tipo;

  	IF primario_tipo = TRUE THEN

  	RETURN FALSE;

  	ELSE
  		SELECT orden1 INTO padre FROM c14.tipo_material_c14_jerarquia where orden2= id_tipo;
  		select tipo_primario INTO primario_padre from c14.tipo_material_c14 where id_tipo_material = padre;

  		IF primario_padre = TRUE THEN
  			--Si el padre es de tipo primario, entonces es genero, porque su padre es familia
  			RETURN TRUE;
  		ELSE

  			RETURN FALSE;
  		END IF;
  	END IF;
  ELSE
  	RETURN FALSE;
  END IF;

  END;
  $BODY$
    LANGUAGE plpgsql IMMUTABLE STRICT
    COST 100;
  ALTER FUNCTION c14.es_genero(integer)
    OWNER TO c14;
  GRANT EXECUTE ON FUNCTION c14.es_genero(integer) TO public;
  GRANT EXECUTE ON FUNCTION c14.es_genero(integer) TO c14;
  GRANT EXECUTE ON FUNCTION c14.es_genero(integer) TO general_edit;
  GRANT EXECUTE ON FUNCTION c14.es_genero(integer) TO c14_edit;
  GRANT EXECUTE ON FUNCTION c14.es_genero(integer) TO predimo_edit WITH GRANT OPTION;


  -- Function: c14.es_especie(integer)

  -- DROP FUNCTION c14.es_especie(integer);

  CREATE OR REPLACE FUNCTION c14.es_especie(id_tipo integer)
    RETURNS boolean AS
  $BODY$

  /* función que devuelve true si el id_tipo_material_c14 introducido es especie (nivel 3 de la jerarquia de taxones)
   ASUME QUE SÓLO HAY TRES NIVELES DE TAXONES: FAMILIA - GENERO - ESPECIE. SI SE INCLUYERA UN CUARTO HABRÍA QUE REHACER LA FUNCIÓN
  */

  DECLARE
  esquema integer;
  primario_tipo boolean;
  primario_padre boolean;
  padre integer;


  BEGIN
  select id_esquemas_materiales_c14 INTO esquema from c14.tipo_material_c14 where id_tipo_material = id_tipo;

  IF esquema = 2 THEN

  	select tipo_primario INTO primario_tipo from c14.tipo_material_c14 where id_tipo_material = id_tipo;

  	IF primario_tipo = TRUE THEN

  	RETURN FALSE;

  	ELSE
  		SELECT orden1 INTO padre FROM c14.tipo_material_c14_jerarquia where orden2= id_tipo;
  		select tipo_primario INTO primario_padre from c14.tipo_material_c14 where id_tipo_material = padre;

  		IF primario_padre = FALSE THEN
  			--Si el padre no es de tipo primario, entonces es especie, porque su padre es genero
  			RETURN TRUE;
  		ELSE

  			RETURN FALSE;
  		END IF;
  	END IF;
  ELSE
  	RETURN FALSE;
  END IF;

  END;
  $BODY$
    LANGUAGE plpgsql IMMUTABLE STRICT
    COST 100;
  ALTER FUNCTION c14.es_especie(integer)
    OWNER TO c14;
  GRANT EXECUTE ON FUNCTION c14.es_especie(integer) TO public;
  GRANT EXECUTE ON FUNCTION c14.es_especie(integer) TO c14;
  GRANT EXECUTE ON FUNCTION c14.es_especie(integer) TO general_edit;
  GRANT EXECUTE ON FUNCTION c14.es_especie(integer) TO c14_edit;
  GRANT EXECUTE ON FUNCTION c14.es_especie(integer) TO predimo_edit WITH GRANT OPTION;



  /*======================================================================================================================

  CREACIÓN DE DOS TABLAS PARA LAS CONSULTAS:
  1.Tabla de yacimientos
  2.Tabla de dataciones

  ======================================================================================================================*/

--creación de la tabla de yacimientos:

--DROP TABLE public.yacis_carbon;


WITH geoprep as (
  SELECT id_cultural_entity,entity_name, st_transform(st_geometryfromtext('POINT('||round((st_x(st_transform(st_centroid(cultural_entity.the_geom),25830))/1000)::numeric,0)*1000||' '||round((st_y(st_transform(st_centroid(cultural_entity.the_geom),25830))/1000)::numeric,0)*1000||')',25830),3857) as the_geom, nut3.gid, nut3.cod_pais
  FROM general.cultural_entity, general.nut3
  WHERE st_intersects(st_centroid(cultural_entity.the_geom),nut3.the_geom)
)
--geoprep sirve para asegurar que la provincia se evalúa en función del centroide
SELECT cultural_entity.id_cultural_entity as id_yaci, geoprep.entity_name as nombre_yaci, geoprep.cod_pais as pais, geoprep.gid as id_prov, general.array_tipo(cultural_entity.id_cultural_entity) as arrtipo, general.array_crono(cultural_entity.id_cultural_entity) as arrcrono, general.get_crono_tipo(cultural_entity.id_cultural_entity) as cronotipo, general.get_unidad_territorial(cultural_entity.id_cultural_entity) as ubicacion,
st_asgeojson(geoprep.the_geom) as geojson
INTO public.yacis_carbon
FROM general.cultural_entity inner join geoprep on cultural_entity.id_cultural_entity = geoprep.id_cultural_entity
WHERE general.cuenta_dataciones(cultural_entity.id_cultural_entity) is not null	and (array_length(general.array_tipo(cultural_entity.id_cultural_entity),1) > 0 or array_length(general.array_crono(cultural_entity.id_cultural_entity),1) > 0) and cultural_entity.the_geom is not null;

ALTER TABLE public.yacis_carbon ADD PRIMARY KEY (id_yaci);

CREATE INDEX index_prov ON public.yacis_carbon USING btree (id_prov ASC NULLS LAST);
CREATE INDEX index_tipo ON public.yacis_carbon USING gin (arrtipo);
CREATE INDEX index_crono ON public.yacis_carbon USING gin (arrcrono);

GRANT ALL on public.yacis_carbon to idearq;
GRANT SELECT on public.yacis_carbon to visualizador;
GRANT SELECT on public.yacis_carbon to visualizador_gis;

--creación de la tabla de dataciones

--DROP TABLE public.data_carbon;

SELECT material_c14.id_material_c14, datacion_c14.id_datacion_c14, material_c14.id_cultural_entity as id_yaci, material_c14.id_tipo_muestra_c14, c14.get_array_tipos_material(material_c14.id_material_c14)||c14.get_array_taxones(material_c14.id_material_c14) as arrtiptax,
	array_agg(array_to_string(c14.array_jerarq_tipo_material(tipo_material_material_c14.id_tipo_material),' - ')) as mostrar_tipomat,
	datacion_c14.edad_c14 as fecha, datacion_c14.desviacion as stdev,metodos_medida.id_metodos_medida, metodos_medida.metodos_medida, laboratorio.sigla, laboratorio.nombre_completo, laboratorio.id_laboratorio, initcap(tipo_muestra_c14.tipo_muestra_c14) as tipo_muestra_c14, datacion_c14.num_datacion as num_dat
INTO public.data_carbon
  FROM c14.material_c14 INNER JOIN c14.tipo_material_material_c14 on material_c14.id_material_c14 = tipo_material_material_c14.id_material_c14
			INNER JOIN c14.datacion_c14 on material_c14.id_material_c14 = datacion_c14.id_material_c14
      INNER JOIN c14.metodos_medida on datacion_c14.id_metodos_medida = metodos_medida.id_metodos_medida
      INNER JOIN general.laboratorio on datacion_c14.id_laboratorio = laboratorio.id_laboratorio
      INNER JOIN c14.tipo_muestra_c14 on material_c14.id_tipo_muestra_c14 = tipo_muestra_c14.id_tipo_muestra_c14
  WHERE edad_c14 is not null
  GROUP BY material_c14.id_material_c14, datacion_c14.id_datacion_c14,datacion_c14.edad_c14, datacion_c14.desviacion, material_c14.id_cultural_entity,material_c14.id_tipo_muestra_c14,c14.get_array_tipos_material(material_c14.id_material_c14)||c14.get_array_taxones(material_c14.id_material_c14),
  metodos_medida.id_metodos_medida, metodos_medida.metodos_medida, laboratorio.sigla, laboratorio.nombre_completo, laboratorio.id_laboratorio,tipo_muestra_c14.tipo_muestra_c14;

  ALTER TABLE public.data_carbon ADD PRIMARY KEY (id_datacion_c14);

  CREATE INDEX index_material ON public.data_carbon USING btree (id_material_c14 ASC NULLS LAST);
  CREATE INDEX index_tipomat ON public.data_carbon USING gin (arrtiptax);
  CREATE INDEX index_fecha ON public.data_carbon USING btree (fecha, stdev ASC NULLS LAST);

  GRANT ALL on public.data_carbon to idearq;
  GRANT SELECT on public.data_carbon to visualizador;
  GRANT SELECT on public.data_carbon to visualizador_gis;
