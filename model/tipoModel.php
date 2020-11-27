<?php
if($_SERVER["SERVER_NAME"]=="grupo4.zerbitzaria.net"){
    include_once("connect_data_remote.php");
}else{
    include_once("connect_data.php");
}

include_once("tipoClass.php");

class tipoModel extends tipoClass {
    
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
    
    /*buscar tipos por id*/
    public function findTipoById(){
        
        $this->OpenConnect();
        
        $id=$this->id;
        
        $sql="call spFindTipo('$id')";
        $result= $this->link->query($sql);
        
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {
            
            $this->id=$row['id'];
            $this->tipo=$row['tipo'];
                       
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        
    }
    
    /*cargar todos los tipos*/
    public function setTipos(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexión
        
        $sql = "CALL spAllTipos()"; // SQL sententzia - sentencia SQL
        
        $result = $this->link->query($sql);
        
        //$this->link->num_rows; num rows  of result
        
        $list=array();
        
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
            
            $tipo=new tipoModel();
            
            $tipo->id=$row['id'];
            $tipo->tipo=$row['tipo'];
            
            array_push($list, $tipo);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
        
    }
    
    
}
