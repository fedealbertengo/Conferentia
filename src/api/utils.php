<?php

use Firebase\JWT\JWT;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\BeforeValidException;
use Firebase\JWT\ExpiredException;
require_once './JWT/SignatureInvalidException.php';
require_once './JWT/BeforeValidException.php';
require_once './JWT/ExpiredException.php';
require_once './JWT/JWT.php';

define('TIEMPO_DURACION_TOKEN', 60*60);
define('JWT_KEY', 'conferentia');

define('DB_HOST', 'localhost');
define('DB_PORT', 3306);
define("MYSQL_CONN_ERROR", "Unable to connect to database.");
mysqli_report(MYSQLI_REPORT_STRICT);

define('DB_ENVIRONMENT', 'dev');

if(DB_ENVIRONMENT == 'dev'){
	define('DB_NAME', 'conferentia');
	define('DB_USER', '');
	define('DB_PASSWORD', '');
}
if(DB_ENVIRONMENT == 'staging'){
	define('DB_NAME', 'conferentia');
	define('DB_USER', '');
	define('DB_PASSWORD', '');
}
if(DB_ENVIRONMENT == 'production'){
	define('DB_NAME', 'conferentia');
	define('DB_USER', '');
	define('DB_PASSWORD', '');
}

header('Content-Type: application/json');
header('Content-Type: text/html; charset=UTF-8');
header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
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

if(!(isset($action) && !empty($action) && $action == 'getUser') && !(isset($_GET['command']) && !empty($_GET['command']) && $_GET['command'] == 'getActividadesAsignadasUsuario')){
	if(isset($_GET['jwt']) && !empty($_GET['jwt']) && ($_GET['jwt'] != 'undefined')){
		try{
			$jwt = $_GET['jwt'];
			$decoded = JWT::decode($jwt, JWT_KEY, array('HS256'));
		}
		catch(SignatureInvalidException $e){
			echo(json_encode('La validación del token ha fallado'));
			exit();
		}
		catch(ExpiredException $e){
			
		}
	}
	else{
		echo(json_encode('No existe token JWT'));
		exit();
	}
}

function generarJWT(){
	$jwt = null;
	if(isset($_GET['jwt'])){
		try{
			$jwt = $_GET['jwt'];
			$decoded = JWT::decode($jwt, JWT_KEY, array('HS256'));
		}
		catch(SignatureInvalidException $e){
			exit();
		}
		catch(ExpiredException $e){
			$time = time();
			$token = array(
				'iat' => $time,
				'exp' => $time + TIEMPO_DURACION_TOKEN
			);
			$jwt = JWT::encode($token, JWT_KEY);
		}
	}
	else{
		$time = time();
		$token = array(
			'iat' => $time,
			'exp' => $time + TIEMPO_DURACION_TOKEN
		);
		$jwt = JWT::encode($token, JWT_KEY);
	}
	return $jwt;
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
