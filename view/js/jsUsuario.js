$(document).ready(function () {

    $(".botonLoginStart").click(login);
    $(".botonLogout").click(logout);
    sessionVarsView();

});

function equiposDesdeSocios(id){
    pagina="equipos.html?" + id;
    window.location.href=pagina;	
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
        window.location.href="../../index.html";
	
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
    			console.log(usuario);
    			
    			if (usuario !=null){
    				
    				for(let i=0; i<usuario.length; i++){
    					//Muestra la imagen que le corresponde al usuario que ha iniciado sesion
                        img="<a href='#'><img id='imgSesion' src='../uploads/" + usuario[i].imagen + "'></a>";
    		             $(".botonLogin").hide();
    		             $(".botonLogout").show();
    		             $(".sesionUsuario").css('display','flex');
                         $("#sitioUsuario").html(img);
                         zonaAdministrador(usuario);
    				}
                }

               

    		})
    		.catch(error => console.error('Error status:', error));	
    }

    function zonaAdministrador(usuario){

       /*Si es usuario sacar acciones diferentes al administrador*/
        for(let i=0; i<usuario.length; i++){

            if(usuario[i].admin==0){
                usuarioInfo="<div class='col-lg-12 m-1'>" +
                                "<h1>" + usuario[i].usuario + "</h1>" +
                                "<h2>Selecciona la opción que desea: </h2>" +
                             "</div>" +
                             "<div class='col-lg-12 m-1'>" +
                                "<button type='button' class='btn text-white m-2 col-lg-2' id='btnMisDatos'>Mis datos</button>" +
                                "<button type='button' class='btn text-white m-2 col-lg-2' id='btnUpdateUsuario'>Actualizar Información</button>" +
                            "</div>" +
                            "<div class='row justify-content-center' id='acciones'></div>"; //DIV para añadir los datos
            }else if(usuario[i].admin==1){
                usuarioInfo="<div class='col m-1'>" +
                                "<div class='row justify-content-center align-items-center'>" +
                                    "<div class='col'>" +
                                        "<h1>" + usuario[i].usuario + "</h1>" +
                                        "<h2>Selecciona la opción que desea: </h2>" +
                                    "</div>" +    
                                    
                             "</div>" +
                             "<div class='col m-1'>" +
                                "<button type='button' class='btn text-white m-2' id='btnUpdateUsuario'>Actualizar información</button>" +
                                "<button type='button' class='btn text-white m-2' id='btnUpdateJugador'>Actualizar jugador</button>" +
                                "<button type='button' class='btn text-white m-2' id='btnDeleteUsuario'>Borrar usuario</button>" +
                            "</div>" +
                            "<div class='row justify-content-center' id='acciones'></div>" + //DIV para añadir los datos
                            "<div class='row justify-content-center' id='formularioInformacion'></div>"; //div para añadir formulario dcon datos para actualizar

            }

        }


        $("#zonaUsuario").append(usuarioInfo);

        /*Al hacer click, se nos muestra un formulario con los datos del adminsitrador*/
        $("#btnUpdateUsuario").click(function(){
            updateUsuario(usuario);
        });

        /*Al hacer click, se nos muestran los datos del usuario*/
        $("#btnMisDatos").click(function(){
            datosUsuario(usuario);
        });
        /*Al hacer click, se nos muestra un select con todos los usuarios para eliminar*/
        $("#btnDeleteUsuario").click(function(){
            loadUsers();
        });

        /*Al hacer click, se nos muestra un select con todos los usuarios para actualizar*/
        $("#btnUpdateJugador").click(function(){
            loadUsersToUpdate();
        });
    }

   function datosUsuario(usuario){

        $("#acciones").html("");

        newrow = "<div class='row datosDeUsuario m-5 text-white'>"+
        "<div class='row-lg-3'>"+
            "<div class='col-lg-12'>"+
                "<p class='font-weight-bold'>Nombre:</p>"+
                "<p>"+ usuario[0].nombre + " " +usuario[0].apellidos+ "</p>"+
            "</div>"+
            "<div class='col-lg-12 '>"+
                "<p class='font-weight-bold'>Direccion:</p>"+
                "<p>"+ usuario[0].direccion + "</p>"+
            "</div>"+
            "<div class='col-lg-12 '>"+
                "<p class='font-weight-bold'>Fecha de Nacimiento:</p>"+
                "<p>"+ usuario[0].fechaDeNacimiento+ "</p>"+
            "</div>"+
        "</div>"+
        "<div class='row'>"+
            "<div class='m-5'>"+
                "<img class='imagenUsuario' src='../uploads/"+ usuario[0].imagen + "'>"+
            "</div>"+
        "</div>"+
        "<div class='row-lg-3'>"+
            "<div class='col-lg-12'>"+
                "<p class='font-weight-bold'>Correo electronico:</p>"+
                "<p>"+ usuario[0].email + "</p>"+
            "</div>"+
            "<div class='col-lg-12 '>"+
                "<p class='font-weight-bold'>Usuario:</p>"+
                "<p>"+ usuario[0].usuario+ "</p>"+
            "</div>"+
            "<div class='col-lg-12'>"+
                "<p class='font-weight-bold'>Contraseña:</p>"+
                "<p>"+ usuario[0].password + "</p>"+
            "</div>"+
        "</div>"+
    "</div>";

        $('#acciones').html(newrow);

    }

    function updateUsuario(usuario){

      //  if(usuario[0].tipo != "4"){

        for(let i=0; i<usuario.length; i++){

            $("#acciones").html("");
            /*Formulario con datos del usuario para modificar si es jugador, entrenador o delegado*/
            formulario="<form>" +

                        "<div class='form-row justify-content-center'>" +
                            "<div class='form-group col-lg-6'>" +
                                "<label for='nombre'>Nombre:</label>" +
                                "<input type='text' class='form-control' id='nombre' value='" + usuario[i].nombre + "' disabled>" +
                            "</div>" + 
                            "<div class='form-group col-lg-6'>" + 
                                "<label for='apellido'>Apellidos:</label>" +
                                "<input type='text' class='form-control' id='apellidos' value='" + usuario[i].apellidos + "' disabled>" +
                            "</div>" + 
                        "</div>" +

                        "<div class='form-row justify-content-center'>" +
                            "<div class='form-group col-lg-6'>" +
                                "<label for='usuario'>Usuario:</label>" +
                                "<input type='text' class='form-control' id='username' value='" + usuario[i].usuario + "' disabled>" +
                            "</div>" + 
                            "<div class='form-group col-lg-6'>" + 
                                "<label for='contraseña'>Contraseña:</label>" +
                                "<input type='text' class='form-control' id='contraseña' value='" + usuario[i].password + "'>" +
                            "</div>" + 
                        "</div>" +

                        "<div class='form-row justify-content-center'>" +
                            "<div class='form-group col-lg-6'>" +
                                "<label for='email'>Email:</label>" +
                                "<input type='text' class='form-control' id='email' value='" + usuario[i].email + "'>" +
                            "</div>" + 
                            "<div class='form-group col-lg-6'>" + 
                                "<label for='direccion'>Dirección:</label>" +
                                "<input type='text' class='form-control' id='direccion' value='" + usuario[i].direccion + "'>" +
                            "</div>" + 
                        "</div>" +
                        "<button type='button' id='btnExecuteUpdate' class='btn text-white'>Actualizar</button>" +
                        "</form>";
        }

   // }else{

        /*for(let i=0; i<usuario.length; i++){

            $("#acciones").html("");
            /*Formulario con datos del usuario para modificar si es socio*/
            /*formulario="<form>" +

                        "<div class='form-row justify-content-center'>" +
                            "<div class='form-group col-md-4'>" +
                                "<label for='nombre'>Nombre:</label>" +
                                "<input type='text' class='form-control' id='nombre' value='" + usuario[i].nombre + "' disabled>" +
                            "</div>" + 
                            "<div class='form-group col-md-4'>" + 
                                "<label for='apellido'>Apellidos:</label>" +
                                "<input type='text' class='form-control' id='apellidos' value='" + usuario[i].apellidos + "' disabled>" +
                            "</div>" + 
                        "</div>" +

                        "<div class='form-row justify-content-center'>" +
                            "<div class='form-group col-md-4'>" +
                                "<label for='usuario'>Usuario:</label>" +
                                "<input type='text' class='form-control' id='username' value='" + usuario[i].usuario + "' disabled>" +
                            "</div>" + 
                            "<div class='form-group col-md-4'>" + 
                                "<label for='contraseña'>Contraseña:</label>" +
                                "<input type='text' class='form-control' id='contraseña' value='" + usuario[i].password + "'>" +
                            "</div>" + 
                        "</div>" +

                        "<div class='form-row justify-content-center'>" +
                            "<div class='form-group col-md-4'>" +
                                "<label for='email'>Email:</label>" +
                                "<input type='text' class='form-control' id='email' value='" + usuario[i].email + "'>" +
                            "</div>" + 
                            "<div class='form-group col-md-4'>" + 
                                "<label for='direccion'>Dirección:</label>" +
                                "<input type='text' class='form-control' id='direccion' value='" + usuario[i].direccion + "'>" +
                            "</div>" + 
                        "</div>" +*/
                        /*"<div class='col-lg-6 p-3 text-center' id='containerImagen'>"+
                            "<label>Actualizar imagen de perfil</label><br>"+
                            "<input type='text' name='imagen' id='imagen' accept='.png,.jpeg,.jpg,.gif'>"+
                            "<label type='text' for='imagen' class='btn text-white col-lg-6 col-md-4 col-sm-4 col-4' id='btnSubirArchivo'>Subir nueva imagen</label>"+
                        "</div>"+
                        /*"<div class='col-lg-6 p-3 text-center'>"+
                            "<img  src='../uploads/"+usuario[i].imagen +"' id='fotoPerfil'>"+
                        "</div>"+
                        "<button type='button' id='btnExecuteUpdate' class='btn text-white'>Actualizar</button>" +
                        "</form>";
        }
    }*/

        /*ID del admin*/
        idUsuario=usuario[0].id;

        $("#acciones").append(formulario);
        /*Click en el boton actualizar para hacer el update*/
        $("#btnExecuteUpdate").click(function(){
            execUpdate(idUsuario);
        });

    }

    function execUpdate(idUsuario){
       /*Datos nuevos del admin*/
        password=$("#contraseña").val();
        email=$("#email").val();
        direccion=$("#direccion").val();

        var url = "../../controller/cUpdateUser.php";
        var data = {'id':idUsuario, 'password':password, 'email':email, 'direccion':direccion};
        console.log(data);
        
        fetch(url, {
			  method: 'POST', 
			  body: JSON.stringify(data), // data can be `string` or {object}!
			  headers:{'Content-Type': 'application/json'}  // input data
            })
            
		.then(res => res.json()).then(result => {

            $("#acciones").html("");

            /*Alert + recargar pagina*/
          alert("Información actualizada correctamente");
          window.location.reload();
          
          
		})
      .catch(error => console.error('Error status:', error));	

    }

    function loadUsers(){

        var url = "../../controller/cUsers.php";

        fetch(url, {
            method: 'GET', 
            headers:{'Content-Type': 'application/json'}  // input data
            })
      .then(res => res.json()).then(result => {
          
          var usuarios=result.list;
          /*Cargar los usuarios en el select*/

          $("#acciones").html("");

          selectUsuario="<div class='col-lg-12'><h2>Selecciona un usuario para eliminar</h2>";
          selectUsuario+="<select id='selectUsuarios'>";
          selectUsuario+="<option selected>Selecciona un usuario</option>";
          
          for(let i=0; i<usuarios.length; i++){
              
            selectUsuario+="<option value='" + usuarios[i].nombre + " " + usuarios[i].apellidos + "' id='" + usuarios[i].id + "'>" + usuarios[i].id + " -- " + usuarios[i].nombre + " " + usuarios[i].apellidos + "</option>";
              
          }

          selectUsuario+="</select></div>";
          $("#acciones").append(selectUsuario);
          
          /*Conseguir la id del usuario y eliminarlo al hacer change*/
          $("#selectUsuarios").change(function(){
              
              var idUsuario = $(this).children(":selected").attr("id");
              var nombreApellido = $(this).children(":selected").val();

              document.getElementById("selectUsuarios").addEventListener("click", execDelete(idUsuario, nombreApellido));
 
          });

      })
      .catch(error => console.error('Error status:', error));	

    }

    function execDelete(idUsuario, nombreApellido){
        
        var confirmar=confirm("¿Estás seguro de borrar a " + nombreApellido + "?");

        if(confirmar==true){

            var url = "../../controller/cDeleteUser.php";
            var data = {'id':idUsuario};
            console.log(data);
          
            fetch(url, {
                    method: 'POST', 
                    body: JSON.stringify(data), // data can be `string` or {object}!
                    headers:{'Content-Type': 'application/json'}  // input data
                })
                
            .then(res => res.json()).then(result => {

                $("#acciones").html("");
    
                /*Alert + recargar pagina*/
                alert("Usuario eliminado correctamente");
                window.location.reload();

            })
            .catch(error => console.error('Error status:', error));	

        }

    }

    function loadUsersToUpdate(){

        var url = "../../controller/cUsers.php";

        fetch(url, {
            method: 'GET', 
            headers:{'Content-Type': 'application/json'}  // input data
            })
      .then(res => res.json()).then(result => {
          
          var usuarios=result.usuarios;

          $("#acciones").html("");

          selectUsuario="<div class='col-lg-12'><h2>Selecciona un usuario para actualizar</h2>";
          selectUsuario+="<select id='selectUsuarios'>";
          selectUsuario+="<option selected>Selecciona un usuario</option>";
          
          for(let i=0; i<usuarios.length; i++){

            /*Teniendo en cuenta el tipo, añadir su tipo al select*/
            if(usuarios[i].tipo==1){
                selectUsuario+="<option id='" + usuarios[i].id + "'>" + usuarios[i].nombre + " " + usuarios[i].apellidos + " -- " + "Jugador</option>";
            }else if(usuarios[i].tipo==2){
                selectUsuario+="<option id='" + usuarios[i].id + "'>" + usuarios[i].nombre + " " + usuarios[i].apellidos + " -- " + "Entrenador</option>";
            }else{
                selectUsuario+="<option id='" + usuarios[i].id + "'>" + usuarios[i].nombre + " " + usuarios[i].apellidos + " -- " + "Delegado</option>";
            }
              
            
              
          }

          selectUsuario+="</select></div>";
          $("#acciones").append(selectUsuario);
          
          /*Conseguir la id del usuario y sacar un formulario con los datos para actualizar al hacer change*/
          $("#selectUsuarios").change(function(){
              
            var idUsuario = $(this).children(":selected").attr("id");
            updateUser2(idUsuario);
          });
          

      })
      .catch(error => console.error('Error status:', error));	

    }

    function updateUser2(idUsuario){

        var url = "../../controller/cUserbyId.php";
        var data={"id": idUsuario};

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'}  // input data
            })
      .then(res => res.json()).then(result => {
          
        var usuario=result.usuario;
        

        for(let i=0; i<usuario.length; i++){

            if(usuario[i].tipo==1){//Jugador

                $("#formularioInformacion").html("");

                /*Formulario con datos del administrador para modificar*/
                formulario="<form>" +

                "<div class='form-row justify-content-center'>" +
                    "<div class='form-group col-lg-6'>" +
                        "<label for='nombre'>Nombre:</label>" +
                        "<input type='text' class='form-control' id='nombre' value='" + usuario[i].nombre + "' disabled>" +
                    "</div>" + 
                    "<div class='form-group col-lg-6'>" + 
                        "<label for='apellido'>Apellidos:</label>" +
                        "<input type='text' class='form-control' id='apellidos' value='" + usuario[i].apellidos + "' disabled>" +
                    "</div>" + 
                "</div>" +

                "<div class='form-row justify-content-center'>" +
                    "<div class='form-group col-lg-6'>" +
                        "<label for='usuario'>Usuario:</label>" +
                        "<input type='text' class='form-control' id='username' value='" + usuario[i].usuario + "' disabled>" +
                    "</div>" + 

                    "<div class='form-group col-lg-6'>" + 

                        "<div class='row justify-content-center'>" +

                            "<div class='col-lg-4'>" +
                                "<label for='posicion'>Delantero</label>" +
                                "<input type='radio' id='delantero' value='Delantero' name='posiciones'>" +
                            "</div>" +

                            "<div class='col-lg-4'>" +
                                "<label for='posicion'>Zaguero</label>" +
                                "<input type='radio' id='zaguero' value='Zaguero' name='posiciones'>" +
                            "</div>" +    

                            "<div class='col-lg-4'>" +
                                "<label for='posicion'>Liberos</label>" +
                                "<input type='radio' id='libero' value='Libero' name='posiciones'>" +
                            "</div>" +

                        "</div>" +

                    "</div>" + 
                "</div>" +

                "<div class='form-row justify-content-center'>" +
                    "<div class='form-group col-lg-6'>" +
                        "<label for='altura'>Altura:</label>" +
                        "<input type='number' class='form-control' id='altura' value='" + usuario[i].objJugador.altura + "'>" +
                    "</div>" + 
                    "<div class='form-group col-lg-6'>" + 
                        "<label for='peso'>Peso:</label>" +
                        "<input type='number' class='form-control' id='peso' value='" + usuario[i].objJugador.peso + "'>" +
                    "</div>" + 
                "</div>" +
                "<button type='button' id='btnExecuteUpdateUser' class='btn text-white'>Actualizar</button>" +
                "</form>";

            }else if(usuario[i].tipo==2){//Entrenador

                $("#formularioInformacion").html("");

                /*Formulario con datos del administrador para modificar*/
                formulario="<form>" +

                "<div class='form-row justify-content-center'>" +
                    "<div class='form-group col-lg-6'>" +
                        "<label for='nombre'>Nombre:</label>" +
                        "<input type='text' class='form-control' id='nombre' value='" + usuario[i].nombre + "' disabled>" +
                    "</div>" + 
                    "<div class='form-group col-lg-6'>" + 
                        "<label for='apellido'>Apellidos:</label>" +
                        "<input type='text' class='form-control' id='apellidos' value='" + usuario[i].apellidos + "' disabled>" +
                    "</div>" + 
                "</div>" +
                "<div class='form-row justify-content-center'>" +
                    "<div class='form-group col-lg-6'>" +
                        "<label for='usuario'>Usuario:</label>" +
                        "<input type='text' class='form-control' id='usuario' value='" + usuario[i].usuario + "' disabled>" +
                    "</div>" + 
                    "<div class='form-group col-lg-6'>" + 
                        "<label for='experiencia'>Experiencia:</label>" +
                        "<input type='number' class='form-control' id='experiencia' value='" + usuario[i].objEntrenador.experiencia + "'>" +
                    "</div>" + 
                "</div>" +

                

                
                "<button type='button' id='btnExecuteUpdateUser' class='btn text-white'>Actualizar</button>" +
                "</form>";

            }else{//Delegado

                $("#formularioInformacion").html("");

                 /*Formulario con datos del administrador para modificar*/
                 formulario="<form>" +

                 "<div class='form-row justify-content-center'>" +
                     "<div class='form-group col-lg-6'>" +
                         "<label for='nombre'>Nombre:</label>" +
                         "<input type='text' class='form-control' id='nombre' value='" + usuario[i].nombre + "' disabled>" +
                     "</div>" + 
                     "<div class='form-group col-lg-6'>" + 
                         "<label for='apellido'>Apellidos:</label>" +
                         "<input type='text' class='form-control' id='apellidos' value='" + usuario[i].apellidos + "' disabled>" +
                     "</div>" + 
                 "</div>" +
                 "<div class='form-row justify-content-center'>" +
                     "<div class='form-group col-lg-6'>" +
                         "<label for='usuario'>Usuario:</label>" +
                         "<input type='text' class='form-control' id='usuario' value='" + usuario[i].usuario + "' disabled>" +
                     "</div>" + 
                     "<div class='form-group col-lg-6'>" + 
                         "<label for='experiencia'>Experiencia:</label>" +
                         "<input type='number' class='form-control' id='experiencia' value='" + usuario[i].objDelegado.experiencia + "'>" +
                     "</div>" + 
                 "</div>" +

                 "<button type='button' id='btnExecuteUpdateUser' class='btn text-white'>Actualizar</button>" +
                 "</form>";
            }

        }

        $("#formularioInformacion").append(formulario);

        $("#btnExecuteUpdateUser").click(function(){
            
            executeUpdate2(usuario);

        });

  
      })
      .catch(error => console.error('Error status:', error));

    }

    function executeUpdate2(usuario){

        if(usuario[0].tipo==1){

            posicion=$('input[name="posiciones"]:checked').val();
            altura=$("#altura").val();
            peso=$("#peso").val();

            var url = "../../controller/cUpdateJugador.php";
            var data = {'id':usuario[0].id, 'posicion':posicion, 'altura':altura, 'peso':peso};
            
            fetch(url, {
                method: 'POST', 
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers:{'Content-Type': 'application/json'}  // input data
                })
                
            .then(res => res.json()).then(result => {

                $("#acciones").html("");
                $("#formularioInformacion").html("");

                /*Alert + recargar pagina*/
            alert("Información actualizada correctamente");
            window.location.reload();
            
            
            })
        .catch(error => console.error('Error status:', error));


        }


    }
