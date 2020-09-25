<?php

include_once "utils.php";

//TODO: Mover esto a un recurso en cloud o base de datos

$action = $_GET['action']; //Comando a ejecutar

if($action == 'getTimestamp'){
	getTimestamp();
}

if($action == 'getActividades'){
	getActividades();
}

function getTimestamp(){
	$json = file_get_contents('./data-sources/actividades.json');
	$object = json_decode($json);
	echo json_encode($object->timestamp);
}

function getActividades(){
	$json = file_get_contents('./data-sources/actividades.json');
	$object = json_decode($json);
	echo json_encode($object->listaActividades);
}

?>