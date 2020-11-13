document.addEventListener("DOMContentLoaded", function () {
  sessionVarsView();
  cargarImagenesEquipos();

});

$(window).on('load', function () {
  aos_init();
});

function aos_init() {
  AOS.init({
    duration: 800,
    once: true
  });
<<<<<<< HEAD
  
  function aos_init() {
    AOS.init({
      duration: 800,
      once: true
    });
  }  

  function equiposDesdeIndex(id){
    pagina="view/pages/equipos.html?" + id;
    window.location.href=pagina;	
  }

  function sessionVarsView(){
	
    var url="controller/cSessionVarsView.php";

    		fetch(url, {
    			  method: 'GET', 
    			  headers:{'Content-Type': 'application/json'}  // input data
    			  })
    		.then(res => res.json()).then(result => {
    			
    			var usuario=result.usuario;
    			
    			if (usuario !=null){
    				
    				for(let i=0; i<usuario.length; i++){
    					//Muestra la imagen que le corresponde al usuario que ha iniciado sesion
    		             img="<a href='view/pages/usuario.html'><img id='imgSesion' src='view/img/" + usuario[i].imagen + "'></a>";
    		             $(".botonLogin").hide();
    		             $(".botonLogout").show();
    		             $(".sesionUsuario").css('display','flex');
    		             $("#sitioUsuario").html(img);
    				}

             
          }

    		})
    		.catch(error => console.error('Error status:', error));	
    }
=======
}

function equiposDesdeIndex(id) {
  pagina = "view/pages/equipos.html?" + id;
  window.location.href = pagina;
}

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
          img = "<img id='imgSesion' src='view/img/" + usuario[i].imagen + "'>";
          $(".botonLogin").hide();
          $(".botonLogout").show();
          $(".sesionUsuario").css('display', 'flex');
          $("#sitioUsuario").html(img);
        }


      }

    })
    .catch(error => console.error('Error status:', error));
}

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
        id = parseInt(event.target.id.slice(-1))+1;
        console.log(id);
        equiposDesdeIndex(id);
      });

    })
    .catch(error => console.error('Error status:', error));
}
>>>>>>> 4b775347cc57038bf5b30ffeffa14332b8331402
