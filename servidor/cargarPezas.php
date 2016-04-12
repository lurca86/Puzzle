<?php
	// Conectamos coa base de datos
	require("conexion.php");

	// Cargamos as armas do xogador
	$consulta = "SELECT *  
				   FROM pezas 
				  WHERE codigo_puzzle = ".$_GET['codigo_puzzle'];
				 
	$saida = array();
	if ($datos = $conexion->query($consulta)) {   		
		while ($peza = $datos->fetch_object()) {
			$saida[] = $peza;
		}
		$datos->close();
	}
	$conexion->close();
	echo json_encode($saida);	
?>