<?php

	header('Content-Type: application/json');
	header('Content-Type: text/html; charset=UTF-8');
	header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Headers: Content-Type, origin, Access-Control-Allow-Origin, Authorization, X-Requested-With');

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

	$action = "";
	if ((isset($_POST["action"]) && !empty($_POST["action"]))) {
		$action = $_POST["action"];
	}

	if((isset($_GET["action"]) && !empty($_GET["action"]))){
		$action = $_GET["action"];
	}

	if($action == 'getJWT'){
		$time = time();
		$token = array(
			'iat' => $time,
			'exp' => $time + TIEMPO_DURACION_TOKEN
		);
		$jwt = JWT::encode($token, JWT_KEY);
		
		echo(json_encode($jwt));
	}
	
?>