<?php

include_once ("../model/entrenadorModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$id=$data['id'];
$experiencia=$data['experiencia'];

$entrenador=new entrenadorModel();

$entrenador->id=$id;
$entrenador->experiencia=$experiencia;

echo $entrenador->id;

$response=array();

$response['error']=$entrenador->updateEntrenador();

echo json_encode($response);

unset ($entrenador);
