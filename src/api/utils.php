<?php
define('DB_HOST', 'localhost');
define('DB_PORT', 3306);
define("MYSQL_CONN_ERROR", "Unable to connect to database.");
mysqli_report(MYSQLI_REPORT_STRICT);

//define('DB_ENVIRONMENT', 'dev');
define('DB_ENVIRONMENT', 'staging');
//define('DB_ENVIRONMENT', 'production');

if(DB_ENVIRONMENT == 'dev'){
	define('DB_NAME', 'mecom_main');
	define('DB_USER', 'root');
	define('DB_PASSWORD', '');
}
if(DB_ENVIRONMENT == 'staging'){
	define('DB_NAME', 'mecom_main');
	define('DB_USER', 'mecom_admin');
	define('DB_PASSWORD', 'a9MKi%!fZe%m');
}
if(DB_ENVIRONMENT == 'production'){
	define('DB_NAME', 'mecom_main');
	define('DB_USER', 'conferentia');
	define('DB_PASSWORD', '');
}

header('Content-Type: application/json');
header('Content-Type: text/html; charset=UTF-8');
//header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, origin, Access-Control-Allow-Origin, Authorization, X-Requested-With');

$action = "";

// POST case:
$_POST = json_decode(file_get_contents('php://input'), true);

if ((isset($_POST["action"]) && !empty($_POST["action"]))) {
	$action = $_POST["action"];
}

if((isset($_GET["action"]) && !empty($_GET["action"]))){
	$action = $_GET["action"];
}

// Connect function for database access
function connectToDatabase() {
	try {
		$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT);
		date_default_timezone_set('America/Argentina/Buenos_Aires');
		mysqli_query($connection, "SET `time_zone` = '".date('P')."'");
		mysqli_query($connection, "SET NAMES 'utf8'");
		return $connection;
	} catch (mysqli_sql_exception $e) {
		throw $e;
	}
}

/* Usada para versiones antiguas de PHP que no soportan el fetchAssoc*/
function fetchAssocStatement($stmt)
{
	if($stmt->num_rows>0)
	{
		$result = array();
		$md = $stmt->result_metadata();
		$params = array();
		while($field = $md->fetch_field()) {
			$params[] = &$result[$field->name];
		}
		call_user_func_array(array($stmt, 'bind_result'), $params);
		if($stmt->fetch())
			return $result;
	}

	return null;
}
