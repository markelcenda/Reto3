<?php

include_once ("../model/usuarioModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$nombreInsert=$data['nombreInsert'];
$apellidosInsert=$data['apellidosInsert'];
$usuarioInsert=$data['usuarioInsert'];
$imagenInsert=$data['imagenInsert'];
$passwordInsert=$data['passwordInsert'];
$idEquipoInsert=$data['idEquipoInsert'];
$tipoInsert=$data['tipoInsert'];
$emailInsert=$data['emailInsert'];
$direccionInsert=$data['direccionInsert'];
$adminInsert=$data['adminInsert'];
$fechaDeNacimientoInsert=$data['fechaDeNacimientoInsert'];
$imagenInsert=$data['imagenInsert'];
$filename=$data['filename'];
$savedFileBase64=$data['savedFileBase64'];

$nuevoUsuario=new usuarioModel();

$nuevoUsuario->nombre=$nombreInsert;
$nuevoUsuario->apellidos=$apellidosInsert;
$nuevoUsuario->usuario=$usuarioInsert;
$nuevoUsuario->imagen=$imagenInsert;
$nuevoUsuario->password=$passwordInsert;
$nuevoUsuario->idEquipo=$idEquipoInsert;
$nuevoUsuario->tipo=$tipoInsert;
$nuevoUsuario->email=$emailInsert;
$nuevoUsuario->direccion=$direccionInsert;
$nuevoUsuario->admin=$adminInsert;
$nuevoUsuario->fechaDeNacimiento=$fechaDeNacimientoInsert;

$response=array();

$response['error']=$nuevoUsuario->insert(); 

if($savedFileBase64 != ""){

/*Llega $_POST["savedFileBase64"] ==> 'data:image/png;base64,AAAFBfj42Pj4...';
Se obtiene el contenido limpio del fichero, sin cabecera de tipo de archivo
*/
$fileBase64 = explode(',', $savedFileBase64)[1]; //parte dcha de la coma

// Se convierte de base64 a binario/texto para almacenarlo
$file = base64_decode($fileBase64);

/*Se especifica el directorio donde se almacenarán los ficheros(se crea si no existe)*/
$writable_dir = '../view/img/';
if(!is_dir($writable_dir)){mkdir($writable_dir);}

//Se escribe el archivo
file_put_contents($writable_dir.$filename, $file,  LOCK_EX);

}

echo json_encode($response);

unset ($nuevoUsuario);
