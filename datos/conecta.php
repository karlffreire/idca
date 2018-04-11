<?php
//$config = parse_ini_file('/opt/lampp/conbd/pg.ini');
$config = parse_ini_file('C:\wamp64\conexiones\idearq_carbon.ini');
define("HOST",'161.111.72.36');
define("PORT",5432);
define("DB",$config['database']);
define("USR",$config['username']);
define("PSS",$config['password']);

function conectaBD(){
	return pg_connect("host=".HOST." port=".PORT." dbname=".DB." user=".USR." password=".PSS);
}


?>
