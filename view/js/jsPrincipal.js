$(document).ready(function () {
  nightModeOnLoad();

  $("#nightMode").click(nightMode);

  menuDesplegable();

  loadModal();

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

/*carga el modal en el div .modal-content*/
function loadModal(){
let modal = `<div class="login-form">
              <form>
                <div class="form">
                  <h2 class="text-center">Iniciar Sesión</h2>
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>       
                  <div class="form-group">
                    <i class="fas fa-user" id="userIcon"></i>
                    <input id="usuario" type="text" class="form-control" placeholder="Usuario" onkeyup="enterSinClick(event)">
                  </div>
                  <div class="form-group">
                    <i class="fas fa-lock" id="userPadlock"></i>
                    <input id="password" type="password" autocomplete="off" class="form-control" placeholder="Contraseña" onkeyup="enterSinClick(event)">
                  </div>
                  <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block botonLoginStart" id="loginSubmit">Iniciar Sesión</button>
                  </div> 
                </div> 
              </form>    
            </div>`
  $('.modal-content').html(modal)
}
