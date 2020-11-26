<?php

include_once '../model/usuarioModel.php';

$data=json_decode(file_get_contents("php://input"),true);

$id=$data['idTipo'];

$usuario= new usuarioModel();

$usuario->tipo=$id;

$response=array();

$response['usuarios']=$usuario->findUsersByType();
$response['error']="no error";

echo json_encode($response); // pasar de php a json

unset ($usuario);