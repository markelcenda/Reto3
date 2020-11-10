<?php

include_once ("grupo4.zerbitzaria.net/model/equipoModel.php");

$equipo= new equipoModel();

$response=array();

$response['list']=$equipo->setList(); // returns the list

$response['error']="no error";

echo json_encode($response); // pasar de php a json

unset ($equipo);