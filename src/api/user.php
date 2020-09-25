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
	if($action == 'getUser'){
		$userName = $_GET['user_name'];
		$password = $_GET['password'];

		$userQuery = $connection->prepare("
			SELECT U.id,
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
			WHERE user_name = ? AND password = ?");

		$userQuery->bind_param('ss', $userName, $password);
		$userQuery->execute();
		$userQuery->store_result();

		$team_id = 0;

		//Obtenemos los datos básicos del usuario y del equipo al que pertenece, en base a la consulta anterior
		while($row = fetchAssocStatement($userQuery))
		{
			if($row['id_team'] != 0 && $row['id_team'] != null){
				$team_id = $row['id_team'];
				$row['team'] = array('id' => $row['id_team'], 'name' => $row['team_name'], 'members' => array());
			}

			unset($row['id_team']);
			unset($row['team_name']);

			$return=$row;
		}

		//En caso de que el usuario tenga un equipo y de que éstos estén habilitados
		if($team_id != 0 && $team_id != null){
			$teamQuery = $connection->prepare("
			SELECT U.id,
       			   U.first_name,
       			   U.last_name
			FROM user U
			LEFT JOIN team T ON U.id_team = T.id
			WHERE T.id = ?");

			$teamQuery->bind_param('i', $team_id);
			$teamQuery->execute();
			$teamQuery->store_result();

			while($row = fetchAssocStatement($teamQuery)){
				array_push($return['team']['members'], $row);
			}
		}

	}

	$connection->close();
	echo json_encode($return);
}

?>
