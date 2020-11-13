$(document).ready(function () {
    
    $("#btnEnviar").click(datosFormulario);
    $("#imagen").change(changeImg);
    $(".botonLoginStart").click(login);
    $(".botonLogout").click(logout);
    sessionVarsView();

});

function equiposDesdeSocios(id){
    pagina="equipos.html?" + id;
    window.location.href=pagina;
}

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
    	tipoInsert="1";
    	emailInsert=$("#email").val();
    	direccionInsert=$("#direccion").val();
    	fechaDeNacimientoInsert=$("#fechaNacimiento").val();
        adminInsert="0";
    
        /*Se establece una variable url con la direccion del controlador requerido, y una variable
         data con los datos del formulario*/
            var url = "../../controller/cUsuarioExecuteInsert.php";
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

function login(){

    //Variables que adquieren el valor de los datos introducidos en el modal
	 usuario=$("#usuario").val();
     password=$("#password").val();

     //Filtro que mira si los campos usuario y contraseña estan vacio
    if(usuario != "" && password != ""){
    
    //en caso de no estar vacio se mandaran los datos al controlador cLogin
    var url = "../../controller/cLogin.php";
    var data = {'usuario':usuario, 'password':password};

    console.log(data);

    		//Llamada fetch
    		fetch(url, {
    			  method: 'POST', 
    			  body: JSON.stringify(data), // data can be `string` or {object}!
    			  headers:{'Content-Type': 'application/json'}  // input data
                  })
                  
    		.then(res => res.json()).then(result => {

                alert(result.error); 

                console.log(result.error);

                //Filtro que mira si se ha podido inicar sesion
                if(result.confirm == true){

                    //Al detectar que si, econde el boton de iniciar sesion y muestra el de cerrarla y la imagen de usuario
                    $(".botonLogin").hide();
                    $(".botonLogout").show();
                    $(".sesionUsuario").css('display','flex');
                    $("#usuario").val("");
                    $("#password").val("");
                    $("#modelId").modal("hide");

                    //Muestra la imagen que le corresponde al usuario que ha iniciado sesion
                   img="<a href='#' class='ml-3' ><img id='imgSesion' src='../../view/uploads/" + result.usuarioSesion.imagen + "'></a>";

                   $("#sitioUsuario").html(img);

                }
                
    		})
            .catch(error => console.error('Error status:', error));	

        }else{

            //en caso de estar vacios, aparecera un alert advirtiendo al usuario
            alert("Los campos usuario y contraseña no pueden estar vacios");

        }
}

//Fucnion de logout
function logout(){

    //Vacia los valores de los campos usuario y contraseña
    $("#usuario").val("");
    $("#password").val("");

    //Esconde el boton de iniciar sesion y muestra el de cerrarla y el div que contiene la imagen del usuario
    $(".botonLogin").show();
    $(".botonLogout").hide();
    $(".sesionUsuario").hide();

    //Llamada fetch al controlador cLogout
    var url = "../../controller/cLogout.php";
	fetch(url, {
		  method: 'GET', 
		  headers:{'Content-Type': 'application/json'}
		  })
	.then(res => res.json()).then(result => {
	
        console.log(result.confirm);
        alert(result.confirm);
	
	})
	.catch(error => console.error('Error status:', error));	

}

function sessionVarsView(){
	
    var url="../../controller/cSessionVarsView.php";

    		fetch(url, {
    			  method: 'GET', 
    			  headers:{'Content-Type': 'application/json'}  // input data
    			  })
    		.then(res => res.json()).then(result => {
    			
    			var usuario=result.usuario;
    			//console.log(usuario);
    			
    			if (usuario !=null){
    				
    				for(let i=0; i<usuario.length; i++){
    					//Muestra la imagen que le corresponde al usuario que ha iniciado sesion
                        img="<a href='../view/pages/usuario.html'><img id='imgSesion' src='view/img/" + usuario[i].imagen + "'></a>";
    		             $(".botonLogin").hide();
    		             $(".botonLogout").show();
    		             $(".sesionUsuario").css('display','flex');
    		             $("#sitioUsuario").html(img);
    				}

             
          }

    		})
    		.catch(error => console.error('Error status:', error));	
    }

