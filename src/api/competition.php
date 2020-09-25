<?php

include_once "utils.php";

include( 'libraries/airtable-php/Airtable.php' );
include('libraries/airtable-php/Request.php');
include('libraries/airtable-php/Response.php');

use TANIOS\Airtable\Airtable;

$airtable = new Airtable(array(
	'api_key'   => 'keyyszsn915kR69T2',
	'base'      => 'app62o5jmN3eRCeVz',
));

$action = $_GET['action']; //Comando a ejecutar
$return = array();

if($action == "getData"){

	$requestCompetitions = $airtable->getContent( 'Competencias' );
	$requestStandings = $airtable->getContent( 'Tabla de Posiciones' );

	$competitions = array();
	$standings = array();

	do {
		$response = $requestCompetitions->getResponse();

		$records = $response['records'];
		foreach($records as &$record){
			array_push($competitions, $record->fields->name);
		}

	}
	while( $requestCompetitions = $response->next() );

	do {
		$response = $requestStandings->getResponse();

		$records = $response['records'];
		foreach($records as &$record){
			array_push($standings, $record->fields);
		}

	}
	while($requestStandings = $response->next());

	$return['competitions']= $competitions;
	$return['standings']= $standings;
}

$jwt = generarJWT();

$respuesta = array(
	"JWT" => $jwt,
	"data" => $return
);

echo json_encode($respuesta);