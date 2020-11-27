<?php

include_once ("../model/usuarioModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$id=$data['id'];
$imagenDelete=$data['imagenDelete'];

$usuario= new usuarioModel();
$usuario->id=$id;

$response=array();
$response['error']=$usuario->delete();

//Mira si la imagen del usuario es la default. En caso ser asi no la elimina
if($imagenDelete != "imagenDefault.png"){
    //elimina la imagen del usuario de la carpeta img
    unlink("../view/img/$imagenDelete");
}

echo json_encode($response);

unset ($usuario);