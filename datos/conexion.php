<?php
$config = parse_ini_file('/opt/lampp/conbd/pg.ini');
define("HOST",'localhost');
define("PORT",5432);
define("DB",$config['database']);
define("USR",$config['username']);
define("PSS",$config['password']);

function conectaBD(){
	return pg_connect("host=".HOST." port=".PORT." dbname=".DB." user=".USR." password=".PSS);
}


?>
