<?php
class tipoClass
{
    public $id;
    public $tipo;
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
    public function getTipo()
    {
        return $this->tipo;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @param mixed $tipo
     */
    public function setTipo($tipo)
    {
        $this->tipo = $tipo;
    }

    
    
}