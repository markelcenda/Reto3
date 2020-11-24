$(document).ready(function () {
    nightModeOnLoad();

    $("#nightMode").click(nightMode);
});

/*Al pulsar enter evitamos hacer click en Inicar Sesion*/
function enterSinClick(e){
    if (e.keyCode === 13) {
        e.preventDefault();
        $(".botonLoginStart").click();
       }
}

function nightMode() {
  if (localStorage.getItem('nightMode') != "true") {
    localStorage.setItem('nightMode', true);
    $('#nightMode i').removeClass();
    $('#nightMode i').addClass("fas");
    $('#nightMode i').addClass("fa-sun");
    $('body').removeClass('bg-light');
    $('body').addClass('bg-dark');
  } else {
    localStorage.setItem('nightMode', false);
    $('#nightMode i').removeClass();
    $('#nightMode i').addClass("fas");
    $('#nightMode i').addClass("fa-moon");
    $('body').removeClass('bg-dark');
    $('body').addClass('bg-light');
  }
}

function nightModeOnLoad(){
  if (localStorage.getItem('nightMode') != "true") {
    $('#nightMode i').removeClass();
    $('#nightMode i').addClass("fas");
    $('#nightMode i').addClass("fa-moon");
    $('body').removeClass('bg-dark');
    $('body').addClass('bg-light');
  } else {
    $('#nightMode i').removeClass();
    $('#nightMode i').addClass("fas");
    $('#nightMode i').addClass("fa-sun");
    $('body').removeClass('bg-light');
    $('body').addClass('bg-dark');
  }
}