document.addEventListener("DOMContentLoaded", function () {
  sessionVarsView();
  cargarImagenesEquipos();
  cargarUltimasNoticias();
  aos_init();

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () { scrollFunction() };

});

function aos_init() {
  AOS.init({
    duration: 800,
    once: true
  });
}

//Ir a la pagina del equipo seleccionado
function equiposDesdeIndex(id) {
  pagina = "view/pages/equipos.html?" + id;
  window.location.href = pagina;
}

//Comprobar si el usuario esta conectado
function sessionVarsView() {

  var url = "controller/cSessionVarsView.php";

  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }  // input data
  })
    .then(res => res.json()).then(result => {

      var usuario = result.usuario;

      if (usuario != null) {

        for (let i = 0; i < usuario.length; i++) {
          //Muestra la imagen que le corresponde al usuario que ha iniciado sesion
          img = "<a href='view/pages/usuario.html'><img id='imgSesion' src='view/img/" + usuario[i].imagen + "'></a>";
          $(".botonLogin").hide();
          $(".botonLogout").show();
          $(".sesionUsuario").css('display', 'flex');
          $("#sitioUsuario").html(img);
        }


      }

    })
    .catch(error => console.error('Error status:', error));
}

//Cards equipos
function cargarImagenesEquipos() {
  var url = "controller/cEquipos.php";

  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }  // input data
  })
    .then(res => res.json()).then(result => {

      var equipos = result.list;
      console.log(equipos);

      var img = "<div class='row m-2'>";

      for (i = 0; i < equipos.length; i++) {
        img += "<div class='col-lg-4 col-md-6 col-12 mt-2'>" +
          "<div class='card'>" +
          "<div class='card-inner'>" +
          "<div class='card-front' id='card" + i + "'>" +
          "<img id='imagen" + i + "' src='view/img/eq" + (i + 1) + ".jpg' class='img-fluid'>" +
          "<h3 id='titulo" + i + "'>" + equipos[i].categoria + "</h3>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>";
      }
      img += "</div>";
      document.getElementById("imagenes").innerHTML += img;

      $(".card-front").mouseover(function () {
        imagenId = "imagen" + this.id.slice(-1);
        document.getElementById(imagenId).style.opacity = "0.6";

        titleId = "titulo" + this.id.slice(-1);
        document.getElementById(titleId).style.display = "block";
      });

      $(".card-front").mouseout(function () {
        imagenId = "imagen" + this.id.slice(-1);
        document.getElementById(imagenId).style.opacity = "1";

        titleId = "titulo" + this.id.slice(-1);
        document.getElementById(titleId).style.display = "none";
      });

      $(".card").click(function (event) {
        id = parseInt(event.target.id.slice(-1)) + 1;
        console.log(id);
        equiposDesdeIndex(id);
      });

    })
    .catch(error => console.error('Error status:', error));
}

//Cargar cards noticias
function cargarUltimasNoticias() {
  var url = "view/json/noticias.json";

  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }  // input data
  })
    .then(res => res.json()).then(result => {
      var noticias = result;
      console.log(noticias);

      var noticia = "";


      for (i = noticias.length - 1; i > noticias.length - 4; i--) {

        noticia = "<div class='col-md-4 mb-4'>" +
          "<div class='card mb-4 box-shadow' id='" + noticias[i].id + "'>" +
          "<img class='card-img-top' src='" + noticias[i].imagen + "'>" +
          "<div class='card-body'>" +
          "<b><p class='card-text'>" + noticias[i].titulo + "</p></b><br>" +
          "<p class='card-text'>" + noticias[i].textoCorto + "</p>" +
          "<div class='d-flex justify-content-between align-items-center'>" +
          "<small class='text-light'>" + noticias[i].fecha + "</small>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>"

        $("#noticias").append(noticia);
      }

      $("#noticias .card").click(function () {
        id = this.id;
        window.location.href = "view/pages/noticias.html?" + id;
      })
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
