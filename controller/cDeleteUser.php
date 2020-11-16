<?php

include_once ("../model/usuarioModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$id=$data['id'];

$usuario= new usuarioModel();
$usuario->id=$id;

$response=array();
$response['error']=$usuario->delete();

echo json_encode($response);

unset ($usuario);