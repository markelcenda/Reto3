<?php
if($_SERVER["SERVER_NAME"]=="grupo4.zerbitzaria.net"){
    include_once("connect_data_remote.php");
}else{
    include_once("connect_data.php");
}

include_once("jugadorClass.php");


class jugadorModel extends jugadorClass {
    
    public $link;
    
    public function OpenConnect()
    {
        $konDat=new connect_data();
        try
        {
            $this->link=new mysqli($konDat->host,$konDat->userbbdd,$konDat->passbbdd,$konDat->ddbbname);
            // mysqli klaseko link objetua sortzen da dagokion konexio datuekin
            // se crea un nuevo objeto llamado link de la clase mysqli con los datos de conexi贸n.
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
    
    /*cargar todos los equipos*/
    public function setList(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexi贸n
        
        $sql = "CALL spAllJugadores()"; // SQL sententzia - sentencia SQL
        
        $result = $this->link->query($sql);
        
        //$this->link->num_rows; num rows  of result
        
        $list=array();
        
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
            
            $jugador=new jugadorModel();
            
            $jugador->id=$row['id'];
            $jugador->posicion=$row['posicion'];
            $jugador->altura=$row['altura'];
            $jugador->peso=$row['peso'];
            
            
            array_push($list, $jugador);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
        
    }
    
    /*buscar juagdor por id*/
    public function findPlayerById(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexi贸n
        
        $id=$this->id;
        
        $sql = "CALL spFindJugador($id)"; // SQL sententzia - sentencia SQL
        
        $result = $this->link->query($sql);
        
        //$this->link->num_rows; num rows  of result
        
        $list=array();
        
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
            
            $this->id=$row['id'];
            $this->posicion=$row['posicion'];
            $this->altura=$row['altura'];
            $this->peso=$row['peso'];

        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
        
    }
    
    /*actualizar datos de jugador*/
    public function updateJugador(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexi贸n
        
        $id=$this->id;
        $posicion=$this->posicion;
        $altura=$this->altura;
        $peso=$this->peso;
        
        
        //envia los datos introducidos en el formulario a la base de datos
        $sql="CALL spUpdateJugador($id, '$posicion', '$altura', '$peso')";
        
        //filtro que mira las filas afectadas
        if ($this->link->query($sql))  // true if success
        //$this->link->affected_rows;  number of inserted rows
        {
            return "Informaci髇 actualizada correctamente";
        } else {
            return "Error al modificar";
        }
        
        $this->CloseConnect();//termina la conexion
    }
    
}
