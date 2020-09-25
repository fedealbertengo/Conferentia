<?php

include_once "utils.php";

//TODO: Mover esto a un recurso en cloud o base de datos

$action = $_GET['action']; //Comando a ejecutar

if($action == 'getTimestamp'){
	getTimestamp();
}

if($action == 'getDisertantes'){
	getDisertantes();
}

function getTimestamp(){
	$json = file_get_contents('./data-sources/disertantes.json');
	$object = json_decode($json);
	echo json_encode($object->timestamp);
}

function getDisertantes(){
	$json = file_get_contents('./data-sources/disertantes.json');
	$object = json_decode($json);
	echo json_encode($object->listaDisertantes);
}

?>