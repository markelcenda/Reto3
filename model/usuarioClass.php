<?php
class usuarioClass
{
    
    public $id;
    public $nombre;
    public $apellidos;
    public $usuario;
    public $password;
    public $idEquipo;
    public $tipo;
    public $email;
    public $direccion;
    public $fechaDeNacimiento;
    public $admin;
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
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * @return mixed
     */
    public function getApellidos()
    {
        return $this->apellidos;
    }

    /**
     * @return mixed
     */
    public function getUsuario()
    {
        return $this->usuario;
    }

    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @return mixed
     */
    public function getIdEquipo()
    {
        return $this->idEquipo;
    }

    /**
     * @return mixed
     */
    public function getTipo()
    {
        return $this->tipo;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @return mixed
     */
    public function getDireccion()
    {
        return $this->direccion;
    }

    /**
     * @return mixed
     */
    public function getFechaDeNacimiento()
    {
        return $this->fechaDeNacimiento;
    }

    /**
     * @return mixed
     */
    public function getAdmin()
    {
        return $this->admin;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @param mixed $nombre
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

    /**
     * @param mixed $apellidos
     */
    public function setApellidos($apellidos)
    {
        $this->apellidos = $apellidos;
    }

    /**
     * @param mixed $usuario
     */
    public function setUsuario($usuario)
    {
        $this->usuario = $usuario;
    }

    /**
     * @param mixed $password
     */
    public function setPassword($password)
    {
        $this->password = $password;
    }

    /**
     * @param mixed $idEquipo
     */
    public function setIdEquipo($idEquipo)
    {
        $this->idEquipo = $idEquipo;
    }

    /**
     * @param mixed $tipo
     */
    public function setTipo($tipo)
    {
        $this->tipo = $tipo;
    }

    /**
     * @param mixed $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @param mixed $direccion
     */
    public function setDireccion($direccion)
    {
        $this->direccion = $direccion;
    }

    /**
     * @param mixed $fechaDeNacimiento
     */
    public function setFechaDeNacimiento($fechaDeNacimiento)
    {
        $this->fechaDeNacimiento = $fechaDeNacimiento;
    }

    /**
     * @param mixed $admin
     */
    public function setAdmin($admin)
    {
        $this->admin = $admin;
    }

    
    
    
}