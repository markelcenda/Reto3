<?php
class comentarioClass
{
    
    public $id;
    public $idUsuario;
    public $texto;
    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getIdUsuario()
    {
        return $this->idUsuario;
    }

    /**
     * @return mixed
     */
    public function getTexto()
    {
        return $this->texto;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @param mixed $idUsuario
     */
    public function setIdUsuario($idUsuario)
    {
        $this->idUsuario = $idUsuario;
    }

    /**
     * @param mixed $text
     */
    public function setTexto($texto)
    {
        $this->texto = $texto;
    }

    
    
    
}