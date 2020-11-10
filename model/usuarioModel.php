<?php
if($_SERVER["SERVER_NAME"]=="grupo4.zerbitzaria.net"){
    include_once("../connect_data_remote.php");
}else{
    include_once("connect_data.php");
}

include_once("usuarioClass.php");
include_once("equipoModel.php");

class usuarioModel extends usuarioClass {
    
    public $link;
    public $objEquipo;

    
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
            
            $equipo=new equipoModel();
            $equipo->id=$row['idEquipo'];
            $equipo->findTeamById();
            
            $tipo=new tipoModel();
            $tipo->id=$row['tipo'];
            $tipo->findTipoById();
            
            $usuario->objEquipo=$equipo;
            $usuario->objTipo=$tipo;
            
            
            array_push($list, $usuario);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
        
    }
    
    public function findUserById(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexión
        
        $id=$this->id;
        
        $sql = "CALL spFindUsuario('$id')"; // SQL sententzia - sentencia SQL
        
        $result = $this->link->query($sql);
        
        //$this->link->num_rows; num rows  of result
        
        $list=array();
        
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
            
            $usuario=new usuarioModel();
            
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
            
            /*Datos del jugador*/
            $usuario->posicion=$row['posicion'];
            $usuario->altura=$row['altura'];
            $usuario->peso=$row['peso'];
            
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
            
            /*Datos del entrenador*/
            $usuario->experiencia=$row['experiencia'];
            
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
            
            /*Datos del delegado*/
            /*No tiene datos porque solo tiene id*/
            
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
    
}
