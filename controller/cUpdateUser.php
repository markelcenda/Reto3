<?php

include_once ("../model/usuarioModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$id=$data['id'];
$password=$data['password'];
$email=$data['email'];
$direccion=$data['direccion'];
$imagen=$data['imagen'];
$filename=$data['filename'];
$savedFileBase64=$data['savedFileBase64'];
$imgAnterior=$data['imgAnterior'];

$usuario=new usuarioModel();

$usuario->id=$id;
$usuario->password=$password;
$usuario->email=$email;
$usuario->direccion=$direccion;
$usuario->imagen=$imagen;



$response=array();

$response['error']=$usuario->update();

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

    //Mira si la imagen anterior del usuario era la default. En caso ser asi no la elimina
    if($imgAnterior != "imagenDefault.png"){
        //elimina la imagen anteiror del usuario de la carpeta img
        unlink("../view/img/$imgAnterior");
    }

    
    
}

echo json_encode($response);

unset ($usuario);
