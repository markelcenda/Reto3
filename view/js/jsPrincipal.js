$(document).ready(function () {
  nightModeOnLoad();

  $("#nightMode").click(nightMode);

  menuDesplegable();

  $('#loginSubmit').click(function(event){
    event.preventDefault();
  })

});

//Activa o desactiva el modo noche
function nightMode() {
  if (localStorage.getItem('nightMode') != "true") {
    localStorage.setItem('nightMode', true);
    setNightMode();
  } else {
    localStorage.setItem('nightMode', false);
    unsetNightMode();
  }
}

//Mira si la opcion de modo noche era false o true 
function nightModeOnLoad() {
  if (localStorage.getItem('nightMode') != "true") {
    unsetNightMode();
  } else {
    setNightMode();
  }
}

//Pone la pagina en modo noche
function setNightMode() {
  $('#nightMode i').removeClass();
  $('#nightMode i').addClass("fas fa-sun");
  $('body').removeClass('bg-light');
  $('body').addClass('bg-dark');
  $('#noticias').removeClass('text-dark');
  $("#noticias").addClass('text-white');
  $('#insertCategoriaEquipo, #delanterosTitulo, #zaguerosTitulo, #liberosTitulo, #cuerpoTecnicoTitulo').removeClass('text-dark');
  $('#insertCategoriaEquipo, #delanterosTitulo, #zaguerosTitulo, #liberosTitulo, #cuerpoTecnicoTitulo').addClass('text-white');
  $('.textoModoNoche').removeClass('text-dark');
  $('.textoModoNoche').addClass('text-white');
}

//Devuelve la pagina a su estilo original
function unsetNightMode() {
  $('#nightMode i').removeClass();
  $('#nightMode i').addClass("fas fa-moon");
  $('body').removeClass('bg-dark');
  $('body').addClass('bg-light');
  $('#noticias').removeClass('text-white');
  $("#noticias").addClass('text-dark');
  $('#insertCategoriaEquipo, #delanterosTitulo, #zaguerosTitulo, #liberosTitulo, #cuerpoTecnicoTitulo').removeClass('text-white');
  $('#insertCategoriaEquipo, #delanterosTitulo, #zaguerosTitulo, #liberosTitulo, #cuerpoTecnicoTitulo').addClass('text-dark');
  $('.textoModoNoche').removeClass('text-white');
  $('.textoModoNoche').addClass('text-dark');
}

/*Al pulsar enter evitamos hacer click en Inicar Sesion*/
function enterSinClick(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    $(".botonLoginStart").click();
  }
}

/*Menu desplegable de equipos del navbar*/
function menuDesplegable(){

  $('.dropdown-submenu a.test').on("click", function(e){
    $(this).next('ul').toggle();
    e.stopPropagation();
    e.preventDefault();
});
}

/*Funcion para mostrar contraseña*/
function mostrarContraseña() {
  /*Conseguir el input password*/
  var password = document.getElementById("password");

  /*Si el tipo es password, lo ponemos a text para mostrar la contraseña*/
  if (password.type === "password") {

      password.type = "text";

      /*Limpiar div y cambiar el icono*/
      $("#cambiarIcono").html("");
      icono="<i class='fas fa-eye-slash' onclick='mostrarContraseña()'></i>";
      $("#cambiarIcono").html(icono);
      
  }else{/*Si el tipo es text, lo ponemos a password para mostrar la contraseña*/

      password.type = "password";

      /*Limpiar div y cambiar el icono*/
      $("#cambiarIcono").html("");
      icono="<i class='fas fa-eye' onclick='mostrarContraseña()'></i>";
      $("#cambiarIcono").html(icono);
  }
}
