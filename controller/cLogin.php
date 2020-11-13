<?php
require_once '../model/usuarioModel.php';

$data=json_decode(file_get_contents("php://input"),true);

//Recibe los datos introducidos por el usuario
$usuario=$data['usuario'];
$password=$data['password'];

$response=array();

    $usuarioSesion=new usuarioModel();
    $usuarioSesion->usuario=$usuario;
    $usuarioSesion->password=$password;
    
    //Filtro que mira si la variable $userExists es true o false
    if ($usuarioSesion->findUser()){ 
    
        //Al ser true inicia la sesion
        session_start();
        
        $_SESSION['usuario']=$usuario;
        
        $_SESSION['id']=$usuarioSesion->id;
        $_SESSION['nombre']=$usuarioSesion->nombre;
        $_SESSION['apellidos']=$usuarioSesion->apellidos;
        $_SESSION['idEquipo']=$usuarioSesion->idEquipo;
        $_SESSION['tipo']=$usuarioSesion->tipo;
        $_SESSION['email']=$usuarioSesion->email;
        $_SESSION['direccion']=$usuarioSesion->direccion;
        $_SESSION['fechaDeNacimiento']=$usuarioSesion->fechaDeNacimiento;
        $_SESSION['admin']=$usuarioSesion->admin;
        //$_SESSION['imagen']=$usuarioSesion->imagen;
    
        $response['usuarioSesion']=$usuarioSesion; 
        $response['error']="Has iniciado sesion correctamente";  
        $response['confirm']=true;     
        
    }  else {  

        //Al ser false no inicia sesion 
        $response['confirm']=false;     
        $response['error']="Usuario o contraseña incorrectos"; // no correct user

    }

echo json_encode($response);

unset($response);