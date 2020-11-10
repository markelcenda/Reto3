<?php

include_once '../model/usuarioModel.php';
include_once '../model/equipoModel.php';

$data=json_decode(file_get_contents("php://input"),true);

$idEquipo=$data['idEquipo'];

$usuario= new usuarioModel();
$equipo=new equipoModel();

$usuario->idEquipo=$idEquipo;

$response=array();

$response['jugadores']=$usuario->findUsuariosJugadoresPorEquipo(); 
$response['entrenadores']=$usuario->findUsuariosEntrenadoresPorEquipo();
$response['delegados']=$usuario->findUsuariosDelegadosPorEquipo();
$response['equipos']=$equipo->setList();

$response['error']="no error";

echo json_encode($response); // pasar de php a json

unset ($usuario);
