<?php

include_once ("../model/jugadorModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$id=$data['id'];
$altura=$data['altura'];
$peso=$data['peso'];
$posicion=$data['posicion'];


$jugador=new jugadorModel();

$jugador->id=$id;
$jugador->altura=$altura;
$jugador->peso=$peso;
$jugador->posicion=$posicion;

$response=array();

$response['error']=$jugador->insertJugador();

echo json_encode($response);

unset ($jugador);