<?php

//Destruye la sesion
session_start();
session_destroy();

//envia al js el mensaje de adios
$response=array();


$response['confirm']="Que tengas un buen dia. Esperamos volver a verte pronto.";  

echo json_encode($response);