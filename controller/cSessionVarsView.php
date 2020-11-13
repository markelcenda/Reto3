<?php
require_once '../model/usuarioModel.php';

session_start();

$response=array();

if ((isset($_SESSION['usuario']))){
    
    $usuario= new usuarioModel();

    $usuario->usuario=$_SESSION['usuario'];
    //$usuario->password=$_SESSION['password'];
    
    $response['usuario']= $usuario->findUserByUsername();
    $response['error']="no error";
    
    
    
} else{  
    $response['error']="You are not logged";
}
echo json_encode($response);

unset($response);
