<?php
if($_SERVER["SERVER_NAME"]=="grupo4.zerbitzaria.net"){
    include_once("connect_data_remote.php");
}else{
    include_once("connect_data.php");
}

include_once("usuarioClass.php");
include_once("equipoModel.php");
include_once("jugadorModel.php");
include_once("entrenadorModel.php");
include_once("delegadoModel.php");

class usuarioModel extends usuarioClass {
    
    public $link;
    public $objEquipo;
    public $objJugador;
    public $objEntrenador;
    public $objDelegado;

    
    public function OpenConnect()
    {
        $konDat=new connect_data();
        try
        {
            $this->link=new mysqli($konDat->host,$konDat->userbbdd,$konDat->passbbdd,$konDat->ddbbname);
            // mysqli klaseko link objetua sortzen da dagokion konexio datuekin
            // se crea un nuevo objeto llamado link de la clase mysqli con los datos de conexión.
        }
        catch(Exception $e)
        {
            echo $e->getMessage();
        }
        $this->link->set_charset("utf8"); // honek behartu egiten du aplikazio eta
        //                  //databasearen artean UTF -8 erabiltzera datuak trukatzeko
    }
    
    public function CloseConnect()
    {
        mysqli_close ($this->link);
    }
    
    /*cargar toos los usuarios*/
    public function setList(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexión
        
        $sql = "CALL spAllUsuarios()"; // SQL sententzia - sentencia SQL
        
        $result = $this->link->query($sql);
        
        //$this->link->num_rows; num rows  of result
        
        $list=array();
        
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
            
            $usuario=new usuarioModel();
            
            $usuario->id=$row['id'];
            $usuario->nombre=$row['nombre'];
            $usuario->apellidos=$row['apellidos'];
            $usuario->usuario=$row['usuario'];
            $usuario->password=$row['password'];
            $usuario->idEquipo=$row['idEquipo'];
            $usuario->tipo=$row['tipo'];
            $usuario->email=$row['email'];
            $usuario->direccion=$row['direccion'];
            $usuario->fechaDeNacimiento=$row['fechaDeNacimiento'];
            $usuario->admin=$row['admin'];
            $usuario->imagen=$row['imagen'];
            
            /*objEquipo*/
            $equipo=new equipoModel();
            $equipo->id=$row['idEquipo'];
            $equipo->findTeamById();
            
            $usuario->objEquipo=$equipo;

            array_push($list, $usuario);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
        
    }
    
    /*buscar ususario por id*/
    public function findUserById(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexión
        
        $id=$this->id;
        
        $sql = "CALL spFindUsuario('$id')"; // SQL sententzia - sentencia SQL
        
        $result = $this->link->query($sql);
        
        //$this->link->num_rows; num rows  of result
        
        $list=array();
        
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
            
            
            $this->id=$row['id'];
            $this->nombre=$row['nombre'];
            $this->apellidos=$row['apellidos'];
            $this->usuario=$row['usuario'];
            $this->password=$row['password'];
            $this->idEquipo=$row['idEquipo'];
            $this->tipo=$row['tipo'];
            $this->email=$row['email'];
            $this->direccion=$row['direccion'];
            $this->fechaDeNacimiento=$row['fechaDeNacimiento'];
            $this->admin=$row['admin'];
            $this->imagen=$row['imagen'];
            
            /*objEquipo*/
            $equipo=new equipoModel();
            $equipo->id=$row['idEquipo'];
            $equipo->findTeamById();
            
            $this->objEquipo=$equipo;
            
            array_push($list, $this);
            
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
        
    }
    
    /*buscar usuarios por el id del equipo*/
    public function findUsersByTeamId(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexión
        
        $idEquipo=$this->idEquipo;
        
        $sql = "CALL spFindUserByTeam($idEquipo)"; // SQL sententzia - sentencia SQL
        
        $result = $this->link->query($sql);
        
        //$this->link->num_rows; num rows  of result
        
        $list=array();
        
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
            
            $usuario=new usuarioModel();
            
            $usuario->id=$row['id'];
            $usuario->nombre=$row['nombre'];
            $usuario->apellidos=$row['apellidos'];
            $usuario->usuario=$row['usuario'];
            $usuario->password=$row['password'];
            $usuario->idEquipo=$row['idEquipo'];
            $usuario->tipo=$row['tipo'];
            $usuario->email=$row['email'];
            $usuario->direccion=$row['direccion'];
            $usuario->fechaDeNacimiento=$row['fechaDeNacimiento'];
            $usuario->admin=$row['admin'];
            $usuario->imagen=$row['imagen'];
            
            /*objEquipo*/
            $equipo=new equipoModel();
            $equipo->id=$row['idEquipo'];
            $equipo->findTeamById();
            
            $usuario->objEquipo=$equipo;

            array_push($list, $usuario);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
        
    }
    
    /*buscar los usuarios que son jugadores por id del equipos*/
    public function findUsuariosJugadoresPorEquipo(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexión
        
        $idEquipo=$this->idEquipo;
        
        $sql = "CALL spUsuariosJugadoresPorEquipo($idEquipo)"; // SQL sententzia - sentencia SQL
        
        $result = $this->link->query($sql);
        
        //$this->link->num_rows; num rows  of result
        
        $list=array();
        
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
            
            $usuario=new usuarioModel();
            
            /*Datos del usuario*/
            $usuario->id=$row['id'];
            $usuario->nombre=$row['nombre'];
            $usuario->apellidos=$row['apellidos'];
            $usuario->usuario=$row['usuario'];
            $usuario->password=$row['password'];
            $usuario->idEquipo=$row['idEquipo'];
            $usuario->tipo=$row['tipo'];
            $usuario->email=$row['email'];
            $usuario->direccion=$row['direccion'];
            $usuario->fechaDeNacimiento=$row['fechaDeNacimiento'];
            $usuario->admin=$row['admin'];
            $usuario->imagen=$row['imagen'];
            
            /*objJugador*/
            $jugador=new jugadorModel();
            $jugador->id=$row['id'];
            $jugador->findPlayerById();
            
            $usuario->objJugador=$jugador;
            
            /*objEquipo*/
            $equipo=new equipoModel();
            $equipo->id=$row['idEquipo'];
            $equipo->findTeamById();
            
            $usuario->objEquipo=$equipo;

            array_push($list, $usuario);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
        
    }
    
    /*buscar los usuarios que son entrenadores por id del equipos*/
    public function findUsuariosEntrenadoresPorEquipo(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexión
        
        $idEquipo=$this->idEquipo;
        
        $sql = "CALL spUsuariosEntrenadoresPorEquipo($idEquipo)"; // SQL sententzia - sentencia SQL
        
        $result = $this->link->query($sql);
        
        //$this->link->num_rows; num rows  of result
        
        $list=array();
        
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
            
            $usuario=new usuarioModel();
            
            /*Datos del usuario*/
            $usuario->id=$row['id'];
            $usuario->nombre=$row['nombre'];
            $usuario->apellidos=$row['apellidos'];
            $usuario->usuario=$row['usuario'];
            $usuario->password=$row['password'];
            $usuario->idEquipo=$row['idEquipo'];
            $usuario->tipo=$row['tipo'];
            $usuario->email=$row['email'];
            $usuario->direccion=$row['direccion'];
            $usuario->fechaDeNacimiento=$row['fechaDeNacimiento'];
            $usuario->admin=$row['admin'];
            $usuario->imagen=$row['imagen'];
            
            /*objEntrenador*/
            $entrenador=new entrenadorModel();
            $entrenador->id=$row['id'];
            $entrenador->findEntrenadorById();
            
            $usuario->objEntrenador=$entrenador;
            
            /*objEquipo*/
            $equipo=new equipoModel();
            $equipo->id=$row['idEquipo'];
            $equipo->findTeamById();
            
            $usuario->objEquipo=$equipo;

            array_push($list, $usuario);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
        
    }
    
    /*buscar los usuarios que son delegados por id del equipos*/
    public function findUsuariosDelegadosPorEquipo(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexión
        
        $idEquipo=$this->idEquipo;
        
        $sql = "CALL spUsuariosDelegadosPorEquipo($idEquipo)"; // SQL sententzia - sentencia SQL
        
        $result = $this->link->query($sql);
        
        //$this->link->num_rows; num rows  of result
        
        $list=array();
        
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
            
            $usuario=new usuarioModel();
            
            /*Datos del usuario*/
            $usuario->id=$row['id'];
            $usuario->nombre=$row['nombre'];
            $usuario->apellidos=$row['apellidos'];
            $usuario->usuario=$row['usuario'];
            $usuario->password=$row['password'];
            $usuario->idEquipo=$row['idEquipo'];
            $usuario->tipo=$row['tipo'];
            $usuario->email=$row['email'];
            $usuario->direccion=$row['direccion'];
            $usuario->fechaDeNacimiento=$row['fechaDeNacimiento'];
            $usuario->admin=$row['admin'];
            $usuario->imagen=$row['imagen'];
            
            /*objDelegado*/
            $delegado=new delegadoModel();
            $delegado->id=$row['id'];
            $delegado->findDelegadoById();
            
            $usuario->objDelegado=$delegado;
            
            /*objEquipo*/
            $equipo=new equipoModel();
            $equipo->id=$row['idEquipo'];
            $equipo->findTeamById();
            
            $usuario->objEquipo=$equipo;
            
            array_push($list, $usuario);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
        
    }
    
    /*Buscar jugador por id*/
    public function findJugadorById(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexión
        
        $id=$this->id;
        
        $sql = "CALL spJugadorById($id)"; // SQL sententzia - sentencia SQL
        
        $result = $this->link->query($sql);
        
        //$this->link->num_rows; num rows  of result
        
        $list=array();
        
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
            
            $this->id=$row['id'];
            $this->nombre=$row['nombre'];
            $this->apellidos=$row['apellidos'];
            $this->usuario=$row['usuario'];
            $this->password=$row['password'];
            $this->idEquipo=$row['idEquipo'];
            $this->tipo=$row['tipo'];
            $this->email=$row['email'];
            $this->direccion=$row['direccion'];
            $this->fechaDeNacimiento=$row['fechaDeNacimiento'];
            $this->admin=$row['admin'];
            $this->imagen=$row['imagen'];
            
            /*objEquipo*/
            $equipo=new equipoModel();
            $equipo->id=$row['idEquipo'];
            $equipo->findTeamById();
            
            $this->objEquipo=$equipo;
            
            /*objJuador*/
            $jugador=new jugadorModel();
            $jugador->id=$row['id'];
            $jugador->findPlayerById();
            
            $this->objJugador=$jugador;
            
            array_push($list, $this);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
        
    }
    
    /*buscar entrenador por id*/
    public function findEntrenadorById(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexión
        
        $id=$this->id;
        
        $sql = "CALL spEntrenadorById($id)"; // SQL sententzia - sentencia SQL
        
        $result = $this->link->query($sql);
        
        //$this->link->num_rows; num rows  of result
        
        $list=array();
        
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
            
            
            /*Datos del usuario*/
            $this->id=$row['id'];
            $this->nombre=$row['nombre'];
            $this->apellidos=$row['apellidos'];
            $this->usuario=$row['usuario'];
            $this->password=$row['password'];
            $this->idEquipo=$row['idEquipo'];
            $this->tipo=$row['tipo'];
            $this->email=$row['email'];
            $this->direccion=$row['direccion'];
            $this->fechaDeNacimiento=$row['fechaDeNacimiento'];
            $this->admin=$row['admin'];
            $this->imagen=$row['imagen'];
            
            /*objEntrenador*/
            $entrenador=new entrenadorModel();
            $entrenador->id=$row['id'];
            $entrenador->findEntrenadorById();
            
            $this->objEntrenador=$entrenador;
            
            /*objEquipo*/
            $equipo=new equipoModel();
            $equipo->id=$row['idEquipo'];
            $equipo->findTeamById();
            
            $this->objEquipo=$equipo;
            
            array_push($list, $this);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
        
    }
    
    /*buscar delegado por id*/
    public function findDelegadoById(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexión
        
        $id=$this->id;
        
        $sql = "CALL spDelegadoById($id)"; // SQL sententzia - sentencia SQL
        
        $result = $this->link->query($sql);
        
        //$this->link->num_rows; num rows  of result
        
        $list=array();
        
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
            
            
            /*Datos del usuario*/
            $this->id=$row['id'];
            $this->nombre=$row['nombre'];
            $this->apellidos=$row['apellidos'];
            $this->usuario=$row['usuario'];
            $this->password=$row['password'];
            $this->idEquipo=$row['idEquipo'];
            $this->tipo=$row['tipo'];
            $this->email=$row['email'];
            $this->direccion=$row['direccion'];
            $this->fechaDeNacimiento=$row['fechaDeNacimiento'];
            $this->admin=$row['admin'];
            $this->imagen=$row['imagen'];
            
            /*objDelegado*/
            $delegado=new delegadoModel();
            $delegado->id=$row['id'];
            $delegado->findDelegadoById();
            
            $this->objDelegado=$delegado;
            
            /*objEquipo*/
            $equipo=new equipoModel();
            $equipo->id=$row['idEquipo'];
            $equipo->findTeamById();
            
            $this->objEquipo=$equipo;
            
            array_push($list, $this);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
        
    }

    /*bscar usuario para hacer login*/
    public function findUser(){

        $this->OpenConnect(); //abre conexion
        
        $usuario=$this->usuario;
        $password=$this->password;
        
        $sql="call spFindUser('$usuario','$password')"; //envia el usuario y contraseña al procedimiento
        $result= $this->link->query($sql);

        $this->usuario=$usuario;
        $this->password=$password;

        $this->link->query($sql);

        //Filtro que mira cuantas lineas de la base de datos han sido afectadas
        if ($this->link->affected_rows == 0){

            //En caso de no haberse encontrado ninguna fila afectada la variable adquirira el valor false
            $userExists=false;

        }else{

            //En caso de si haberse encontrado una fila afectada la variable adquirira el valor true
            $userExists=true;

            if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){ 

                //Obtienen todos los datos del usuario 
                $this->id=$row['id'];
                $this->nombre=$row['nombre'];
                $this->apellidos=$row['apellidos'];
                $this->idEquipo=$row['idEquipo'];
                $this->tipo=$row['tipo'];
                $this->email=$row['email'];
                $this->direccion=$row['direccion'];
                $this->fechaDeNacimiento=$row['fechaDeNacimiento'];
                $this->admin=$row['admin'];
                $this->imagen=$row['imagen'];

            }
        }

        //envia false o true en funcion de si el procedimiento a afectado a alguna fila de la base de datos
        return $userExists;
        mysqli_free_result($result);
        $this->CloseConnect();//termina la conexion

    }

    /*insertar usuario*/
        public function insert(){
        
            $this->OpenConnect();  // konexio zabaldu  - abrir conexión
            
            $nombreInsert=$this->nombre;
            $apellidosInsert=$this->apellidos;
            $usuarioInsert=$this->usuario;
            $passwordInsert=$this->password;
            $idEquipoInsert=$this->idEquipo;
            $tipoInsert=$this->tipo;
            $emailInsert=$this->email;
            $direccionInsert=$this->direccion;
            $fechaDeNacimientoInsert=$this->fechaDeNacimiento;
            $adminInsert=$this->admin;
            $imagenInsert=$this->imagen;
            
            //envia los datos introducidos en el formulario a la base de datos
            $sql="CALL spInsertUser('$nombreInsert',
                                    '$apellidosInsert', 
                                    '$usuarioInsert',
                                    '$passwordInsert',
                                    '$idEquipoInsert',
                                    '$tipoInsert',
                                    '$emailInsert',
                                    '$direccionInsert',
                                    '$fechaDeNacimientoInsert',
                                    '$adminInsert',
                                    '$imagenInsert')";
                                        
                                        $this->link->query($sql);
                                        
                                        //filtro que mira las filas afectadas
                                        if ($this->link->affected_rows >= 1)
                                        {
                                            //Al detectatr una afila afectada manda el siguiente mensaje
                                            return "¡¡Bienvenido a la familia!!";
                                        } else {
                                            //Al no detectar filas afectadas manda el siguiente mensaje
                                            return "Se ha producido un error";
                                        }
                                        
                                        $this->CloseConnect();//termina la conexion
        }
        
        /*buscar usuario por username*/
        public function findUserByUsername(){
            
            $this->OpenConnect();  // konexio zabaldu  - abrir conexión
            
            $usuario=$this->usuario;
            
            $sql = "CALL spUserByUsername('$usuario')"; // SQL sententzia - sentencia SQL
            
            $result = $this->link->query($sql);
            
            //$this->link->num_rows; num rows  of result
            
            $list=array();
            
            while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
                
                
                
                $this->id=$row['id'];
                $this->nombre=$row['nombre'];
                $this->apellidos=$row['apellidos'];
                $this->usuario=$row['usuario'];
                $this->password=$row['password'];
                $this->idEquipo=$row['idEquipo'];
                $this->tipo=$row['tipo'];
                $this->email=$row['email'];
                $this->direccion=$row['direccion'];
                $this->fechaDeNacimiento=$row['fechaDeNacimiento'];
                $this->admin=$row['admin'];
                $this->imagen=$row['imagen'];
                
                /*objEquipo*/
                $equipo=new equipoModel();
                $equipo->id=$row['idEquipo'];
                $equipo->findTeamById();
                
                $this->objEquipo=$equipo;
                
                
                array_push($list, $this);
            }
            mysqli_free_result($result);
            $this->CloseConnect();
            return $list;
            
        }
        
        /*updateusurio*/
        public function update(){
            
            $this->OpenConnect();  // konexio zabaldu  - abrir conexión
            
            $id=$this->id;
            $password=$this->password;
            $email=$this->email;
            $direccion=$this->direccion;
            $imagen=$this->imagen;

            
            //envia los datos introducidos en el formulario a la base de datos
            $sql="CALL spUpdateUser($id, '$password', '$email', '$direccion', '$imagen')";
            
            //filtro que mira las filas afectadas
            if ($this->link->query($sql))  // true if success
            //$this->link->affected_rows;  number of inserted rows
            {
                return "Informaci�n actualizada correctamente";
            } else {
                return "Error al modificar";
            }
            
            $this->CloseConnect();//termina la conexion
        }
        
        /*delete*/
        public function delete(){
            
            $this->OpenConnect();  // konexio zabaldu  - abrir conexión
            
            $id=$this->id;
            $sql="CALL spDeleteUser($id)";
            
            if ($this->link->query($sql))  // true if success
            //$this->link->affected_rows;  number of deleted rows
            {
                return "Usuario eliminado correctamente";
            } else {
                return "Error al borrar";
            }
            $this->CloseConnect();
        }
        /*cargar todos los usuarios pero rellenando el obj correspondiente a su tipo*/
        
        public function allUsers(){
            
            $this->OpenConnect();  // konexio zabaldu  - abrir conexión
            
            $sql = "CALL spAllUsuarios()"; // SQL sententzia - sentencia SQL
            
            $result = $this->link->query($sql);
            
            //$this->link->num_rows; num rows  of result
            
            $list=array();
            
            while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
                
                $usuario=new usuarioModel();
                
                $usuario->id=$row['id'];
                $usuario->nombre=$row['nombre'];
                $usuario->apellidos=$row['apellidos'];
                $usuario->usuario=$row['usuario'];
                $usuario->password=$row['password'];
                $usuario->idEquipo=$row['idEquipo'];
                $usuario->tipo=$row['tipo'];
                $usuario->email=$row['email'];
                $usuario->direccion=$row['direccion'];
                $usuario->fechaDeNacimiento=$row['fechaDeNacimiento'];
                $usuario->admin=$row['admin'];
                $usuario->imagen=$row['imagen'];
                
                /*objEquipo*/
                $equipo=new equipoModel();
                $equipo->id=$row['idEquipo'];
                $equipo->findTeamById();
                
                $usuario->objEquipo=$equipo;
                
                if($usuario->tipo==1){/*si el usuario es jugador*/
                    
                    $jugador=new jugadorModel();
                    $jugador->id=$row['id'];
                    $jugador->findPlayerById();
                    
                    $usuario->objJugador=$jugador;
                    
                }else if($usuario->tipo==2){/*si el usuario es entrenador*/
                    
                    $entrenador=new entrenadorModel();
                    $entrenador->id=$row['id'];
                    $entrenador->findEntrenadorById();
                    
                    $usuario->objEntrenador=$entrenador;
                    
                }else{/*si el usuario es delegado*/
                    
                    $delegado=new delegadoModel();
                    $delegado->id=$row['id'];
                    $delegado->findDelegadoById();
                    
                    $usuario->objDelegado=$delegado;
                    
                }
                
                array_push($list, $usuario);
            }
            mysqli_free_result($result);
            $this->CloseConnect();
            return $list;
            
        }
        
        /*buscar usuario por id y rellenar el obj correspondiente a su tipo*/
        public function findUserByIdV2(){
            
            $this->OpenConnect();  // konexio zabaldu  - abrir conexión
            
            $id=$this->id;
            
            $sql = "CALL spFindUsuario('$id')"; // SQL sententzia - sentencia SQL
            
            $result = $this->link->query($sql);
            
            //$this->link->num_rows; num rows  of result
            
            $list=array();
            
            while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
                
                
                $this->id=$row['id'];
                $this->nombre=$row['nombre'];
                $this->apellidos=$row['apellidos'];
                $this->usuario=$row['usuario'];
                $this->password=$row['password'];
                $this->idEquipo=$row['idEquipo'];
                $this->tipo=$row['tipo'];
                $this->email=$row['email'];
                $this->direccion=$row['direccion'];
                $this->fechaDeNacimiento=$row['fechaDeNacimiento'];
                $this->admin=$row['admin'];
                $this->imagen=$row['imagen'];
                
                /*objEquipo*/
                $equipo=new equipoModel();
                $equipo->id=$row['idEquipo'];
                $equipo->findTeamById();
                
                $this->objEquipo=$equipo;
                
                if($this->tipo==1){/*si el usuario es jugador*/
                    
                    $jugador=new jugadorModel();
                    $jugador->id=$row['id'];
                    $jugador->findPlayerById();
                    
                    $this->objJugador=$jugador;
                    
                }else if($this->tipo==2){/*si el usuario es entrenador*/
                    
                    $entrenador=new entrenadorModel();
                    $entrenador->id=$row['id'];
                    $entrenador->findEntrenadorById();
                    
                    $this->objEntrenador=$entrenador;
                    
                }else{/*si el usuario es delegado*/
                    
                    $delegado=new delegadoModel();
                    $delegado->id=$row['id'];
                    $delegado->findDelegadoById();
                    
                    $this->objDelegado=$delegado;
                    
                }
                
                array_push($list, $this);
                
            }
            mysqli_free_result($result);
            $this->CloseConnect();
            return $list;
            
        }
        
        /*buscar usuarios por su tipo y rellenar su obkj correspondiente a su tipo*/
        public function findUsersByType(){
            
            $this->OpenConnect();  // konexio zabaldu  - abrir conexión
            
            $id=$this->tipo;
            
            $sql = "CALL spFindUsersByType($id)"; // SQL sententzia - sentencia SQL
            
            $result = $this->link->query($sql);
            
            
            $list=array();
            
            while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
                
                $usuario=new usuarioModel();
                
                
                $usuario->id=$row['id'];
                $usuario->nombre=$row['nombre'];
                $usuario->apellidos=$row['apellidos'];
                $usuario->usuario=$row['usuario'];
                $usuario->password=$row['password'];
                $usuario->idEquipo=$row['idEquipo'];
                $usuario->tipo=$row['tipo'];
                $usuario->email=$row['email'];
                $usuario->direccion=$row['direccion'];
                $usuario->fechaDeNacimiento=$row['fechaDeNacimiento'];
                $usuario->admin=$row['admin'];
                $usuario->imagen=$row['imagen'];
                
                
                if($this->tipo==1){/*si el usuario es jugador*/
                    
                    $jugador=new jugadorModel();
                    $jugador->id=$row['id'];
                    $jugador->findPlayerById();
                    
                    $usuario->objJugador=$jugador;
                    
                }else if($this->tipo==2){/*si el usuario es entrenador*/
                    
                    $entrenador=new entrenadorModel();
                    $entrenador->id=$row['id'];
                    $entrenador->findEntrenadorById();
                    
                    $usuario->objEntrenador=$entrenador;
                    
                }else{/*si el usuario es delegado*/
                    
                    $delegado=new delegadoModel();
                    $delegado->id=$row['id'];
                    $delegado->findDelegadoById();
                    
                    $usuario->objDelegado=$delegado;
                    
                }
                
                array_push($list, $usuario);
                
            }
            mysqli_free_result($result);
            $this->CloseConnect();
            return $list;
            
        }
    
}
