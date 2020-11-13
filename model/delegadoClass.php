<?php
class delegadoClass
{
    public $id;
    public $experiencia;
    
    /**
     * @return mixed
     */
    public function getExperiencia()
    {
        return $this->experiencia;
    }

    /**
     * @param mixed $experiencia
     */
    public function setExperiencia($experiencia)
    {
        $this->experiencia = $experiencia;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    
    
}