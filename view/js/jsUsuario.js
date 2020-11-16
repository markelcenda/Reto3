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
                usuarioInfo="<div class='col m-1'>" +
                                "<p>" + usuario[i].admin + "</p>" +
                             "</div>" +
                             "<div class='col m-1'>" +
                                "<button type='button' class='btn btn-primary' id='btnUpdateUsuario'>Actualizar Información</button>" +
                                "<button type='button' class='btn btn-primary'>Borra usuario</button>" +
                            "</div>";
            }else if(usuario[i].admin==1){
                usuarioInfo="<div class='col m-1' id='acciones'>" +
                                "<div class='row justify-content-center align-items-center'>" +
                                    "<div class='col'>" +
                                        "<h2>Selecciona la opción que desea: </h2>" +
                                    "</div>" +    
                                    
                             "</div>" +
                             "<div class='col m-1'>" +
                                "<button type='button' class='btn btn-primary m-1' id='btnUpdateUsuario'>Actualizar información</button>" +
                                "<button type='button' class='btn btn-primary m-1' id='btnInsertUsuario'>Insertar nuevo usuario</button>" +
                                "<button type='button' class='btn btn-primary m-1' id='btnDeleteUsuario'>Borrar usuario</button>" +
                            "</div>";
            }

        }


        $("#zonaUsuario").append(usuarioInfo);

        /*Al hacer click, se nos muestra un formulario con los datos del adminsitrador*/
        $("#btnUpdateUsuario").click(function(){
            updateUsuario(usuario);
        });

        /*Al hacer click, se nos muestra un select con los usuarios y borrarlo*/
        $("#btnDeleteUsuario").click(function(){
            loadUsers();
        });

    }

    function updateUsuario(usuario){

        var formulario="";

        for(let i=0; i<usuario.length; i++){

            /*Formulario con datos del administrador para modificar*/
            formulario="<form>" +

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
                        "</div>" +
                        "<button type='button' id='btnExecuteUpdate' class='btn btn-primary'>Actualizar</button>" +
                        "</form>";
        }

        /*ID del admin*/
        idUsuario=usuario[0].id;

        $("#acciones").html(formulario);
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
        console.log(usuarios);
          /*Cargar los usuarios en el select*/
          selectUsuario="<h2>Selecciona un usuario para eliminar</h2>";
          selectUsuario+="<select id='selectUsuarios'>";
          selectUsuario+="<option selected>Selecciona un usuario</option>";
          
          for(let i=0; i<usuarios.length; i++){
              
            selectUsuario+="<option value='" + usuarios[i].nombre + " " + usuarios[i].apellidos + "' id='" + usuarios[i].id + "'>" + usuarios[i].id + " -- " + usuarios[i].nombre + " " + usuarios[i].apellidos + "</option>";
            /*nombre=usuarios[i].nombre;
            apellidos=usuarios[i].apellidos;*/
              
          }

          selectUsuario+="</select>";
          $("#acciones").html(selectUsuario);
          
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
    
                /*Alert + recargar pagina*/
                alert("Usuario eliminado correctamente");
                window.location.reload();

            })
            .catch(error => console.error('Error status:', error));	

        }

    }
