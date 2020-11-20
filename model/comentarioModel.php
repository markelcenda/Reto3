<?php
if($_SERVER["SERVER_NAME"]=="grupo4.zerbitzaria.net"){
    include_once("connect_data_remote.php");
}else{
    include_once("connect_data.php");
}

include_once("comentarioClass.php");
include_once("usuarioModel.php");

class comentarioModel extends comentarioClass {
    
    public $link;
    public $objUsuario;
    
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
        
        $sql = "CALL spAllComentarios()"; // SQL sententzia - sentencia SQL
        
        $result = $this->link->query($sql);
        
        //$this->link->num_rows; num rows  of result
        
        $list=array();
        
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { //each row
            
            $comentario=new comentarioModel();
            
            $comentario->id=$row['id'];
            $comentario->idUsuario=$row['idUsuario'];
            $comentario->texto=$row['texto'];

            
            $usuario=new usuarioModel();
            $usuario->id=$row['idUsuario'];
            $usuario->findUserById();
            
            $comentario->objUsuario=$usuario;
            
            array_push($list, $comentario);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
        
    }
    
    public function insertComentario(){
        
        $this->OpenConnect();  // konexio zabaldu  - abrir conexión
        
        $idUsuario=$this->idUsuario;
        $texto=$this->texto;
        
        //envia los datos introducidos en el formulario a la base de datos
        $sql="CALL spInsertComentario('$idUsuario', '$texto')";
        
        $this->link->query($sql);
        
        //filtro que mira las filas afectadas
        if ($this->link->affected_rows >= 1)
        {
            //Al detectatr una afila afectada manda el siguiente mensaje
            return "Comentario insertado";
        } else {
            //Al no detectar filas afectadas manda el siguiente mensaje
            return "Se ha producido un error";
        }
        
        $this->CloseConnect();//termina la conexion
    }
    
}