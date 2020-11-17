<?php

include_once '../model/usuarioModel.php';
include_once '../model/equipoModel.php';

$data=json_decode(file_get_contents("php://input"),true);

$id=$data['id'];

$usuario= new usuarioModel();
$equipo=new equipoModel();

$usuario->id=$id;

$response=array();

$response['jugador']=$usuario->findJugadorById();
$response['entrenador']=$usuario->findEntrenadoreById();
$response['delegado']=$usuario->findDelegadoById();
$response['equipos']=$equipo->setList();
$response['usuario']=$usuario->findUserByIdV2();

$response['error']="no error";

echo json_encode($response); // pasar de php a json

unset ($usuario);