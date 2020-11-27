<?php
if($_SERVER["SERVER_NAME"]=="grupo4.zerbitzaria.net"){
    include_once("connect_data_remote.php");
}else{
    include_once("connect_data.php");
}
include_once("equipoClass.php");

class equipoModel extends equipoClass {
    
    public $link;
    
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
    
    /*cargar todos los equipos*/
    public function setList(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexión
        
        $sql = "CALL spAllEquipos()"; // SQL sententzia - sentencia SQL
        
        $result = $this->link->query($sql);
        
        //$this->link->num_rows; num rows  of result
        
        $list=array();
        
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
           
            $equipo=new equipoModel();
            
            $equipo->id=$row['id'];
            $equipo->categoria=$row['categoria'];
            
            array_push($list, $equipo);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
        
    }
    
    /*buscar equipos por id*/
    public function findTeamById(){
        
        $this->OpenConnect();
        
        $id=$this->id;
        
        $sql="call spFindEquipo('$id')";
        $result= $this->link->query($sql);
        
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {
            
            $this->id=$row['id'];
            $this->categoria=$row['categoria'];
            
            
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        
    }
    
    /*Buscar equipo por nombre de equipo*/
    public function findTeamByCategoria(){
        
        $this->OpenConnect();
        
        $categoria=$this->categoria;
        
        
        $sql="call spFindEquipoByCategoria('$categoria')";
        $result= $this->link->query($sql);
        
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {
            
            //FILL the cycle with info  $THIS
            $this->id=$row['id'];

        }
        mysqli_free_result($result);
        $this->CloseConnect();
        
    }
    
}
