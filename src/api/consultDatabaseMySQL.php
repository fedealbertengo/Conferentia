<?php

include_once "utils.php";

function consultarDB($sql){
	$connection = connectToDatabase();
	$getData = mysqli_query( $connection, $sql );
	if ( mysqli_num_rows( $getData ) > 0 ) {
		$respuesta = array();
		while ( $row = mysqli_fetch_assoc( $getData ) ) {
			array_push( $respuesta, json_encode( $row, JSON_UNESCAPED_UNICODE ) );
		}
	} else {
		$respuesta = "No hay resultados";
	}
	mysqli_close( $connection );

	return $respuesta;
}

$command = $_GET['command']; //Comando a ejecutar

if($command == 'getUsuarios'){
	$user_name = $_GET['user_name'];
	$password = $_GET['password'];
	$sql = "SELECT U.id,
       			   U.first_name,
       			   U.last_name,
       			   U.user_name,
       			   U.is_organizer,
       			   U.dni,
       			   U.registration_id,
			       T.id AS id_team,
			       T.name AS team_name
			FROM user U
			LEFT JOIN team T ON U.id_team
			WHERE user_name = '" . $user_name . "' AND password = '" . $password . "';";
}

// TODO: Borrar este comando
if($command == 'getTodosUsuarios'){
	$sql = "SELECT * FROM user;";
}

if($command == 'getUsuarioById'){
	$id_usuario = $_GET['id_usuario'];
	$sql = "SELECT id, first_name, last_name, user_name, is_organizer, dni, registration_id FROM user WHERE id = " . $id_usuario . ";";
}

if($command == 'getUsuarioByRegistrationId'){
	$registration_id = $_GET['registration_id'];
	$sql = "SELECT id, first_name, last_name, user_name, is_organizer, dni, registration_id FROM user WHERE registration_id = " . $registration_id . ";";
}

if($command == 'getActividadesAsignadasUsuario'){
	$id_usuario = $_GET['id_usuario'];
	$sql = "SELECT id_activity FROM assigned_activities WHERE id_user = " . $id_usuario . ";";
}

if($command == 'getCargaTelefono'){
	$sql = "SELECT * FROM telephone_load_balance;";
}

if($command == 'obtenerAsistencias'){
	$id_usuario = $_GET['id_usuario'];
	$id_activity = $_GET['id_activity'];
	$entradaOSalida = $_GET['entrada'];

	$sql = "SELECT * FROM assistance";

	if(isset($id_usuario) || isset($id_activity) || isset($entradaOSalida)){
		$sql = $sql . " WHERE ";
	}

	if(isset($id_usuario)){
		$sql = $sql . "idUser = " . (int)$id_usuario . "";
		if(isset($id_activity) || isset($entradaOSalida)){
			$sql = $sql . " AND ";
		}
	}

	if(isset($id_activity)){
		$sql = $sql .  "idActivity = " . (int)$id_activity;
		if(isset($entradaOSalida)){
			$sql = $sql . " AND ";
		}
	}

	if(isset($entradaOSalida)){
		$sql = $sql . ("concept = '" . $entradaOSalida. "'");
	}

	$sql = $sql . ";";
	error_log(json_encode($_GET));
	error_log($sql);
}

//if($command != 'getUsuarios') {
if(true) {
	$rta      = ( consultarDB( $sql ) );
	$respuesta = array();
	$i         = 0;

	if ( $rta != "No se han podido capturar los datos" && $rta != "No se ha podido conectar con la base de datos" && $rta != null && $rta != "No hay resultados" ) {
		if ( empty( $rta ) ) {
			echo json_encode( "No hay resultados" );
		} else {
			$cantFilas = count( $rta );
			echo( "[" );
			foreach ( $rta as &$fila ) {
				if ( $fila != null ) {
					echo( $fila );
					if ( $i < $cantFilas - 1 ) {
						echo( "," );
					}
				}
				$i += 1;
			}
			echo( "]" );
		}
	} else {
		if ( $rta != null ) {
			echo json_encode( $rta );
		}
	}
}
?>