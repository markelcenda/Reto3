$(document).ready(function () {
    
    $("#btnEnviar").click(datosFormulario);
    $("#imagen").change(changeImg);

});

    /*Por defecto la varible filename contendra el nombre de una imagen y savedFile64 no tendra nada
        a menos que se active la funcion "changeImg"*/
      filename = "imagenDefault.png";
      savedFileBase64 = "";
	
//Funcion que envia los datos introducidos en el formulario a la base de datos, y que los verifica
function datosFormulario(){

    //Numero de inputs del formularios
    $misInput = $("form input").length;
    //Guarda lo que se a escrito en el campo de correo electronico
    $campoCorreo = $("#email").val();

    /*Contiene la respuesta de si todos los input estan rellenados o no (en este momento esta 
    puesto como si si lo estuviesen)*/
    $correcto = true;

    //Bucle for que va recorriendo todos los input del formulario
    for(let i = 0; i < ($misInput - 2); i++){

        /*Filtro que va mirando de uno en uno los input y va dandoles un borde rojo o verde 
        en fucion de si han sido rellenados o no*/
        if($("form input:eq(" + i + ")").val() == ""){

            //En caso de no haberse rellenado adquirira un borde rojo
            $("form input:eq(" + i + ")").css("border","2px solid red");

            /*La variable adquiere el valor false al encontar un input no rellenado*/
            $correcto = false;

        }else{

            //En caso de haberse rellenado adquirira un borde verde
            $("form input:eq(" + i + ")").css("border","2px solid #009655");

        }

    }

    //Filtro que mira si el campo correo tiene formato de correo electronico
    if(/\w+\@\w+\.\w+/.test($campoCorreo)){

        //el input del correo adquiere bordes verdes
        $("#email").css("border","2px solid #009655");

    }else{

        //el input del correo adquiere bordes rojos
        $("#email").css("border","2px solid red");
        /*La variable adquiere el valor false al verificar que el formato de correo introducio es invalido*/
        $correcto = false;
        
    }

    //Filtro que determina si los datos pueden ser enviados a la base de datos en funcion de la variable correcto
    if($correcto == false){

        /*En caso de correcto ser igual a false, sacar un alert informando al usuario 
        que faltan campos por rellenar y no mandara los datos a la base de datos*/
        alert("Faltan campos por rellenar o el correo no es valido");
        return false;

    }else{

        //Si correcto es igual a true, los datos seran enviados a la base de datos


        //Se guardan en las variables "insert" los valores establecidos en el formulario
        nombreInsert=$("#nombre").val();
    	apellidosInsert=$("#apellidos").val();
    	usuarioInsert=$("#nuevoUsuario").val(); 
    	passwordInsert=$("#contraseña").val();
        imagenInsert=filename;
    	idEquipoInsert="1";
    	tipoInsert="0";
    	emailInsert=$("#email").val();
    	direccionInsert=$("#direccion").val();
    	fechaDeNacimientoInsert=$("#fechaNacimiento").val();
        adminInsert="0";
    
        /*Se establece una variable url con la direccion del controlador requerido, y una variable
         data con los datos del formulario*/
            var url = "controller/cUsuarioExecuteInsert.php";
    		var data = {'nombreInsert':nombreInsert,
           			'apellidosInsert':apellidosInsert,
           			'usuarioInsert':usuarioInsert,
           			'passwordInsert':passwordInsert,
           			'idEquipoInsert':idEquipoInsert,
           			'tipoInsert':tipoInsert,
           			'emailInsert':emailInsert,
           			'direccionInsert':direccionInsert,
           			'fechaDeNacimientoInsert':fechaDeNacimientoInsert,
                    'adminInsert':adminInsert,
                    'filename':filename,
                    'savedFileBase64':savedFileBase64,
                    'imagenInsert': imagenInsert};

    		//Llamada fetch
    		fetch(url, {
    			  method: 'POST', // or 'POST'
    			  body: JSON.stringify(data), // data can be `string` or {object}!
    			  headers:{'Content-Type': 'application/json'}  // input data
                  })
                  
    		.then(res => res.json()).then(result => {
                
           		console.log(result.error);//Avisa de si la insercion a salido bien o mal
           		alert(result.error); //Avisa de si la insercion a salido bien o mal
           		window.location.reload(true);  //recarga la pagina	
    					
    		})
            .catch(error => console.error('Error status:', error));	

    }

}

//Cambia la foto de perfil
function changeImg(){	

	  var file = $("#imagen")[0].files[0];
	  
	  filename = file.name.toLowerCase();
	  filesize= file.size;
	  console.log(filename);
	  
		  var reader  = new FileReader();
		  
		  reader.onloadend = function () {
			  savedFileBase64 = reader.result;     // Almacenar en variable global para uso posterior	  
			  $("#fotoPerfil").attr('src', savedFileBase64); 
		  }
	
		  if (file) {

		    reader.readAsDataURL(file);
		    
		  } else {

            $("#fotoPerfil").attr('src', '');
            
        }
        
}

