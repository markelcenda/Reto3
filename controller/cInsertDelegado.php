<?php

include_once ("../model/delegadoModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$id=$data['id'];
$experiencia=$data['experiencia'];


$delegado=new entrenadorModel();

$delegado->id=$id;
$delegado->experiencia=$experiencia;

$response=array();

$response['error']=$delegado->insertDelegado(); 


echo json_encode($response);

unset ($delegado);