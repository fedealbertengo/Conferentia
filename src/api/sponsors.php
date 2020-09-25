<?php

include_once "utils.php";

//TODO: Mover esto a un recurso en cloud o base de datos

$action = $_GET['action']; //Comando a ejecutar

if($action == 'getTimestamp'){
	getTimestamp();
}

if($action == 'getSponsors'){
	getSponsors();
}

function getTimestamp(){
	$json = file_get_contents('./data-sources/sponsors.json');
	$object = json_decode($json);
	echo json_encode($object->timestamp);
}

function getSponsors(){
	$json = file_get_contents('./data-sources/sponsors.json');
	$object = json_decode($json);
	echo json_encode($object->listaSponsors);
}

?>