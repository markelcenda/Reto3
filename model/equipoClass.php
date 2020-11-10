<?php
class equipoClass{
    
    public $id;
    public $categoria;
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
    public function getCategoria()
    {
        return $this->categoria;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @param mixed $categoria
     */
    public function setCategoria($categoria)
    {
        $this->categoria = $categoria;
    }

    
    
}