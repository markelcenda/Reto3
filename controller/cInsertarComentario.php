<?php

include_once ("../model/comentarioModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$idUsuario=$data['idUsuario'];
$texto=$data['texto'];


$comentario=new comentarioModel();

$comentario->idUsuario=$idUsuario;
$comentario->texto=$texto;

$response=array();

$response['error']=$comentario->insertComentario();

echo json_encode($response);

unset ($comentario);
