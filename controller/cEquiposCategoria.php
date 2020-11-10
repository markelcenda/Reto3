<?php

include_once '../model/equipoModel.php';

$data=json_decode(file_get_contents("php://input"),true);

$categoria=$data['categoria'];

$equipo= new equipoModel();

$equipo->categoria=$categoria;

$response=array();

$response['list']=$equipo->findTeamByCategoria(); // returns the list
$response['error']="no error";

echo json_encode($response); // pasar de php a json

unset ($equipo);
