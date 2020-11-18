document.addEventListener("DOMContentLoaded", function () {
    cargarNoticias();
    sessionVarsView();
});

var noticias;

//Cargar cards de las noticias
function cargarNoticias() {
    var url = "../json/noticias.json";

    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }  // input data
    })
        .then(res => res.json()).then(result => {
            noticias = result;
            console.log(noticias);

            var noticia = "";
            console.log(noticias);

            for (i = noticias.length; i > 0; i--) {
                noticia = "<div class='container py-3'>" +
<<<<<<< HEAD
                    "<div class='card' id='c" + (i - 1) + "'>" +
                    "<div class='row'>" +
                    "<div class='col-md-7 px-3'>" +
                    "<div class='card-block px-6'>" +
                    "<h4 class='card-title'>" + noticias[i - 1].titulo + "</h4>" +
                    "<p class='card-text'>" + noticias[i - 1].texto + "</p>" +
                    "<br>" +
                    "</div>" +
                    "</div >" +
                    "<img class='m-4' src='" + noticias[i - 1].imagen + "'>" +
                    "</div >" +
                    "</div >"
=======
                "<div class='card'>" +
                "<div class='row '>" +
                "<div class='col-md-7 px-3'>" +
                "<div class='card-block px-6'>" +
                "<h4 class='card-title'>" + noticias[i-1].titulo + "</h4>" +
                "<p class='card-text'>" + noticias[i-1].texto + "</p>" +
                "<br>" +
                "<a href='#' class='mt-auto btn text-white' id='masInfoNoticias'>Read More</a>" +
                "</div>" +
                "</div >" +
                "<img class='m-4' src='" + noticias[i-1].imagen + "'>" +
                "</div >" +
                "</div >"
>>>>>>> c6ab7c2aab39f78d71baebe4d61452b2a47ae15a

                $("#noticias").append(noticia);

                id = "#c" + (i - 1)

                $(id).click(function () {
                    noticiaCompleta(this.id.slice(1));
                })
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

        console.log(data);

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
                    img = "<a href='#' class='ml-3' ><img id='imgSesion' src='../../view/uploads/" + result.usuarioSesion.imagen + "'></a>";

                    $("#sitioUsuario").html(img);

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

            console.log(result.confirm);
            alert(result.confirm);

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
                    img = "<a href='../pages/usuario.html'><img id='imgSesion' src='../uploads/" + usuario[i].imagen + "'></a>";
                    $(".botonLogin").hide();
                    $(".botonLogout").show();
                    $(".sesionUsuario").css('display', 'flex');
                    $("#sitioUsuario").html(img);
                }


            }

        })
        .catch(error => console.error('Error status:', error));
}

function noticiaCompleta(id) {
    console.log(id);

    $("#noticias").html("");
    $(".container h1").html("");

    noticia = "<h2>" + noticias[id].titulo + "</h2>" +
        "<p>" + noticias[id].fecha + "</p>" +
        "<img src='" + noticias[id].imagen + "' class='rounded mx-auto d-block mt-2 shadow'>" +
        "<p class='mt-5'>" + noticias[id].texto + "</p>" +
        "<button type='button' class='btn btn-success d-block mx-auto mt-3'>Volver</button>";
 
    $("#noticias").append(noticia);

    $(".container button").click(function () {
        window.location.href = "noticias.html";
    })
};