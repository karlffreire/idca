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

  /*======================================================================================================================

  CREACIÓN DE DOS TABLAS PARA LAS CONSULTAS:
  1.Tabla de yacimientos
  2.Tabla de dataciones

  ======================================================================================================================*/

--creación de la tabla de yacimientos:

--DROP TABLE public.yacis_carbon;

SELECT cultural_entity.id_cultural_entity as id_yaci, gid as id_prov, general.array_tipo(cultural_entity.id_cultural_entity) as arrtipo, general.array_crono(cultural_entity.id_cultural_entity) as arrcrono, general.get_crono_tipo(cultural_entity.id_cultural_entity) as cronotipo, general.get_unidad_territorial(cultural_entity.id_cultural_entity) as ubicacion, floor(st_x(st_transform(st_centroid(the_geom),3857))/1000)*1000 as x, floor(st_y(st_transform(st_centroid(the_geom),3857))/1000)*1000 as y
INTO public.yacis_carbon
FROM general.cultural_entity inner join general.nut4_cultural_entity on cultural_entity.id_cultural_entity = nut4_cultural_entity.id_cultural_entity
WHERE (array_length(general.array_tipo(cultural_entity.id_cultural_entity),1) > 0 or array_length(general.array_crono(cultural_entity.id_cultural_entity),1) > 0) and cultural_entity.the_geom is not null;

ALTER TABLE public.yacis_carbon ADD PRIMARY KEY (id_yaci);

CREATE INDEX index_prov ON public.yacis_carbon USING btree (id_prov ASC NULLS LAST);
CREATE INDEX index_tipo ON public.yacis_carbon USING gin (arrtipo);
CREATE INDEX index_crono ON public.yacis_carbon USING gin (arrcrono);


GRANT ALL on public.yacis_carbon to idearq;
GRANT SELECT on public.yacis_carbon to visualizador;
GRANT SELECT on public.yacis_carbon to visualizador_gis;






  select array_agg(array_to_string(c14.array_jerarq_tipo_material(tipo_material_material_c14.id_tipo_material),' - ')), material_c14.id_material_c14
  from c14.material_c14 inner join c14.tipo_material_material_c14 on material_c14.id_material_c14 = tipo_material_material_c14.id_material_c14
  group by material_c14.id_material_c14;
