<?php
    include_once "utils.php";

	function leerNotificaciones($apiId, $authKey){
		$curl = curl_init();
		curl_setopt_array($curl, array(
		  CURLOPT_URL => "https://onesignal.com/api/v1/notifications?app_id=" . $apiId . "&limit=50&offset=0",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "GET",
		  CURLOPT_HTTPHEADER => array("authorization: Basic " . $authKey,
		  ),
		));
		
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);
		
		if($err != ""){
			$return = json_encode($err);
		}
		else{
			$return = $response;
		}
		return $return;
	}
	
	function enviarNotificacion($apiId, $authKey, $elementosIncluidos, $titulo, $mensaje, $datos){
		$headings = array(
			"en" => $titulo
		);
		
		$content = array(
			"en" => $mensaje
		);
		
		if($datos != null){
			if(strpos($elementosIncluidos[0], "-") != false){
				$fields = array(
					'app_id' => $apiId,
					'include_player_ids' => $elementosIncluidos,
					'data' => (json_decode($datos)),
					'headings' => $headings,
					'contents' => $content
				);
			}
			else{
				$fields = array(
					'app_id' => $apiId,
					'included_segments' => $elementosIncluidos,
					'data' => (json_decode($datos)),
					'headings' => $headings,
					'contents' => $content
				);
			}
		}
		else{
			if(strpos($elementosIncluidos[0], "-") != false){
				$fields = array(
					'app_id' => $apiId,
					'include_player_ids' => $elementosIncluidos,
					'data' => array("foo" => "bar"),
					'headings' => $headings,
					'contents' => $content
				);
			}
			else{
				$fields = array(
					'app_id' => $apiId,
					'included_segments' => $elementosIncluidos,
					'data' => array("foo" => "bar"),
					'headings' => $headings,
					'contents' => $content
				);
			}
		}

		
		$fields = json_encode($fields);
		print("\nJSON sent:\n");
		print($fields);
		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8','Authorization: Basic ' . $authKey));
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		curl_setopt($ch, CURLOPT_POST, TRUE);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

		$response = curl_exec($ch);
		curl_close($ch);
		
		return $response;
	}
	
	$accion = $_GET['accion'];
	
	if($accion == "enviar"){
		$titulo = $_GET['titulo'];
		$mensaje = $_GET['mensaje'];
	}
	
	$destinos = array();
	if(isset($_GET["destinos"])){
		$destinos = explode(",", $_GET["destinos"]);
	}
	
	if(isset($_GET["data"])){
		$data = $_GET["data"];
		$data = str_replace("\\", "", $data);
	}
	else{
		$data = null;
	}
	
	$apiId = "2c71823c-8666-4288-8655-b537e44d4a69";
	$authKey = "MTQ0ODg3YTMtMTg3ZS00MmYyLTgyODktZGQ5NjhlNGYyMTU5";
	
	switch($accion){
		case "leer":
			echo leerNotificaciones($apiId, $authKey);
			break;
		case "enviar":
			echo enviarNotificacion($apiId, $authKey, $destinos, $titulo, $mensaje, $data);
			break;
	}

?>