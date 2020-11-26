idEquipo=location.search.substring(1, location.search.length);

admin = 0;

$(document).ready(function () {
	
	sessionVarsView();
	opcionesEquipo();
	loadEquipos();
	$(".botonLoginStart").click(login);
	$(".botonLogout").click(logout);
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

//Cargar la pagina del equipo seleccionado
function equiposDesdeEquipos(id){
    pagina="equipos.html?" + id;
    window.location.href=pagina;	
  }

/*Cargar equipo desde index.html*/
function opcionesEquipo(){
	loadUsersByTeamId(idEquipo);
}

/*Cargar equipos en el select*/
function loadEquipos(){
	var url = "../../controller/cEquipos.php";
	
	fetch(url, {
		  method: 'GET', 
		  headers:{'Content-Type': 'application/json'}  // input data
		  })
	.then(res => res.json()).then(result => {
		
		var equipos=result.list;

		$("#equiposSection").hide();		
		
		/*Cargar los equipos en el select*/
		selectEquipo="<option selected>Selecciona un equipo</option>";
		
		for(let i=0; i<equipos.length; i++){
			
			selectEquipo="<option value='" + equipos[i].categoria + "' id='" + equipos[i].id + "'>" + equipos[i].categoria + "</option>";

			$("#selectEquipos").append(selectEquipo);
			
		}
		
		/*Conseguir la id del equipo y añadir una funcion al hacer change*/
		$("#selectEquipos").change(function(){
			
			var idEquipo = $(this).children(":selected").attr("id");
			
			document.getElementById("selectEquipos").addEventListener("click", loadUsersByTeamId(idEquipo));
			$("#filtro").val("");
			
		});
		
		

	})
	.catch(error => console.error('Error status:', error));	
	
}

//Conseguir todos los usuarios de un equipo
function loadUsersByTeamId(idEquipo){
	
	
	var data = {'idEquipo':idEquipo};
	console.log(data);
	var url = "../../controller/cUsersByTeamId.php";
	
	fetch(url, {
		  method: 'POST', // or 'POST'
		  body: JSON.stringify(data), 
		  headers:{'Content-Type': 'application/json'}
		})
		.then(res => res.json()).then(result => {
			
				var jugadores=result.jugadores;
				var entrenadores=result.entrenadores;
				var delegados=result.delegados;
				var equipos=result.equipos;
				
				
				/*Limpiar los cards para que no se repitan al hacer change*/
				$("#delanteros").html("");
				$("#zagueros").html("");
				$("#liberos").html("");
				$("#cuerpoTecnico").html("");
				$("#fichaUsuario").html("");
				$("#tituloPagina").show();

				$("#equiposSection").show();
				

				/*Añadir categoria del equipo al index*/
				categoriaEquipo="";
				for(let i=0; i<equipos.length; i++){
					
					if(equipos[i].id==idEquipo){
						categoriaEquipo="<h3>" + equipos[i].categoria + "</h3>";
						$("#insertCategoriaEquipo").html(categoriaEquipo);
					}
					
				}
				
				zaguero="Zaguero";
				delantero="Delantero";
				libero="Libero";
				
				cardPosiciones="";
				cardJugadores="";

				idJugador="";
				
				for(var i=0; i<jugadores.length; i++){

					//JUGADORES

					if(jugadores[i].objJugador.posicion=="Delantero"){
						
						cardPosiciones="<div class='row justify-content-center mt-4'>" +
		                					"<div class='col-lg-12'>" +
								                "<div class='separator'>Delanteros</div>" +
								               "</div>" +
										"</div>";	
						$("#delanterosTitulo").html(cardPosiciones);

						  cardJugadores="<div class='card' name='cardUsuario' data-aos='zoom-in'>" +
										"<img src='../img/" + jugadores[i].imagen + "' alt=''>" +
										"<div class='info' id='info'>" +
											"<h1>" + jugadores[i].nombre + " " + jugadores[i].apellidos + "</h1>" +	
											"<span class='fas fa-eye fa-2x' id='" + jugadores[i].id + "'>" +
										"</div>" +
										"</div>";										 

	
 				
						$("#delanteros").append(cardJugadores);

						var id=$(this).find("span").attr('id');
						

					}else if(jugadores[i].objJugador.posicion=="Zaguero"){
						
						cardPosiciones="<div class='row justify-content-center mt-4'>" +
							                "<div class='col-lg-12'>" +
							                	"<div class='separator'>Zagueros</div>" +
							                "</div>" +
										"</div>";
						$("#zaguerosTitulo").html(cardPosiciones);
						
						cardJugadores="<div class='card' name='cardUsuario' data-aos='zoom-in'>" +
										"<img src='../img/" + jugadores[i].imagen + "' alt=''>" +
										"<div class='info' id='info'>" +
											"<h1>" + jugadores[i].nombre + " " + jugadores[i].apellidos + "</h1>" +	
											"<span class='fas fa-eye fa-2x' id='" + jugadores[i].id + "'>" +
										"</div>" +
										"</div>";	
						
						$("#zagueros").append(cardJugadores);
						
						
					}else if(jugadores[i].objJugador.posicion=="Libero"){
						
						cardPosiciones="<div class='row justify-content-center mt-4'>" +
					                "<div class='col-lg-12'>" +
					                "<div class='separator'>Liberos</div>" +
					                "</div>" +
									"</div>";	
						$("#liberosTitulo").html(cardPosiciones);
						
						cardJugadores="<div class='card' name='cardUsuario' data-aos='zoom-in'>" +
										"<img src='../img/" + jugadores[i].imagen + "' alt=''>" +
										"<div class='info' id='info'>" +
											"<h1>" + jugadores[i].nombre + " " + jugadores[i].apellidos + "</h1>" +	
											"<span class='fas fa-eye fa-2x' id='" + jugadores[i].id + "'>" +
										"</div>" +
										"</div>";	
						
						$("#liberos").append(cardJugadores);
						
						
					}

				}

				/*CUERPO TECNICO*/

				cardEntrenadores="";
				cardDelegados="";

				for(let i=0; i<entrenadores.length; i++){

					cuerpoTecnicoTitulo="<div class='row justify-content-center mt-4'>" +
					                "<div class='col-lg-12'>" +
					                "<div class='separator'>Cuerpo Técnico</div>" +
					                "</div>" +
									"</div>";	

				$("#cuerpoTecnicoTitulo").html(cuerpoTecnicoTitulo);

					cardEntrenadores="<div class='card' name='cardUsuario' data-aos='zoom-in'>" +
									"<img src='../img/" + entrenadores[i].imagen + "' alt=''>" +
									"<div class='info' id='info'>" +
										"<h1>" + entrenadores[i].nombre + " " + entrenadores[i].apellidos + "</h1>" +
										"<p>Entrenador</p>" +		
										"<span class='fas fa-eye fa-2x' id='" + entrenadores[i].id + "'>" +
									"</div>" +
									"</div>";	
												
					$("#cuerpoTecnico").append(cardEntrenadores);

						cardDelegados="<div class='card' name='cardUsuario' data-aos='zoom-in'>" +
										"<img src='../img/" + delegados[i].imagen + "' alt=''>" +
										"<div class='info' id='info'>" +
											"<h1>" + delegados[i].nombre + " " + delegados[i].apellidos + "</h1>" +	
											"<p>Delegado</p>" +
											"<span class='fas fa-eye fa-2x' id='" + delegados[i].id + "'>" +
										"</div>" +
										"</div>";
												
					$("#cuerpoTecnico").append(cardDelegados);

				}


				/*Funcion para ver los datos de jugadores y cuerpo tecnico*/
				$("span").click(function(){ 
					id=$(this).attr("id")
					mostrarDatosUsuarios(id);
				  }); 
				

		})
		.catch(error => console.error('Error status:', error));	
	
}


//Mostrar datos del jugador, entrenador o delegado seleccionado
function mostrarDatosUsuarios(id){
	

	var data = {'id':id};
	console.log(data);
	var url = "../../controller/cUserById.php";
	
	fetch(url, {
		  method: 'POST', // or 'POST'
		  body: JSON.stringify(data), 
		  headers:{'Content-Type': 'application/json'}
		})
		.then(res => res.json()).then(result => {

			/*Dependiendo la id, puede ser entrenador, delegado o jugador*/
			var jugador=result.jugador;
			var entrenador=result.entrenador;
			var delegado=result.delegado;

			/*Limpiar el div de los cards*/
			infoUsuario="";

			$(".flecha").hide("");
			$(".selectEquipo").hide("");

			$("#delanteros").html("");
			$("#zagueros").html("");
			$("#liberos").html("");
			$("#cuerpoTecnico").html("");

			$("#delanterosTitulo").html("");
			$("#zaguerosTitulo").html("");
			$("#liberosTitulo").html("");
			$("#cuerpoTecnicoTitulo").html("");

			$("#insertCategoriaEquipo").html("");

			$("#fichaUsuario").html("");
			$("#tituloPagina").hide();

			/*Si el usuario es jugador*/
			if(jugador!=null){

				for(let i=0; i<jugador.length; i++){

					//Mira si el usuario que ha iniciado sesion es admin. En caso de serlo rellenara datos personales del mienbro del equipo seleccionado
					if(admin != 0){

						personal = "<hr>"+
						"<h5><i class='fas fa-map-marker-alt personal'></i> " + jugador[i].direccion + "</h5>" +
						"<h5><i class='fas fa-envelope personal'></i> " + jugador[i].email + "</h5>";
	
						}else{
							personal = "";
						}

					infoUsuario="<div class='row justify-content-center align-items-center fichaUsuario' data-aos='fade-right'>" +
										"<div class='col-lg-4 col-md-6 col-sm-6 col-10'>" +
											"<div class='text-center mt-5'>" +
												"<img src='../img/" + jugador[i].imagen + "' class='imagenUsuario' alt=''>" +
											"</div>" +
										"</div>" +
										"<div class='col-lg-4 col-md-6 col-sm-6 m-2'>" +
											"<h2>" + jugador[i].nombre + " " + jugador[i].apellidos + "</h2>" +
											"<hr>" +
											"<h5><i class='fas fa-volleyball-ball'></i> " + jugador[i].objJugador.posicion + "</h5>" +
											"<h5><i class='fas fa-calendar-alt'></i> " + jugador[i].fechaDeNacimiento + "</h5>" +
											"<h5><i class='fas fa-male'></i><i class='fas fa-arrows-alt-v'></i> " + jugador[i].objJugador.altura + "m</h5>" +
											"<h5><i class='fas fa-weight'></i> " + jugador[i].objJugador.peso + "kg</h5>" +
											personal+
										"</div>" +	
								"</div>";	

								idEquipo=jugador[i].objEquipo.id;

								$("#fichaUsuario").append(infoUsuario);
				}

			}

			/*Si el usuario es entrenador*/
			if(entrenador!=null){

				for(let i=0; i<entrenador.length; i++){

					//Mira si el usuario que ha iniciado sesion es admin. En caso de serlo rellenara datos personales del mienbro del equipo seleccionado
					if(admin != 0){

					personal = "<hr>"+
					"<h5><i class='fas fa-map-marker-alt personal'></i> " + entrenador[i].direccion + "</h5>" +
					"<h5><i class='fas fa-envelope personal'></i> " + entrenador[i].email + "</h5>";

					}else{
						personal = "";
					}

					infoUsuario="<div class='row justify-content-center align-items-center fichaUsuario' data-aos='fade-left'>" +
										"<div class='col-lg-4 col-md-6 col-sm-6 col-10'>" +
											"<div class='text-center'>" +
												"<img src='../img/" + entrenador[i].imagen + "' class='imagenUsuario' alt=''>" +
											"</div>" +
										"</div>" +
										"<div class='col-lg-4 col-md-6 col-sm-10 m-2'>" +
											"<h2 class='text-center'>" + entrenador[i].nombre + " " + entrenador[i].apellidos + "</h2>" +
											"<hr>" +
											"<h5><i class='fas fa-volleyball-ball'></i> " + entrenador[i].objEntrenador.experiencia + " años</h5>" +
											"<h5><i class='fas fa-calendar-alt'></i> " + entrenador[i].fechaDeNacimiento + "</h5>" +
											personal+
										"</div>" +	
								"</div>";	
								

								idEquipo=entrenador[i].objEquipo.id;

								$("#fichaUsuario").append(infoUsuario);
				}

			}

			/*Si el usuario es delegado*/
			if(delegado!=null){

				for(let i=0; i<delegado.length; i++){

					//Mira si el usuario que ha iniciado sesion es admin. En caso de serlo rellenara datos personales del mienbro del equipo seleccionado
					if(admin != 0){

						personal = "<hr>"+
						"<h5><i class='fas fa-map-marker-alt personal'></i> " + delegado[i].direccion + "</h5>" +
						"<h5><i class='fas fa-envelope personal'></i> " + delegado[i].email + "</h5>";
	
						}else{
							personal = "";
						}

					infoUsuario="<div class='row justify-content-center align-items-center fichaUsuario' data-aos='fade-left'>" +
									"<div class='col-lg-4 col-md-6 col-sm-6 col-10'>" +
										"<div class='text-center'>" +
											"<img src='../img/" + delegado[i].imagen + "' class='imagenUsuario' alt=''>" +
										"</div>" +
									"</div>" +
								"<div class='col-lg-4 col-md-6 col-sm-10 m-2'>" +
									"<h2 class='text-center'>" + delegado[i].nombre + " " + delegado[i].apellidos + "</h2>" +
									"<hr>" +
									"<h5><i class='fas fa-volleyball-ball'></i> " + delegado[i].objDelegado.experiencia + " años</h5>" +
									"<h5><i class='fas fa-calendar-alt'></i> " + delegado[i].fechaDeNacimiento + "</h5>" +
									personal+
								"</div>" +	
							"</div>";		

								idEquipo=delegado[i].objEquipo.id;

								$("#fichaUsuario").append(infoUsuario);
				}

			}

			infoUsuario="<div class='row  justify-content-center m-3'>" +
								"<button type='button' class='btn botonVolver'>VOLVER</button>"
						"</div>";		

			$("#fichaUsuario").append(infoUsuario);


			$(".botonVolver").click(function(){
				$("#selectEquipos").show();
				$(".flecha").show("");
				$(".selectEquipo").show("");
				$(".equipos").show();
				loadUsersByTeamId(idEquipo);
			});
			


		})
		.catch(error => console.error('Error status:', error));	
}


//Iniciar sesion
function login(){

    //Variables que adquieren el valor de los datos introducidos en el modal
	 usuario=$("#usuario").val();
     password=$("#password").val();

     //Filtro que mira si los campos usuario y contraseña estan vacio
    if(usuario != "" && password != ""){
    
    //en caso de no estar vacio se mandaran los datos al controlador cLogin
    var url = "../../controller/cLogin.php";
    var data = {'usuario':usuario, 'password':password};

    console.log(data);

    		//Llamada fetch
    		fetch(url, {
    			  method: 'POST', 
    			  body: JSON.stringify(data), // data can be `string` or {object}!
    			  headers:{'Content-Type': 'application/json'}  // input data
                  })
                  
    		.then(res => res.json()).then(result => {

                alert(result.error); 

                //console.log(result.error);

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
                   img="<a href='../pages/usuario.html' class='ml-3' ><img id='imgSesion' src='../../view/img/" + result.usuarioSesion.imagen + "'></a>";

				   $("#sitioUsuario").html(img);

				   //Guarda el tipo del usuario que ha iniciado sesion
				   admin = result.usuarioSesion.admin;


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
	
        //console.log(result.confirm);
		alert(result.confirm);
		admin = 0;
	
	})
	.catch(error => console.error('Error status:', error));	

}


//Comprobar si el usuario está cnectado
function sessionVarsView(){
	
    var url="../../controller/cSessionVarsView.php";

    		fetch(url, {
    			  method: 'GET', 
    			  headers:{'Content-Type': 'application/json'}  // input data
    			  })
    		.then(res => res.json()).then(result => {
    			
    			var usuario=result.usuario;
    			//console.log(usuario);
    			
    			if (usuario !=null){
    				
    				for(let i=0; i<usuario.length; i++){
    					//Muestra la imagen que le corresponde al usuario que ha iniciado sesion
						img="<a href='../pages/usuario.html'><img id='imgSesion' src='../img/" + usuario[i].imagen + "'></a>";
    		             $(".botonLogin").hide();
    		             $(".botonLogout").show();
    		             $(".sesionUsuario").css('display','flex');
						 $("#sitioUsuario").html(img);
						 admin = usuario[i].admin;
    				}

             
          }

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

/*Funcion para buscar usuarios*/
function buscarUsuarios(){

	var input, filter, nombre, cards;
	input = document.getElementById('filtro');
	filter = input.value.toUpperCase();

	var elementos=$("#info h1");
	cards=document.getElementsByName("cardUsuario");

	for(let i=0; i<elementos.length; i++){

		nombre= elementos[i].outerText;

		if (nombre.toUpperCase().indexOf(filter) > -1) {
			cards[i].style.display = "";
		  } else {
			cards[i].style.display = "none";
		  }
	}
}