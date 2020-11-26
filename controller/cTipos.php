<?php

include_once ("../model/tipoModel.php");

$tipo= new tipoModel();

$response=array();

$response['list']=$tipo->setTipos(); // returns the list

$response['error']="no error";

echo json_encode($response); // pasar de php a json

unset ($tipo);
