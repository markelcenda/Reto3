<?php

include_once ("../model/jugadorModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$id=$data['id'];
$posicion=$data['posicion'];
$altura=$data['altura'];
$peso=$data['peso'];

$jugador=new jugadorModel();

$jugador->id=$id;
$jugador->posicion=$posicion;
$jugador->altura=$altura;
$jugador->peso=$peso;

echo $jugador->id;

$response=array();

$response['error']=$jugador->updateJugador();

echo json_encode($response);

unset ($jugador);
