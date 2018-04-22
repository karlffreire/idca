/*

FUNCIONES ANTIGUAS QUE ES NECESARIO BORRAR EN LA VERSIÓN 2.2

*/

CREATE OR REPLACE FUNCTION ST_AsGeoJson(geom geometry, maxdecimaldigits int4 DEFAULT 15, options int4 DEFAULT 0)
	RETURNS TEXT
	AS '$libdir/postgis-2.2','LWGEOM_asGeoJson'
	LANGUAGE 'c' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION _ST_AsGeoJson(int4, geometry, int4, int4)
	RETURNS TEXT
	AS $$ SELECT ST_AsGeoJson($2::geometry, $3::int4, $4::int4); $$
	LANGUAGE 'sql' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGeoJson(gj_version int4, geom geometry, maxdecimaldigits int4 DEFAULT 15, options int4 DEFAULT 0)
	RETURNS TEXT
	AS $$ SELECT ST_AsGeoJson($2::geometry, $3::int4, $4::int4); $$
	LANGUAGE 'sql' IMMUTABLE STRICT;

  CREATE OR REPLACE FUNCTION _ST_AsGeoJson(int4, geography, int4, int4)
  	RETURNS text
  	AS '$libdir/postgis-2.2','geography_as_geojson'
  	LANGUAGE 'c' IMMUTABLE STRICT;
  CREATE OR REPLACE FUNCTION ST_AsGeoJson(text)
  	RETURNS text AS
  	$$ SELECT _ST_AsGeoJson(1, $1::geometry,15,0);  $$
  	LANGUAGE 'sql' IMMUTABLE STRICT;
  CREATE OR REPLACE FUNCTION ST_AsGeoJson(geog geography, maxdecimaldigits int4 DEFAULT 15, options int4 DEFAULT 0)
  	RETURNS text
  	AS $$ SELECT _ST_AsGeoJson(1, $1, $2, $3); $$
  	LANGUAGE 'sql' IMMUTABLE STRICT;
  CREATE OR REPLACE FUNCTION ST_AsGeoJson(gj_version int4, geog geography, maxdecimaldigits int4 DEFAULT 15, options int4 DEFAULT 0)
  	RETURNS text
  	AS $$ SELECT _ST_AsGeoJson($1, $2, $3, $4); $$
  	LANGUAGE 'sql' IMMUTABLE STRICT;

    DROP FUNCTION IF EXISTS ST_AsGeoJson(geometry); -- this one changed to use default args
    DROP FUNCTION IF EXISTS ST_AsGeoJson(geography); -- this one changed to use default args
    DROP FUNCTION IF EXISTS ST_AsGeoJson(geometry,int4); -- this one changed to use default args
    DROP FUNCTION IF EXISTS ST_AsGeoJson(geography,int4); -- this one changed to use default args
    DROP FUNCTION IF EXISTS ST_AsGeoJson(int4,geometry); -- this one changed to use default args
    DROP FUNCTION IF EXISTS ST_AsGeoJson(int4,geography); -- this one changed to use default args
    DROP FUNCTION IF EXISTS ST_AsGeoJson(int4,geometry,int4); -- this one changed to use default args
    DROP FUNCTION IF EXISTS ST_AsGeoJson(int4,geography,int4); -- this one changed to use default args
