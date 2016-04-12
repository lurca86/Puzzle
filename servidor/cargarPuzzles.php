<?php
	// Conectamos coa base de datos
	require("conexion.php");

	// Collemos as armas con todas as súas características para amosalas
   	$consulta = "SELECT * 
				   FROM puzzle
			   ORDER BY codigo_puzzle";

	$saida = array();
	if ($datos = $conexion->query($consulta)) {   		
		while ($puzzle = $datos->fetch_object()) {
			$saida[] = $puzzle;
		}
		$datos->close();
	}
	$conexion->close();
	echo json_encode($saida);	
?>