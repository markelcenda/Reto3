<?php

include_once ("../model/comentarioModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$id=$data['id'];

$comentario= new comentarioModel();
$comentario->id=$id;

$response=array();
$response['error']=$comentario->delete();


echo json_encode($response);

unset ($comentario);
