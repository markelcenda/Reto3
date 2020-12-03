<?php

include_once ("../model/usuarioModel.php");

$usuario= new usuarioModel();

$response=array();

$response['list']=$usuario->lastId(); // returns the list

$response['error']="no error";

echo json_encode($response); // pasar de php a json

unset ($usuario);