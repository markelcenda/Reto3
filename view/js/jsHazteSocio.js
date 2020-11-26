$(document).ready(function () {

    $("#btnDespliegue").click(despliegueFormulario);
    $("#btnEnviar").click(datosFormulario);
    $("#imagen").change(changeImg);
    $(".botonLoginStart").click(login);
    $(".botonLogout").click(logout);

    sessionVarsView();
    aos_init();

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () { scrollFunction() };

});

function aos_init() {
    AOS.init({
        duration: 1000,
        once: true
    });
}

//Al clicar en el boton "HAZTE SOCIO AHORA" muestra el formulario y oculta el boton
function despliegueFormulario() {

    $("#formulario").show("slow");

    $("#btnDespliegue").hide();

}
//Acceso a la pagina de equipos desde la pagina de hazte socio
function equiposDesdeSocios(id) {
    pagina = "equipos.html?" + id;
    window.location.href = pagina;
}

/*Por defecto la varible filename contendra el nombre de la imagen por defecto y savedFileBase64 no tendra nada
    a menos que se active la funcion "changeImg"*/
filename = "imagenDefault.png";
savedFileBase64 = "";

//Funcion que envia los datos introducidos en el formulario a la base de datos, y que los verifica
function datosFormulario() {

  
    $misInput = $("#formularioSocio input").length;
  
    $campoCorreo = $("#email").val();

    /*Contiene la respuesta de si todos los input estan rellenados o no (en este momento esta 
    puesto como si si lo estuviesen)*/
    $correcto = true;

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
        tipoInsert = "4";
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
                            window.location.href="../../index.html";  //lleva al usuario a la pagina principal	

                        })
                        .catch(error => console.error('Error status:', error));

                } else {

                    alert("Ya existe un usuario con ese nombre de usuario o correo electronico");
                }


            })
            .catch(error => console.error('Error status:', error));
    }

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
//Determina si el usuario puede logearse o no
function login() {

    //Variables que adquieren el valor de los datos introducidos en el modal
    usuario = $("#usuario").val();
    password = $("#password").val();

    //Filtro que mira si los campos usuario y contraseña estan vacio
    if (usuario != "" && password != "") {

        //en caso de no estar vacio se mandaran los datos al controlador cLogin
        var url = "../../controller/cLogin.php";
        var data = { 'usuario': usuario, 'password': password };

        console.log(data);

        //Llamada fetch
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: { 'Content-Type': 'application/json' }  // input data
        })

            .then(res => res.json()).then(result => {

                alert(result.error);

                //Filtro que mira si se ha iniciado sesion sin errores
                if (result.confirm == true) {

                    //Al detectar que no hay ningun error, esconde el boton de iniciar sesion y muestra el de cerrarla mas la imagen de usuario
                    $(".botonLogin").hide();
                    $(".botonLogout").show();
                    $(".sesionUsuario").css('display', 'flex');
                    $("#usuario").val("");
                    $("#password").val("");
                    $("#modelId").modal("hide");

                    //Muestra la imagen que le corresponde al usuario que ha iniciado sesion
                    img = "<a href='usuario.html' ><img id='imgSesion' src='../../view/img/" + result.usuarioSesion.imagen + "'></a>";

                    $("#sitioUsuario").html(img);

                }

            })
            .catch(error => console.error('Error status:', error));

    } else {

        //en caso de estar vacios, aparecera un alert advirtiendo al usuario
        alert("Los campos usuario y contraseña no pueden estar vacios");

    }
}

//Fucnion de logout
function logout() {

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
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json()).then(result => {

            //console.log(result.confirm);
            alert(result.confirm);

        })
        .catch(error => console.error('Error status:', error));

}
//Mantiene la sesion abierta hasta que se ejecute el logout
function sessionVarsView() {

    var url = "../../controller/cSessionVarsView.php";

    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }  // input data
    })
        .then(res => res.json()).then(result => {

            var usuario = result.usuario;

            if (usuario != null) {

                for (let i = 0; i < usuario.length; i++) {
                    //Muestra la imagen que le corresponde al usuario que ha iniciado sesion
                    img = "<a href='../pages/usuario.html'><img id='imgSesion' src='../img/" + usuario[i].imagen + "'></a>";
                    $(".botonLogin").hide();
                    $(".botonLogout").show();
                    $(".sesionUsuario").css('display', 'flex');
                    $("#sitioUsuario").html(img);
                }


            }

        })
        .catch(error => console.error('Error status:', error));
}

var mybutton = document.getElementById("myBtn");
//Esconde o muestra el boton
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// Cuando el usuario pulsa  el boton, se le lleva a la parte de arriba  de la pagina
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}