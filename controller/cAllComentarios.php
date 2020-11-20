<?php

include_once ("../model/comentarioModel.php");

$comentario= new comentarioModel();

$response=array();

$response['list']=$comentario->setList();

$response['error']="no error";

echo json_encode($response); // pasar de php a json

unset ($comentario);
