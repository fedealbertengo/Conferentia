<?php

include_once "utils.php";

function ejecutarSentencia($sql){
	$connection = connectToDatabase();
	if ( ! mysqli_query( $connection, $sql ) ) {
		return ( "Error description: " . mysqli_error( $connection ) );
	}
	mysqli_close($connection);
	return "Se ha ejecutado correctamente";
}

$command = $_GET['command']; //Comando a ejecutar

if($command == 'aumentarCargaTelefono'){
	$id_organizador = $_GET['id_organizador'];
	$sql = "UPDATE telephone_load_balance SET `load` = (`load` + 1) WHERE id_organizer = " . $id_organizador . ";";
}

if($command == 'registrarAsistenciaEntrada'){
	$id_usuario = $_GET['id_usuario'];
	$id_activity = $_GET['id_activity'];
	$sql = "INSERT INTO assistance (id, idUser, idActivity, concept, dateTime) VALUES (NULL, " . $id_usuario . ", " . $id_activity . ", 'Entrada', NOW());";
//	error_log("INSERT REGISTRAR ENTRADA: " . $sql);
}

if($command == 'registrarAsistenciaSalida'){
	$id_usuario = $_GET['id_usuario'];
	$id_activity = $_GET['id_activity'];
	$sql = "INSERT INTO assistance (id, idUser, idActivity, concept, dateTime) VALUES (NULL, " . $id_usuario . ", " . $id_activity . ", 'Salida', NOW());";
//	error_log("INSERT REGISTRAR SALIDA: " . $sql);
}

if($command == 'setUsuarioActividad'){
    $id_usuario = $_GET['id_user'];
    $id_activity = $_GET['id_activity'];
    $sql = "INSERT INTO `assigned_activities` (id_user, id_activity) VALUES (" . $id_usuario . ", " . $id_activity . "));";
}

echo json_encode(ejecutarSentencia($sql));

?>