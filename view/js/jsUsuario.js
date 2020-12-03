$(document).ready(function () {

    $(".botonLoginStart").click(login);
    $(".botonLogout").click(logout);
    $("#imagen").change(changeImg);

    sessionVarsView();

});

//cargar la pagina del equipo seleccionado
function equiposDesdeSocios(id){
    pagina="equipos.html?" + id;
    window.location.href=pagina;	
  }

  //Iniciar sesión
function login(){

    //Variables que adquieren el valor de los datos introducidos en el modal
	 usuario=$("#usuario").val();
     password=$("#password").val();

     //Filtro que mira si los campos usuario y contraseña estan vacio
    if(usuario != "" && password != ""){
    
    //en caso de no estar vacio se mandaran los datos al controlador cLogin
    var url = "../../controller/cLogin.php";
    var data = {'usuario':usuario, 'password':password};

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

                    //Al detectar que si, esconde el boton de iniciar sesion y muestra el de cerrarla y la imagen de usuario
                    $(".botonLogin").hide();
                    $(".botonLogout").show();
                    $(".sesionUsuario").css('display','flex');
                    $("#usuario").val("");
                    $("#password").val("");
                    $("#modelId").modal("hide");

                    //Muestra la imagen que le corresponde al usuario que ha iniciado sesion
                   img="<a href='#'><img id='imgSesion' src='../../view/img/" + result.usuarioSesion.imagen + "'></a>";

                   $("#sitioUsuario").html(img);

                }
                
    		})
            .catch(error => console.error('Error status:', error));	

        }else{

            //en caso de estar vacios, aparecera un alert advirtiendo al usuario
            alert("Los campos usuario y contraseña no pueden estar vacios");

        }
}

//Cerrar sesion
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

        alert(result.confirm);
        window.location.href="../../index.html";
	
	})
	.catch(error => console.error('Error status:', error));	

}

//Comprobar si el usuario esta conectado
function sessionVarsView(){
	
    var url="../../controller/cSessionVarsView.php";

    		fetch(url, {
    			  method: 'GET', 
    			  headers:{'Content-Type': 'application/json'}  // input data
    			  })
    		.then(res => res.json()).then(result => {
    			
    			var usuario=result.usuario;
    			
    			if (usuario !=null){
    				
    				for(let i=0; i<usuario.length; i++){
    					//Muestra la imagen que le corresponde al usuario que ha iniciado sesion
                        img="<a href='#'><img id='imgSesion' src='../img/" + usuario[i].imagen + "'></a>";
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

    //Añadir la foto de perfil
    function zonaAdministrador(usuario){

       /*Si es usuario sacar acciones diferentes al administrador*/
        for(let i=0; i<usuario.length; i++){

            if(usuario[i].admin==0){
                usuarioInfo="<div class='col m-1'>" +
                                "<div class='row justify-content-center align-items-center'>" +
                                    "<div class='col'>" +
                                        "<h1>" + usuario[i].usuario + "</h1>" +
                                        "<h2>Selecciona la opción que desea: </h2>" +
                                    "</div>" +     
                            "</div>" +
                            "<div class='col m-1'>" +
                                "<button type='button' class='btn text-white m-2 col-lg-2 col-md-5 col-sm-4 col-5' id='btnMisDatos'>Mis datos</button>" +
                                "<button type='button' class='btn text-white m-2 col-lg-2 col-md-5 col-sm-4 col-5' id='btnUpdateUsuario'>Actualizar Información</button>" +
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
                                "<button type='button' class='btn text-white m-2' id='btnDatosAdmin'>Ver mis datos</button>" +
                                "<button type='button' class='btn text-white m-2' id='btnUpdateUsuario'>Actualizar mis datos</button>" +
                                "<button type='button' class='btn text-white m-2' id='btnDatosUsuario'>Ver datos de usuario</button>" +
                            "</div>" +
                            "<div class='row justify-content-center' id='acciones'></div>" + //DIV para añadir los datos
                            "<div class='row justify-content-center' id='formularioInformacion'></div>" + //div para añadir formulario dcon datos para actualizar
                            "<div class='row justify-content-center' id='añadirForm'></div>"; //div para añadir formulario dcon datos para actualizar
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

        /*Al hacer click, se nos muestran los datos del administrador*/
        $("#btnDatosAdmin").click(function(){
            datosUsuario(usuario);
        });

        /*Al hacer click, se nos muestran los datos del usuario seleccionado*/
        $("#btnDatosUsuario").click(function(){
            loadTipos();
        });

    }

   function datosUsuario(usuario){

        $("#acciones").html("");
        $("#formularioInformacion").html("");
        $("#añadirForm").html("");

        newrow = "<div class='row justify-content-center align-items-center datosDeUsuario m-5 text-white'>"+
        "<div class='row-lg-3 order-lg-1 order-md-1 order-sm-1 order-1'>"+
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
        "<div class='row order-lg-2 order-md-3 order-sm-3 order-3'>"+
            "<div class='m-5'>"+
                "<img class='imagenUsuario' src='../img/"+ usuario[0].imagen + "'>"+
            "</div>"+
        "</div>"+
        "<div class='row-lg-3 order-lg-3 order-md-2 order-sm-2 order-2'>"+
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

        $('#acciones').append(newrow);
    }

    //Actualizar informacion del usuario conectado
    function updateUsuario(usuario){

        for(let i=0; i<usuario.length; i++){

            /*limpiar div*/
            $("#acciones").html("");
            $("#formularioInformacion").html("");
            $("#añadirForm").html("");
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
                            "<div class='row'>"+                         
                                "<div class='col-lg-6 p-3 text-center' id='containerImagen'>"+
                                    "<label>Imagen de perfil</label><br>"+
                                    "<input type='file' name='imagen' id='imagen' accept='.png,.jpeg,.jpg,.gif'>"+
                                    "<label type='file' for='imagen' class='btn text-white col-lg-12 col-md-4 col-sm-4 col-4' id='btnSubirArchivo'>Nueva imagen <i class='fas fa-upload text-white'></i></label>"+
                                "</div>"+
                                "<div class='col-lg-6 p-3 text-center'>"+
                                    "<img src='../img/"+usuario[i].imagen+"' id='fotoPerfil'>"+
                                "</div>"+
                            "</div>"+
                        "<button type='button' id='btnExecuteUpdate' class='btn text-white m-2'>Actualizar</button>" +
                        "</form>";

    //Guarda el email del usuario
    emailActual = usuario[i].email;

    /*Por defecto la varible filename contendra el nombre de la imagen por defecto y savedFileBase64 no tendra nada
    a menos que se active la funcion "changeImg"*/
    filename = usuario[i].imagen;
    savedFileBase64 = "";
    //Guarda el nombre de la imagen actual del usuario para despues eliminarla de la carpeta img
    imgAnterior = usuario[i].imagen;

        }
        /*ID del admin*/
        idUsuario=usuario[0].id;

        $("#acciones").append(formulario);
        /*Click en el boton actualizar para hacer el update*/
        $("#btnExecuteUpdate").click(function(){
            //Guarda el valor del input email del formulario
            nuevoEmail = $("#email").val();

            var url = "../../controller/cUsers.php";

            //Llamada fetch
            fetch(url, {
                method: 'GET',
            })
    
                .then(res => res.json()).then(result => {

                    var list = result.list;
                    permitirUpdate = true;

                    //recorre toda la lista de usuarios
                    for (let i = 0; i < list.length; i++) {
                        //mira si el correo eletronico introducido coincide con alguno de la base de datos
                        if (nuevoEmail == list[i].email) {

                            permitirUpdate = false;
                            
                            //Mira si el el correo del input y el del usuario coinciden. De ser asi, permite el update
                            if(nuevoEmail == emailActual){
                                permitirUpdate = true;
                            }
                            break;
                        }
                    }

        //Mira si el usuario tiene permitido el update. En caso de no tenerlo, se pondra el borde del input email en rojo y saldra un alert
                    if(permitirUpdate == true){

                        execUpdate(idUsuario);
    
                    }else{
    
                        $("#email").css("border", "2px solid red");
                        alert("Ya existe un usuario con ese correo electronico");
                    }
                })
                .catch(error => console.error('Error status:', error));
        });
    }

    //Cambia la foto de perfil que esta por defecto en el formulario por la introducida por el usuario
function changeImg() {

    var file = $("#imagen")[0].files[0];

    filename = file.name.toLowerCase();
    filesize = file.size;

    var reader = new FileReader();

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

    //Ejecutar update de la informacion del usuario
    function execUpdate(idUsuario){
       /*Datos nuevos del admin*/
        password=$("#contraseña").val();
        email=$("#email").val();
        direccion=$("#direccion").val();
        imagen = filename;

        var url = "../../controller/cUpdateUser.php";
        var data = {'id':idUsuario, 'password':password, 'email':email, 'direccion':direccion, 'imagen':imagen, 'filename':filename, 'savedFileBase64': savedFileBase64, 'imgAnterior':imgAnterior};
        
        fetch(url, {
			  method: 'POST', 
			  body: JSON.stringify(data), // data can be `string` or {object}!
			  headers:{'Content-Type': 'application/json'}  // input data
            })
            
		.then(res => res.json()).then(result => {

            /*limpiar div*/
            $("#acciones").html("");
            $("#formularioInformacion").html("");
            $("#añadirForm").html("");

            /*Alert + recargar pagina*/
          alert("Información actualizada correctamente");
          window.location.reload();
          
		})
      .catch(error => console.error('Error status:', error));	

    }

    //Cargar usuarios para hacer el update
    function loadUsersToUpdate(){

        var url = "../../controller/cUsers.php";

        fetch(url, {
            method: 'GET', 
            headers:{'Content-Type': 'application/json'}  // input data
            })
      .then(res => res.json()).then(result => {
          
          var usuarios=result.usuarios;

          /*limpiar div*/
          $("#acciones").html("");
          $("#formularioInformacion").html("");
          $("#añadirForm").html("");

          selectUsuario="<div class='col-lg-12'><h2>Selecciona un usuario para actualizar</h2>";
          selectUsuario+="<select id='selectUsuarios'>";
          selectUsuario+="<option selected>Selecciona un usuario</option>";
          
          for(let i=0; i<usuarios.length; i++){

            /*Teniendo en cuenta el tipo, añadir su tipo al select*/
            if(usuarios[i].tipo==1){
                selectUsuario+="<option id='" + usuarios[i].id + "'>" + usuarios[i].nombre + " " + usuarios[i].apellidos + " -- Jugador</option>";
            }else if(usuarios[i].tipo==2){
                selectUsuario+="<option id='" + usuarios[i].id + "'>" + usuarios[i].nombre + " " + usuarios[i].apellidos + " -- Entrenador</option>";
            }else if(usuarios[i].tipo==3){
                selectUsuario+="<option id='" + usuarios[i].id + "'>" + usuarios[i].nombre + " " + usuarios[i].apellidos + " -- Delegado</option>";
            }else{
                selectUsuario+="<option id='" + usuarios[i].id + "'>" + usuarios[i].nombre + " " + usuarios[i].apellidos + " -- Socio</option>";
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

    /*Añadir al select los tipos*/
    function loadTipos(){

        var url = "../../controller/cTipos.php";

        fetch(url, {
            method: 'GET', 
            headers:{'Content-Type': 'application/json'}  // input data
            })
      .then(res => res.json()).then(result => {
          
          var tipos=result.list;

          /*limpiar div*/
          $("#acciones").html("");
          $("#formularioInformacion").html("");
          $("#añadirForm").html("");

          selectTipo="<div class='col-lg-6'><h2>Selecciona un tipo para cargar los usuarios</h2>";
          selectTipo+="<select id='selectTipos'>";
          selectTipo+="<option selected>Selecciona un tipo</option>";

          for(let i=0; i<tipos.length; i++){
            selectTipo+="<option id='" + tipos[i].id + "' value='" + tipos[i].tipo + "'>" + tipos[i].id + "--" + tipos[i].tipo + "</option>";
          }

          selectTipo+="</select></div>";
          selectTipo+="<div class='col-lg-6' id='añadirUsuarios'></div>";
          $("#acciones").html(selectTipo);

          /*Conseguir la id del usuario y sacar un formulario con los datos para actualizar al hacer change*/
          $("#selectTipos").change(function(){
              
            var idTipo = $(this).children(":selected").attr("id");
            loadSelectUsers(idTipo);

          });

      })
      .catch(error => console.error('Error status:', error));

    }

    function loadSelectUsers(idTipo){

        var url = "../../controller/cUsersByType.php";
        var data={"idTipo": idTipo};

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'} 
            })
      .then(res => res.json()).then(result => {
          
        var usuarios=result.usuarios;

        selectUsuario="";

        if(usuarios[0].tipo==1){
            selectUsuario="<h2>Selecciona un jugador para cargar sus datos</h2>";
            selectUsuario+="<div class='row justify-content-center'><div class='col'><button type='button' class='btn text-white m-2' id='btnCrearJugador'><i class='fas fa-user-plus'></i></div></div>";
        }else if(usuarios[0].tipo==2){
            selectUsuario="<h2>Selecciona un entrenador para cargar sus datos</h2>";
            selectUsuario+="<div class='row justify-content-center'><div class='col'><button  type='button' class='btn text-white m-2' id='btnCrearEntrenador'><i class='fas fa-user-plus'></i></div></div>";
        }else if(usuarios[0].tipo==3){
            selectUsuario="<h2>Selecciona un delegado para cargar sus datos</h2>";
            selectUsuario+="<div class='row justify-content-center'><div class='col'><button  type='button' class='btn text-white m-2' id='btnCrearDelegado'><i class='fas fa-user-plus'></i></div></div>";
        }else{
            selectUsuario="<h2>Selecciona un socio para cargar sus datos</h2>";
        }

        
        selectUsuario+="<select id='selectUsuarios'>";
        selectUsuario+="<option selected>Selecciona un usuario</option>";

        for(let i=0; i<usuarios.length; i++){
            selectUsuario+="<option id='" + usuarios[i].id + "' value='" + usuarios[i].id + "'>" + usuarios[i].apellidos + ", " + usuarios[i].nombre + "</option>";
        }

        selectUsuario+="</select>";
        $("#añadirUsuarios").html(selectUsuario);

        /*Conseguir la id del usuario y sacar un DIV con los datos al hacer change*/
        $("#selectUsuarios").change(function(){
              
        var idUsuario = $(this).children(":selected").attr("id");
        showUser(idUsuario);

        });

        $("#btnCrearJugador").click(function(){
            crearJugador(usuarios[0].tipo);
        });
        $("#btnCrearEntrenador").click(function(){
            crearEntrenador(usuarios[0].tipo);
        });
        $("#btnCrearDelegado").click(function(){
            crearDelegado(usuarios[0].tipo);
        });
        
      })
      .catch(error => console.error('Error status:', error));
    }

    function crearJugador(tipo){
        
         /*limpiar div*/
         $("#añadirForm").html("");
         $(".datosDeUsuario").hide();
         $(".esconderDiv").hide();
         

         formulario=`<form id="formularioSocio">
         <div class="form-group col-lg-12 ">
             <div class="row">
                 <div class="col-lg-6 p-3">
                     <label for="nombre">Nombre<span class="text-danger">*</span></label>
                     <input type="text" class="form-control" id="nombre">
                 </div>
                 <div class="col-lg-6 p-3">
                     <label for="apellidos">Apellidos<span class="text-danger">*</span></label>
                     <input type="text" class="form-control" id="apellidos">
                 </div>
                 <div class="col-lg-4 p-3">
                     <label for="email">Correo electronico<span class="text-danger">*</span></label>
                     <input type="email" class="form-control" id="email">
                 </div>
                 <div class="col-lg-4 p-3">
                     <label for="direccion">Direccion<span class="text-danger">*</span></label>
                     <input type="text" class="form-control" id="direccion">
                 </div>
                 <div class="col-lg-4 p-3">
                     <label for="fechaNacimiento">Fecha de nacimiento<span
                             class="text-danger">*</span></label>
                     <input type="date" class="form-control" id="fechaNacimiento">
                 </div>
                 <div class="col-lg-6 p-3 ">
                     <label for="nuevoUsuario">Nombre de usuario<span class="text-danger">*</span></label>
                     <input type="text" class="form-control" id="nuevoUsuario">
                 </div>
                 <div class="col-lg-6 p-3">
                     <label for="contraseña">Contraseña<span class="text-danger">*</span></label>
                     <input type="password" class="form-control" id="contraseña">
                 </div>
                 <div class="col-lg-6 p-3 text-center" id="containerImagen">
                     <label>Imagen de perfil</label><br>
                     <input type="file" name="imagen" id="imagen" accept=".png,.jpeg,.jpg,.gif">
                     <label type="file" for="imagen" class="btn text-white col-lg-5 col-md-4 col-sm-4 col-4"
                         id="btnSubirArchivo">Subir imagen <i class="fas fa-upload text-white"></i></label>
                 </div>
                 <div class="col-lg-6 p-3 text-center">
                     <img src="../img/imagenDefault.png" id="fotoPerfil">
                 </div>
                 
             </div>
 
             <form id='jugadorForm'>
             <div class='row justify-content-center'>
             <div class='col-lg-4'>
                 <label for='posicion'>Delantero</label>
                 <input type='radio' id='delantero' value='Delantero' name='posiciones'>
             </div>

             <div class='col-lg-4'>
                 <label for='posicion'>Zaguero</label>
                 <input type='radio' id='zaguero' value='Zaguero' name='posiciones'>
             </div>   

             <div class='col-lg-4'>
                 <label for='posicion'>Libero &nbsp</label>
                 <input type='radio' id='libero' value='Libero' name='posiciones'>
             </div>
         </div>
         <div class='form-row justify-content-center'>
                                    <div class='form-group col-lg-6'>
                                        <label for='altura'>Altura:</label>
                                        <input type='number' class='form-control' id='altura' min='0'>
                                    </div> 
                                    <div class='form-group col-lg-6'>
                                        <label for='peso'>Peso:</label>
                                        <input type='number' class='form-control' id='peso' min='0'>
                                    </div>
                                </div>
            </form>
         </div>
         
 
             </div>
             <div class="col-lg-12 p-3 text-center">
                     <input type="button" value="Enviar" id="btnEnviar"
                         class="btn text-white col-lg-2 col-md-2 col-sm-2 col-2"></input>
                 </div>
         </div>
         </form>`;
 
     
         $("#añadirForm").html(formulario);
 
 
         $("#btnEnviar").click(function(){
             datosFormulario(tipo);
         });

    }

    function crearEntrenador(tipo){
        
        /*limpiar div*/
        $("#añadirForm").html("");
        $(".datosDeUsuario").hide();
        $(".esconderDiv").hide();

        formulario=`<form id="formularioSocio">
        <div class="form-group col-lg-12 ">
            <div class="row">
                <div class="col-lg-6 p-3">
                    <label for="nombre">Nombre<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="nombre">
                </div>
                <div class="col-lg-6 p-3">
                    <label for="apellidos">Apellidos<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="apellidos">
                </div>
                <div class="col-lg-4 p-3">
                    <label for="email">Correo electronico<span class="text-danger">*</span></label>
                    <input type="email" class="form-control" id="email">
                </div>
                <div class="col-lg-4 p-3">
                    <label for="direccion">Direccion<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="direccion">
                </div>
                <div class="col-lg-4 p-3">
                    <label for="fechaNacimiento">Fecha de nacimiento<span
                            class="text-danger">*</span></label>
                    <input type="date" class="form-control" id="fechaNacimiento">
                </div>
                <div class="col-lg-6 p-3 ">
                    <label for="nuevoUsuario">Nombre de usuario<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="nuevoUsuario">
                </div>
                <div class="col-lg-6 p-3">
                    <label for="contraseña">Contraseña<span class="text-danger">*</span></label>
                    <input type="password" class="form-control" id="contraseña">
                </div>
                <div class="col-lg-6 p-3 text-center" id="containerImagen">
                    <label>Imagen de perfil</label><br>
                    <input type="file" name="imagen" id="imagen" accept=".png,.jpeg,.jpg,.gif">
                    <label type="file" for="imagen" class="btn text-white col-lg-5 col-md-4 col-sm-4 col-4"
                        id="btnSubirArchivo">Subir imagen <i class="fas fa-upload text-white"></i></label>
                </div>
                <div class="col-lg-6 p-3 text-center">
                    <img src="../img/imagenDefault.png" id="fotoPerfil">
                </div>
                
            </div>

            <form id='entrenadorForm'>
            <div class="row justify-content-center">
            <div class='col-lg-4'>
         <label for='experiencia'>Experiencia:</label>
            <input type='number' class='form-control' id='experiencia' min='0'>
            </div>
            </div>
        </div>
        </form>

            </div>
            <div class="col-lg-12 p-3 text-center">
                    <input type="button" value="Enviar" id="btnEnviar"
                        class="btn text-white col-lg-2 col-md-2 col-sm-2 col-2"></input>
                </div>
        </div>
        </form>`;

    
        $("#añadirForm").html(formulario);


        $("#btnEnviar").click(function(){
            datosFormulario(tipo);
        });

    }

    function crearDelegado(tipo){
        
        /*limpiar div*/
        $("#añadirForm").html("");
        $(".datosDeUsuario").hide();
        $(".esconderDiv").hide();

        formulario=`<form id="formularioSocio">
        <div class="form-group col-lg-12 ">
            <div class="row">
                <div class="col-lg-6 p-3">
                    <label for="nombre">Nombre<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="nombre">
                </div>
                <div class="col-lg-6 p-3">
                    <label for="apellidos">Apellidos<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="apellidos">
                </div>
                <div class="col-lg-4 p-3">
                    <label for="email">Correo electronico<span class="text-danger">*</span></label>
                    <input type="email" class="form-control" id="email">
                </div>
                <div class="col-lg-4 p-3">
                    <label for="direccion">Direccion<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="direccion">
                </div>
                <div class="col-lg-4 p-3">
                    <label for="fechaNacimiento">Fecha de nacimiento<span
                            class="text-danger">*</span></label>
                    <input type="date" class="form-control" id="fechaNacimiento">
                </div>
                <div class="col-lg-6 p-3 ">
                    <label for="nuevoUsuario">Nombre de usuario<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="nuevoUsuario">
                </div>
                <div class="col-lg-6 p-3">
                    <label for="contraseña">Contraseña<span class="text-danger">*</span></label>
                    <input type="password" class="form-control" id="contraseña">
                </div>
                <div class="col-lg-6 p-3 text-center" id="containerImagen">
                    <label>Imagen de perfil</label><br>
                    <input type="file" name="imagen" id="imagen" accept=".png,.jpeg,.jpg,.gif">
                    <label type="file" for="imagen" class="btn text-white col-lg-5 col-md-4 col-sm-4 col-4"
                        id="btnSubirArchivo">Subir imagen <i class="fas fa-upload text-white"></i></label>
                </div>
                <div class="col-lg-6 p-3 text-center">
                    <img src="../img/imagenDefault.png" id="fotoPerfil">
                </div>
                
            </div>

            <form id='entrenadorForm'>
            <div class="row justify-content-center">
            <div class='col-lg-4'>
         <label for='experiencia'>Experiencia:</label>
            <input type='number' class='form-control' id='experiencia' min='0'>
            </div>
            </div>
        </div>
        </form>

            </div>
            <div class="col-lg-12 p-3 text-center">
                    <input type="button" value="Enviar" id="btnEnviar"
                        class="btn text-white col-lg-2 col-md-2 col-sm-2 col-2"></input>
                </div>
        </div>
        </form>`;

    
        $("#añadirForm").html(formulario);


        $("#btnEnviar").click(function(){
            datosFormulario(tipo);
        });

    }

    //Funcion que envia los datos introducidos en el formulario a la base de datos, y que los verifica
function datosFormulario(tipo) {

  
    $misInput = $("#formularioSocio input").length;
  
    $campoCorreo = $("#email").val();

    /*Contiene la respuesta de si todos los input estan rellenados o no (en este momento esta 
    puesto como si si lo estuviesen)*/
    $correcto = true;

    if(tipo==2 || tipo==3){

         //Bucle for que va recorriendo todos los input del formulario, menos el de imagen y el boton de enviar
        for (let i = 0; i < ($misInput - 2); i++) {

        /*Filtro que va mirando de uno en uno los input y va dandoles un borde rojo o verde 
        en fucion de si han sido rellenados o no*/
        if ($("#formularioSocio input:eq(" + i + ")").val() == "") {

            $("#formularioSocio input:eq(" + i + ")").css("border", "2px solid red");

            //La variable adquiere el valor false al encontar un input no rellenado
            $correcto = false;

        } else {

            $("#formularioSocio input:eq(" + i + ")").css("border", "2px solid #009655");
        }

        }

    }else if(tipo==1){

         //Bucle for que va recorriendo todos los input del formulario, menos el de imagen y el boton de enviar
         for (let i = 0; i < ($misInput - 6); i++) {

            /*Filtro que va mirando de uno en uno los input y va dandoles un borde rojo o verde 
            en fucion de si han sido rellenados o no*/
            if ($("#formularioSocio input:eq(" + i + ")").val() == "") {
    
                $("#formularioSocio input:eq(" + i + ")").css("border", "2px solid red");
    
                //La variable adquiere el valor false al encontar un input no rellenado
                $correcto = false;
    
            } else {
    
                $("#formularioSocio input:eq(" + i + ")").css("border", "2px solid #009655");
            }
    
            }

    }

   

    //Filtro que mira si el campo correo tiene formato de correo electronico
    if (/\w+\@\w+\.\w+/.test($campoCorreo)) {

        //el input del correo adquiere bordes verdes
        $("#email").css("border", "2px solid #009655");

    } else {

        //el input del correo adquiere bordes rojos
        $("#email").css("border", "2px solid red");
        /*La variable adquiere el valor false al verificar que el formato de correo introducio es invalido*/
        $correcto = false;

    }

    //Filtro que determina si los datos pueden ser enviados a la base de datos en funcion de la variable correcto
    if ($correcto == false) {
        alert("Faltan campos por rellenar o el correo no es valido");
        return false;

    } else {
        //Se introducen los datos establecidos en el formulario, ademas de algunos por defecto, en variables
        nombreInsert = $("#nombre").val();
        apellidosInsert = $("#apellidos").val();
        usuarioInsert = $("#nuevoUsuario").val();
        passwordInsert = $("#contraseña").val();
        imagenInsert = filename;
        idEquipoInsert = "1";
        tipoInsert = tipo;
        emailInsert = $("#email").val();
        direccionInsert = $("#direccion").val();
        fechaDeNacimientoInsert = $("#fechaNacimiento").val();
        adminInsert = "0";

        var url = "../../controller/cUsers.php";

        //Llamada fetch
        fetch(url, {
            method: 'GET',
        })

            .then(res => res.json()).then(result => {

                var list = result.list;

                permitirInsert = true;
                //recorre toda la lista de usuarios
                for (let i = 0; i < list.length; i++) {
                    //mira si el nombre de usuario y correo eletronico introducidos coincide con alguno de la base de datos
                    if (usuarioInsert == list[i].usuario || emailInsert == list[i].email) {

                        permitirInsert = false;

                        for (let i = 0; i < list.length; i++) {

                            if (usuarioInsert == list[i].usuario) {

                                $("#nuevoUsuario").css("border", "2px solid red");
                                

                            }

                            if (emailInsert == list[i].email) {

                                $("#email").css("border", "2px solid red");

                            }
                        }

                        break;

                    }

                }
                //Ejecuta la insercion del nuevo socio, si permitirInsert es igual a true. En caso contrario saca un alert
                if (permitirInsert == true) {

                    var url = "../../controller/cUsuarioExecuteInsert.php";
                    var data = {
                        'nombreInsert': nombreInsert,
                        'apellidosInsert': apellidosInsert,
                        'usuarioInsert': usuarioInsert,
                        'passwordInsert': passwordInsert,
                        'idEquipoInsert': idEquipoInsert,
                        'tipoInsert': tipoInsert,
                        'emailInsert': emailInsert,
                        'direccionInsert': direccionInsert,
                        'fechaDeNacimientoInsert': fechaDeNacimientoInsert,
                        'adminInsert': adminInsert,
                        'filename': filename,
                        'savedFileBase64': savedFileBase64,
                        'imagenInsert': imagenInsert
                    };

                    //Llamada fetch
                    fetch(url, {
                        method: 'POST', // or 'POST'
                        body: JSON.stringify(data), // data can be `string` or {object}!
                        headers: { 'Content-Type': 'application/json' }  // input data
                    })

                        .then(res => res.json()).then(result => {

                            
                            //console.log(result.error);//Avisa de si la insercion a salido bien o mal
                            alert(result.error); //Avisa de si la insercion a salido bien o mal
                            //window.location.href="../../index.html";  //lleva al usuario a la pagina principal	
                            conseguirIdUsuario(tipo);

                        })
                        .catch(error => console.error('Error status:', error));

                } else {

                    alert("Ya existe un usuario con ese nombre de usuario o correo electronico");
                }


            })
            .catch(error => console.error('Error status:', error));
    }

}

function conseguirIdUsuario(tipo){

    var url="../../controller/cLastId.php";

    fetch(url, {
        method: 'GET',
        headers:{'Content-Type': 'application/json'} 
        })
  .then(res => res.json()).then(result => {
      
    var idLastUsuario=result.list[0].id;
    if(tipo==1){
        insertarJugador(idLastUsuario);
    }else if(tipo==2){
        insertarEntrenador(idLastUsuario);
    }else{
        insertarDelegado(idLastUsuario);
    }
    

  })
  .catch(error => console.error('Error status:', error));

}

function insertarEntrenador(idLastUsuario){
    var experienciaForm=$("#experiencia").val()

    var url = "../../controller/cInsertEntrenador.php";
                    var data = {
                        'id': idLastUsuario,
                        'experiencia': experienciaForm
                    };

                    //Llamada fetch
                    fetch(url, {
                        method: 'POST', // or 'POST'
                        body: JSON.stringify(data), // data can be `string` or {object}!
                        headers: { 'Content-Type': 'application/json' }  // input data
                    })

                        .then(res => res.json()).then(result => {

                            window.location.reload();	

                        })
                        .catch(error => console.error('Error status:', error));

}

function insertarDelegado(idLastUsuario){
    var experienciaForm=$("#experiencia").val()

    var url = "../../controller/cInsertDelegado.php";
                    var data = {
                        'id': idLastUsuario,
                        'experiencia': experienciaForm
                    };

                    //Llamada fetch
                    fetch(url, {
                        method: 'POST', // or 'POST'
                        body: JSON.stringify(data), // data can be `string` or {object}!
                        headers: { 'Content-Type': 'application/json' }  // input data
                    })

                        .then(res => res.json()).then(result => {
	
                            window.location.reload();

                        })
                        .catch(error => console.error('Error status:', error));

}

function insertarJugador(idLastUsuario){
    var alturaForm=$("#altura").val();
    var pesoForm=$("#peso").val();
    var posicionForm=$('input[name="posiciones"]:checked').val();

    var url = "../../controller/cInsertJugador.php";
                    var data = {
                        'id': idLastUsuario,
                        'altura': alturaForm,
                        'peso': pesoForm,
                        'posicion': posicionForm
                    };

                    //Llamada fetch
                    fetch(url, {
                        method: 'POST', // or 'POST'
                        body: JSON.stringify(data), // data can be `string` or {object}!
                        headers: { 'Content-Type': 'application/json' }  // input data
                    })

                        .then(res => res.json()).then(result => {

                        	window.location.reload();

                        })
                        .catch(error => console.error('Error status:', error));

}

//Cambia la foto de perfil que esta por defecto en el formulario por la introducida por el usuario
function changeImg() {

    var file = $("#imagen")[0].files[0];

    filename = file.name.toLowerCase();
    filesize = file.size;
    console.log(filename);

    var reader = new FileReader();

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

    /*Cargar informacion del usuario*/
    function showUser(idUsuario){

        var url = "../../controller/cUserById.php";
        var data={"id": idUsuario};

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'} 
            })
      .then(res => res.json()).then(result => {
          
        var usuario=result.usuario;

        /*Limpiar el div*/
        $("#formularioInformacion").html("");
        $("#añadirForm").html("");

        newrow = "<div class='row justify-content-center align-items-center datosDeUsuario m-5 text-white'>"+
                    "<div class='row-lg-3 order-1'>"+
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
                    "<div class='row order-4'>"+
                        "<div class='m-5'>"+
                            "<img class='imagenUsuario' src='../img/"+ usuario[0].imagen + "'>"+
                        "</div>"+
                    "</div>"+
                    "<div class='row-lg-3 order-2'>"+
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
                    "</div>";

        if(usuario[0].tipo==1){//Si es jugador, a la tercera columna añadimos los datos del jugador

            newrow+="<div class='row-lg-3 order-3'>"+
                        "<div class='col-lg-12'>"+
                            "<p class='font-weight-bold'>Posición:</p>"+
                            "<p>"+ usuario[0].objJugador.posicion + "</p>"+
                        "</div>"+
                        "<div class='col-lg-12 '>"+
                            "<p class='font-weight-bold'>Altura:</p>"+
                            "<p>"+ usuario[0].objJugador.altura+ "m</p>"+
                        "</div>"+
                        "<div class='col-lg-12'>"+
                            "<p class='font-weight-bold'>Peso:</p>"+
                            "<p>"+ usuario[0].objJugador.peso + "kg</p>"+
                        "</div>"+
                    "</div>";
    
        }else if(usuario[0].tipo==2){//Si es entrenador, a la tercera columna añadimos los datos del entrenador

            newrow+="<div class='row-lg-3 order-3'>"+
                        "<div class='col-lg-12'>"+
                            "<p class='font-weight-bold'>Experiencia:</p>"+
                            "<p>"+ usuario[0].objEntrenador.experiencia + " años</p>"+
                        "</div>"+
                    "</div>";

        }else if(usuario[0].tipo==3){//Si es delegado, a la tercera columna añadimos los datos del delegado

            newrow+="<div class='row-lg-3 order-3'>"+
                        "<div class='col-lg-12'>"+
                            "<p class='font-weight-bold'>Experiencia:</p>"+
                            "<p>"+ usuario[0].objDelegado.experiencia + " años</p>"+
                        "</div>"+
                    "</div>";
        }

        //cerrar row
        newrow+="</div>"; 

        newrow+"<div class='row justify-content-center'>";
        newrow+="<div class='col-lg-12 esconderDiv'><button type='button' class='btn text-white m-2' id='btnUpdateUsuarioDesdeAdmin'>Actualizar datos</button>";
        newrow+="<button type='button' class='btn text-white m-2' id='btnDeleteUsuario'>Borrar usuario</button></div>";
        newrow+="</div>";

        $("#formularioInformacion").html(newrow);

        /*Conseguir la id del usuario y sacar un formulario con los datos para actualizar al hacer click*/
        $("#btnUpdateUsuarioDesdeAdmin").click(function(){ 
            updateUser2(usuario[0].id);
        });

        /*Conseguir la id del usuario y eliminar sacar un modal para eliminar el usuario*/
        $("#btnDeleteUsuario").click(function(){ 
            nombreApellido=usuario[0].nombre + " " + usuario[0].apellidos;
            execDelete(usuario[0].id, nombreApellido, usuario[0].imagen);
        });
  
      })
      .catch(error => console.error('Error status:', error));

    }

    //Coseguir informacion del usuario con la id para rellenar formulario
    function updateUser2(idUsuario){

        var url = "../../controller/cUserById.php";
        var data={'id': idUsuario};

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'} 
            })
      .then(res => res.json()).then(result => {
          
        var usuario=result.usuario;

        for(let i=0; i<usuario.length; i++){

            /*limpiar div*/
            $("#añadirForm").html("");

            formulario="<form>" + //datos comunes de los usuarios

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
                        "<div class='form-group col-lg-6'>";
                            

                    if(usuario[i].tipo==1){//Si el usuario es jugador

                        if(usuario[i].objJugador.posicion=="Delantero"){ //Si el jugador es delantero, marcar el radio con opcion delantero

                            formulario+="<div class='row justify-content-center'>" +
                                            "<div class='col-lg-4'>" +
                                                "<label for='posicion'>Delantero</label>" +
                                                "<input type='radio' id='delantero' value='Delantero' name='posiciones' checked>" +
                                            "</div>" +
                
                                            "<div class='col-lg-4'>" +
                                                "<label for='posicion'>Zaguero</label>" +
                                                "<input type='radio' id='zaguero' value='Zaguero' name='posiciones'>" +
                                            "</div>" +    
                
                                            "<div class='col-lg-4'>" +
                                                "<label for='posicion'>Libero &nbsp</label>" +
                                                "<input type='radio' id='libero' value='Libero' name='posiciones'>" +
                                            "</div>" +
                                        "</div>";
                        }else if(usuario[i].objJugador.posicion=="Zaguero"){ //Si el jugador es zaguero, marcar el radio con opcion zaguero

                            formulario+="<div class='row justify-content-center'>" +
                                            "<div class='col-lg-4'>" +
                                                "<label for='posicion'>Delantero</label>" +
                                                "<input type='radio' id='delantero' value='Delantero' name='posiciones'>" +
                                            "</div>" +
        
                                            "<div class='col-lg-4'>" +
                                                "<label for='posicion'>Zaguero</label>" +
                                                "<input type='radio' id='zaguero' value='Zaguero' name='posiciones' checked>" +
                                            "</div>" +    
                
                                            "<div class='col-lg-4'>" +
                                                "<label for='posicion'>Libero &nbsp</label>" +
                                                "<input type='radio' id='libero' value='Libero' name='posiciones'>" +
                                            "</div>" +
                                        "</div>";

                        }else{//Si el jugador es libero, marcar el radio con opcion libero

                            formulario+="<div class='row justify-content-center'>" +
                                            "<div class='col-lg-4'>" +
                                                "<label for='posicion'>Delantero</label>" +
                                                "<input type='radio' id='delantero' value='Delantero' name='posiciones'>" +
                                            "</div>" +

                                            "<div class='col-lg-4'>" +
                                                "<label for='posicion'>Zaguero</label>" +
                                                "<input type='radio' id='zaguero' value='Zaguero' name='posiciones'>" +
                                            "</div>" +    

                                            "<div class='col-lg-4'>" +
                                                "<label for='posicion'>Libero &nbsp</label>" +
                                                "<input type='radio' id='libero' value='Libero' name='posiciones' checked>" +
                                            "</div>" +
                                        "</div>";
                        }        
    
                        formulario+="</div>" +
                                "</div>" +

                                "<div class='form-row justify-content-center'>" +
                                    "<div class='form-group col-lg-6'>" +
                                        "<label for='altura'>Altura:</label>" +
                                        "<input type='number' class='form-control' id='altura' value='" + usuario[i].objJugador.altura + "' min='" + usuario[i].objJugador.altura + "'>" +
                                    "</div>" + 
                                    "<div class='form-group col-lg-6'>" + 
                                        "<label for='peso'>Peso:</label>" +
                                        "<input type='number' class='form-control' id='peso' value='" + usuario[i].objJugador.peso + "'>" +
                                    "</div>" + 
                                "</div>";
                                

                    }else if(usuario[i].tipo==2){//Si el usuario es entrenador

                formulario+="<label for='experiencia'>Experiencia:</label>" +
                           "<input type='number' class='form-control' id='experiencia' value='" + usuario[i].objEntrenador.experiencia + "' min='" + usuario[i].objEntrenador.experiencia + "'>" +
                    "</div>";

                

            }else if(usuario[i].tipo==3){//Si el usuario es delegado

                formulario+="<label for='experiencia'>Experiencia:</label>" +
                            "<input type='number' class='form-control' id='experiencia' value='" + usuario[i].objDelegado.experiencia + "' min='" + usuario[i].objDelegado.experiencia + "'>" +
                    "</div>";
            }

            //Boton actulizar y cerrar formulario
            formulario+="</div>" +
                        "<button type='button' id='btnExecuteUpdateUser' class='btn text-white'>Actualizar</button>" +
                    "</form>";

        }

        /*Si el usuario es socio*/
        if(usuario[0].tipo==4){
            formulario="<h4>No tienes acceso para editar datos de socios";
        }

        $("#añadirForm").append(formulario);

        //Al hacer click ejecutamos el update
        $("#btnExecuteUpdateUser").click(function(){
            executeUpdate2(usuario);
        });

  
      })
      .catch(error => console.error('Error status:', error));

    }

    //Ejecutar update de cualquier usuario si el admin esta conectado
    function executeUpdate2(usuario){

        if(usuario[0].tipo==1){//jugador

            posicion=$('input[name="posiciones"]:checked').val();
            altura=$("#altura").val();
            peso=$("#peso").val();

            var url = "../../controller/cUpdateJugador.php";
            var data = {'id':usuario[0].id, 'posicion':posicion, 'altura':altura, 'peso':peso};
            
            fetch(url, {
                method: 'POST', 
                body: JSON.stringify(data), 
                headers:{'Content-Type': 'application/json'}
                })
                
            .then(res => res.json()).then(result => {

                //Limpiar los div*/
                $("#acciones").html("");
                $("#formularioInformacion").html("");

                /*Alert + recargar pagina*/
            alert("Información actualizada correctamente");
            window.location.reload();
            
            
            })
        .catch(error => console.error('Error status:', error));

        }else if(usuario[0].tipo==2){//entrenador

            experiencia=$("#experiencia").val();

            var url = "../../controller/cUpdateEntrenador.php";
            var data = {'id':usuario[0].id, 'experiencia':experiencia};
            
            fetch(url, {
                method: 'POST', 
                body: JSON.stringify(data),
                headers:{'Content-Type': 'application/json'} 
                })
                
            .then(res => res.json()).then(result => {

                //Limpiar los div*/
                $("#acciones").html("");
                $("#formularioInformacion").html("");

                /*Alert + recargar pagina*/
            alert("Información actualizada correctamente");
            window.location.reload();
            
            })
        .catch(error => console.error('Error status:', error));

        }else{//delegado

            experiencia=$("#experiencia").val();

            var url = "../../controller/cUpdateDelegado.php";
            var data = {'id':usuario[0].id, 'experiencia':experiencia};
            
            fetch(url, {
                method: 'POST', 
                body: JSON.stringify(data),
                headers:{'Content-Type': 'application/json'} 
                })
                
            .then(res => res.json()).then(result => {

                //Limpiar los div*/
                $("#acciones").html("");
                $("#formularioInformacion").html("");

                /*Alert + recargar pagina*/
            alert("Información actualizada correctamente");
            window.location.reload();
            
            })
        .catch(error => console.error('Error status:', error));

        }


    }

    //Ejecutar delete
    function execDelete(idUsuario, nombreApellido, imagenDelete){

        

        $("#modalDelete").css("display", "block");

        texto="¿Estás seguro de borrar a <b>" + nombreApellido + "</b>?";
        $("#modalText").html(texto);
        
        
        $("#deletebtn").click(function(){

            var url = "../../controller/cDeleteUser.php";
            var data = {'id':idUsuario,'imagenDelete':imagenDelete};
          
            fetch(url, {
                    method: 'POST', 
                    body: JSON.stringify(data), // data can be `string` or {object}!
                    headers:{'Content-Type': 'application/json'}  // input data
                })
                
            .then(res => res.json()).then(result => {

                $("#acciones").html("");
                $("#formularioInformacion").html("");
    
                /*Alert + recargar pagina*/
                alert("Usuario eliminado correctamente");
                window.location.reload();

            })
            .catch(error => console.error('Error status:', error));

        })

    }