-- Function: c14.array_jerarq_tipo_material(integer)

-- DROP FUNCTION c14.array_jerarq_tipo_material(integer);

CREATE OR REPLACE FUNCTION c14.array_jerarq_tipo_material(id_tipo integer)
  RETURNS character varying[] AS
$BODY$

/* función que devuelve un array con los tipo_material de los que cuelga el id que introducimos
el array también incluye el del identificador que introducimos
*/

DECLARE

materiales character varying [] := '{}';
primario boolean := FALSE;
padres integer;


BEGIN
--insertamos el primer valor del array, que es el del id por el que preguntamos
materiales :=array_fill(c14.get_tipo_material(id_tipo),ARRAY[1]);

select tipo_primario into primario from c14.tipo_material_c14 where id_tipo_material=id_tipo;
IF primario=FALSE THEN

	SELECT orden1 INTO padres FROM c14.tipo_material_c14_jerarquia
	where orden2= id_tipo;

	WHILE primario=FALSE LOOP
		select tipo_primario into primario from  c14.tipo_material_c14 where id_tipo_material=padres;

		--vamos insertando el resto de valores
		materiales := array_prepend(c14.get_tipo_material(padres),materiales);

		SELECT padre.id_tipo_material INTO padres
		FROM  c14.tipo_material_c14 as padre INNER JOIN c14.tipo_material_c14_jerarquia
						ON padre.id_tipo_material=tipo_material_c14_jerarquia.orden1
					INNER JOIN  c14.tipo_material_c14 as hijo
						ON tipo_material_c14_jerarquia.orden2=hijo.id_tipo_material
		where hijo.id_tipo_material = padres;
	---NOTA: parece que la consulta se podría hacer sin los JOIN, pero no es  así, porque hay que recurrir a la columna crono_primario para saber cuándo salir del bucle
	END LOOP;

	--devuelve el array
	RETURN materiales;

ELSE
--devuelve el array
RETURN materiales;
END IF;

END;
$BODY$
  LANGUAGE plpgsql IMMUTABLE STRICT
  COST 100;
ALTER FUNCTION c14.array_jerarq_tipo_material(integer)
  OWNER TO c14;
GRANT EXECUTE ON FUNCTION c14.array_jerarq_tipo_material(integer) TO public;
GRANT EXECUTE ON FUNCTION c14.array_jerarq_tipo_material(integer) TO c14;
GRANT EXECUTE ON FUNCTION c14.array_jerarq_tipo_material(integer) TO general_edit;
GRANT EXECUTE ON FUNCTION c14.array_jerarq_tipo_material(integer) TO c14_edit;
GRANT EXECUTE ON FUNCTION c14.array_jerarq_tipo_material(integer) TO predimo_edit WITH GRANT OPTION;



--Presentación de países

ALTER TABLE general.nut3 ADD COLUMN mostrar_pais character varying (250);

UPDATE general.nut3 SET mostrar_pais = 'España. Provincias' WHERE paises = 'ES';
UPDATE general.nut3 SET mostrar_pais = 'Portugal. Distritos' WHERE paises = 'PT';
UPDATE general.nut3 SET mostrar_pais = 'Andorra' WHERE paises = 'AD';
