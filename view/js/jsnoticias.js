var noticias;

document.addEventListener("DOMContentLoaded", function () {
    cargarNoticias();
    sessionVarsView();
    $(".botonLoginStart").click(login);
    $(".botonLogout").click(logout);


    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () { scrollFunction() };

});

//Cargar cards de las noticias sin estar logeado
function cargarNoticias() {
    var url = "../json/noticias.json";

    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }  // input data
    })
        .then(res => res.json()).then(result => {
            noticias = result;

            $(".ocultarDiv").hide();

            noticia = "";

            $("#tituloComentarios").hide();

            for (i = noticias.length; i > 0; i--) {
                noticia = "<div class='container py-3'>" +
                    "<div class='card' id='c" + (i - 1) + "'>" +
                    "<div class='row'>" +
                    "<div class='col-md-7 px-3'>" +
                    "<div class='card-block px-6'>" +
                    "<h4 class='card-title'>" + noticias[i - 1].titulo + "</h4><br>" +
                    "<p class='card-text'>" + noticias[i - 1].textoCorto + "</p>" +
                    "<br>" +
                    "</div>" +
                    "</div >" +
                    "<img class='m-4' src='" + noticias[i - 1].imagen + "'>" +
                    "</div >" +
                    "</div >"

                $("#noticias").append(noticia);

                id = "#c" + (i - 1)

                $(id).click(function () {
                    noticiaCompleta(this.id.slice(1));
                })
            }

            idNoticia = location.search.substring(1, location.search.length);
            if (idNoticia != "") {
                noticiaCompleta(idNoticia);
            }


        })
        .catch(error => console.error('Error status:', error));
};

//Cargar la pagina del equipo seleccionado
function equiposDesdeNoticias(id) {
    pagina = "equipos.html?" + id;
    window.location.href = pagina;
}

//Iniciar sesion
function login() {

    //Variables que adquieren el valor de los datos introducidos en el modal
    usuario = $("#usuario").val();
    password = $("#password").val();

    //Filtro que mira si los campos usuario y contraseña estan vacio
    if (usuario != "" && password != "") {

        //en caso de no estar vacio se mandaran los datos al controlador cLogin
        var url = "../../controller/cLogin.php";
        var data = { 'usuario': usuario, 'password': password };

        //console.log(data);

        //Llamada fetch
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: { 'Content-Type': 'application/json' }  // input data
        })

            .then(res => res.json()).then(result => {

                alert(result.error);

                console.log(result.error);

                //Filtro que mira si se ha podido inicar sesion
                if (result.confirm == true) {

                    //Al detectar que si, econde el boton de iniciar sesion y muestra el de cerrarla y la imagen de usuario
                    $(".botonLogin").hide();
                    $(".botonLogout").show();
                    $(".sesionUsuario").css('display', 'flex');
                    $("#usuario").val("");
                    $("#password").val("");
                    $("#modelId").modal("hide");

                    //Muestra la imagen que le corresponde al usuario que ha iniciado sesion
                    img = "<a href='../pages/usuario.html'><img id='imgSesion' src='../../view/img/" + result.usuarioSesion.imagen + "'></a>";

                    $("#sitioUsuario").html(img);

                    window.location.reload();

                    usuarioAdmin = result.usuarioSesion.admin;

                }

            })
            .catch(error => console.error('Error status:', error));

    } else {

        //en caso de estar vacios, aparecera un alert advirtiendo al usuario
        alert("Los campos usuario y contraseña no pueden estar vacios");

    }
}

//Cerrar sesion
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
            window.location.href = "../../index.html";

        })
        .catch(error => console.error('Error status:', error));

}


//Comprobar si el usuario está conectado
function sessionVarsView() {

    var url = "../../controller/cSessionVarsView.php";

    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }  // input data
    })
        .then(res => res.json()).then(result => {

            var usuario = result.usuario;
            //console.log(usuario);

            if (usuario != null) {

                for (let i = 0; i < usuario.length; i++) {
                    //Muestra la imagen que le corresponde al usuario que ha iniciado sesion
                    img = "<a href='../pages/usuario.html'><img id='imgSesion' src='../img/" + usuario[i].imagen + "'></a>";
                    $(".botonLogin").hide();
                    $(".botonLogout").show();
                    $(".sesionUsuario").css('display', 'flex');
                    $("#sitioUsuario").html(img);

                    usuarioAdmin = usuario[i].admin;

                    /*Cargar noticias si estas conectado*/
                    cargarNoticiasConComentarios(usuario);
                    /*Cargar comentarios realizados*/
                    cargarComentarios();

                }


            }

        })
        .catch(error => console.error('Error status:', error));
}

/*Noticia completa*/
function noticiaCompleta(id) {
    $("#tituloNoticias").html("");
    $("#tituloComentarios").html("");
    $("#comentarios").html("");
    $("#comentariosRealizados").html("");
    $(".ocultarDiv").hide();
    $("#comentarios").hide();
    $("#comentariosRealizados").hide();
    $(".flecha").hide();

    noticia = "<h1>" + noticias[id].titulo + "</h1>" +
        "<p class='mb-4'>" + noticias[id].fecha + "</p>" +
        "<img src='" + noticias[id].imagen + "' class='rounded mt-5 mx-auto d-block'>" +
        "<p class='mt-5'>" + noticias[id].textoLargo + "</p>" +
        "<button type='button' class='btn btn-success mx-auto d-block mt-3'>Volver</button>";

    $("#noticias").html(noticia);

    $('#noticias button').click(() => {
        window.location.href = "noticias.html";
    })
}

//Cargar cards de las noticias con el input para añadir comentarios
function cargarNoticiasConComentarios(usuario) {
    var url = "../json/noticias.json";

    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }  // input data
    })
        .then(res => res.json()).then(result => {

            noticias = result;

            noticia = "";

            //Limpiar div
            $("#noticias").html("");
            //Mostrar titulo
            $("#tituloComentarios").show();
            $(".ocultarDiv").show();

            for (i = noticias.length; i > 0; i--) {
                noticia = "<div class='container py-3'>" +
                    "<div class='card' id='c" + (i - 1) + "'>" +
                    "<div class='row'>" +
                    "<div class='col-md-7 px-3'>" +
                    "<div class='card-block px-6'>" +
                    "<h4 class='card-title'>" + noticias[i - 1].titulo + "</h4>" +
                    "<p class='card-text'>" + noticias[i - 1].textoCorto + "</p>" +
                    "<br>" +
                    "</div>" +
                    "</div >" +
                    "<img class='m-4' src='" + noticias[i - 1].imagen + "'>" +
                    "</div >" +
                    "</div >";



                $("#noticias").append(noticia);


                id = "#c" + (i - 1)

                $(id).click(function () {
                    noticiaCompleta(this.id.slice(1));
                })
            }

            if (usuario[0].admin == 0 || usuario[0].admin == 1) {

                idNoticia = location.search.substring(1, location.search.length);
                if (idNoticia != "") {
                    noticiaCompleta(idNoticia);

                }

                /*Input para añadir comentario*/
                comentarios = "<textarea maxLength='100' rows='3' class='form-control' id='comentario' placeholder='Insertar comentario...'></textarea>" +
                    "<button type='button' id='insertarComentario' class='btn btn-success mx-auto d-block mt-3'>Insertar Comentario</button>";

                $("#comentarios").append(comentarios);

                /*Click en el boton insertar*/
                $("#insertarComentario").click(function () {
                    insertarComentario(usuario[0].id);
                });

            }
        })
        .catch(error => console.error('Error status:', error));
};

/*Funcion para insertar comentario*/
function insertarComentario(idUsuario) {
    texto = $("#comentario").val();
    if (texto.includes(">")) {
        alert("Error al insertar el comentario");
    } else {
        var url = "../../controller/cInsertarComentario.php";
        var data = { 'texto': texto, "idUsuario": idUsuario };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json()).then(result => {
                alert("Comentario insertado correctamente");
                window.location.reload();
            })

            .catch(error => console.error('Error status:', error));
    }
}

//Cargar todos los comentario
function cargarComentarios() {

    var url = "../../controller/cAllComentarios.php";

    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })

        .then(res => res.json()).then(result => {

            var comentarios = result.list;

            comentariosInfo = "";

            

            for (let i = 0; i < comentarios.length; i++) {

                if(usuarioAdmin == 1){
                    btnComentDelete = "<i class='fas fa-trash p-2 btn text-white btnComentDelete' id='" + comentarios[i].id + "'></i>";
                }else{
                    btnComentDelete = "";
                }

                comentariosInfo = "<div class='wrap '>" +
                    "<img  src='../img/" + comentarios[i].objUsuario.imagen + "'>" +
                    "<div class='comment ' data-owner='" + comentarios[i].objUsuario.usuario + "'>" +
                    "<p>" + comentarios[i].texto + "</p>" +
                    "<div class='row justify-content-center'>" +
                    btnComentDelete +
                    "</div>" +
                    "</div>" +
                    "</div>";

                $("#comentariosRealizados").append(comentariosInfo);

            }

            $(".btnComentDelete").click(function () {

                id = $(this).attr("id");

                deleteComentario(id);

            });

        })
        .catch(error => console.error('Error status:', error));

}

function deleteComentario(id) {

    var url = "../../controller/cDeleteComentario.php";
    var data = { 'id': id};

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json()).then(result => {
            alert("Comentario eliminado correctamente");
            window.location.reload();
        })

        .catch(error => console.error('Error status:', error));

}

var mybutton = document.getElementById("myBtn");

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}