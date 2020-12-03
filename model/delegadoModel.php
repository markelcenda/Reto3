<?php
if($_SERVER["SERVER_NAME"]=="grupo4.zerbitzaria.net"){
    include_once("connect_data_remote.php");
}else{
    include_once("connect_data.php");
}

include_once("delegadoClass.php");

class delegadoModel extends delegadoClass {
    
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
    
    /*Buscar delegado por id*/
    public function findDelegadoById(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexión
        
        $id=$this->id;
        
        $sql = "CALL spFindDelegado($id)"; // SQL sententzia - sentencia SQL
        
        $result = $this->link->query($sql);
        
        //$this->link->num_rows; num rows  of result
        
        $list=array();
        
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
            
            $this->id=$row['id'];
            $this->experiencia=$row['experiencia'];
            
            
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
        
    }
    
    /*Actualizar datos del delegado*/
    public function updateDelegado(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexión
        
        $id=$this->id;
        $experiencia=$this->experiencia;
        
        //envia los datos introducidos en el formulario a la base de datos
        $sql="CALL spUpdateDelegado($id, $experiencia)";
        
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

     /*insertar delegado*/
     public function insertDelegado(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexión
        
        $id=$this->id;
        $experiencia=$this->experiencia;

        
        //envia los datos introducidos en el formulario a la base de datos
        $sql="CALL spInsertDelegado('$id', '$experiencia')";
        
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
    
}
