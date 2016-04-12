<?php
	// Conectamos coa base de datos
	require("conexion.php");

	// Cargamos os datos do xogador
	$consulta = "SELECT *  
				   FROM xogador 
				  WHERE alcume LIKE '".$_GET['xogador']."'";
				
	if ($datos = $conexion->query($consulta))
	{   		
		$xogador = $datos->fetch_object();
		$datos->close();
		$conexion->close();
		echo json_encode($xogador);
	}	
?>