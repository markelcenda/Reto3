/*Al pulsar enter evitamos hacer click en Inicar Sesion*/
function enterSinClick(e){
    if (e.keyCode === 13) {
        e.preventDefault();
        $(".botonLoginStart").click();
       }
}

/*Modo noche*/
function modoNoche(){
    $("body").removeClass("bg-light");
    $("body").addClass("bg-dark");
  }