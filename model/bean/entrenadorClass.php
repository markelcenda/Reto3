<?php
class entrenadorClass  
{
    public $id;
    public  $experiencia;
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
    public function getExperiencia()
    {
        return $this->experiencia;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @param mixed $experiencia
     */
    public function setExperiencia($experiencia)
    {
        $this->experiencia = $experiencia;
    }

    
    
    
}
    