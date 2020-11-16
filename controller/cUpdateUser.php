<?php

include_once ("../model/usuarioModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$id=$data['id'];
$password=$data['password'];
$email=$data['email'];
$direccion=$data['direccion'];

$usuario=new usuarioModel();

$usuario->id=$id;
$usuario->password=$password;
$usuario->email=$email;
$usuario->direccion=$direccion;

echo $usuario->id;

$response=array();

$response['error']=$usuario->update();

echo json_encode($response);

unset ($usuario);
