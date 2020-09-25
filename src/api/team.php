<?php

include_once "utils.php";

//TODO: Mover esto a un recurso en cloud o base de datos

$action = $_GET['action']; //Comando a ejecutar
$return = array();
$connection = connectToDatabase();

if(mysqli_connect_errno()){
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
else {

	if($action == 'getTeams'){

		$query = $connection->prepare("
			SELECT T.id AS id_team,
				   T.name AS team_name
			FROM team T");

		$query->execute();
		$query->store_result();

		while($row = fetchAssocStatement($query))
		{
			$return['body']=$row;
		}
	}

	$connection->close();
	
	$jwt = generarJWT();
	
	$respuesta = array(
		"JWT" => $jwt,
		"data" => $return
	);
	
	echo json_encode($respuesta);
}

?>