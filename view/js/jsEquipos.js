idEquipo=location.search.substring(1, location.search.length);

$(document).ready(function () {
	
	opcionesEquipo();
	loadEquipos();
	
});

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
			
			
		});
		
		

	})
	.catch(error => console.error('Error status:', error));	
	
}

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

					if(jugadores[i].objJugador.posicion=="Delantero"){
						
						cardPosiciones="<div class='row justify-content-center mt-4'>" +
		                					"<div class='col-lg-12'>" +
								                "<div class='separator'>Delanteros</div>" +
								               "</div>" +
										"</div>";	
						$("#delanterosTitulo").html(cardPosiciones);

					      cardJugadores="<div id='" + jugadores[i].id + "' class='col-lg-4 col-md-6 col-8 container_foto' >" +
					         "<div class='ver_mas'>" +
					            "<span class='fas fa-eye' id='" + jugadores[i].id + "'>" +
					         "</div>" +
					         "<article>" +
					            "<h2>" + jugadores[i].nombre + " " + jugadores[i].apellidos + "</h2>" +				        
					         "</article></span>" +
					         "<img src='../img/" + jugadores[i].imagen + "' alt=''>" +
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
						
						cardJugadores="<div class='col-lg-4 col-md-6 col-8 container_foto'>" +
					         "<div class='ver_mas'>" +
					            "<span class='fas fa-eye' id='" + jugadores[i].id + "'></span>" +
					         "</div>" +
					         "<article>" +
					            "<h2>" + jugadores[i].nombre + " " + jugadores[i].apellidos + "</h2>" +				        
					         "</article>" +
					         "<img src='../img/" + jugadores[i].imagen + "' alt=''>" +
					      "</div>";
						
						$("#zagueros").append(cardJugadores);
						
						
					}else if(jugadores[i].objJugador.posicion=="Libero"){
						
						cardPosiciones="<div class='row justify-content-center mt-4'>" +
					                "<div class='col-lg-12'>" +
					                "<div class='separator'>Liberos</div>" +
					                "</div>" +
									"</div>";	
						$("#liberosTitulo").html(cardPosiciones);
						
						cardJugadores="<div class='col-lg-4 col-md-6 col-8 container_foto'>" +
					         "<div class='ver_mas'>" +
					            "<span class='fas fa-eye' id='" + jugadores[i].id + "'></span>" +
					         "</div>" +
					         "<article>" +
					            "<h2>" + jugadores[i].nombre + " " + jugadores[i].apellidos + "</h2>" +				        
					         "</article>" +
					         "<img src='../img/" + jugadores[i].imagen + "' alt=''>" +
					      "</div>";
						
						$("#liberos").append(cardJugadores);
						
						
					}

				}

				/*CUERPO TECNICO*/

				cuerpoTecnicoTitulo="<div class='row justify-content-center mt-4'>" +
					                "<div class='col-lg-12'>" +
					                "<div class='separator'>Cuerpo Técnico</div>" +
					                "</div>" +
									"</div>";	
				$("#cuerpoTecnicoTitulo").html(cuerpoTecnicoTitulo);

				cardEntrenadores="";
				cardDelegados="";

				for(let i=0; i<entrenadores.length; i++){

					cardEntrenadores="<div class='col-lg-4 col-md-6 col-8 container_foto'>" +
					         "<div class='ver_mas'>" +
					            "<span class='fas fa-eye' id='" + entrenadores[i].id + "'></span>" +
					         "</div>" +
					         "<article>" +
								"<h2>" + entrenadores[i].nombre + " " + entrenadores[i].apellidos + "</h2>" +	
								"<p>Entrenador</p>" +			        
					         "</article>" +
					         "<img src='../img/" + entrenadores[i].imagen + "' alt=''>" +
					      "</div>";
												
					$("#cuerpoTecnico").append(cardEntrenadores);

					cardDelegados="<div class='col-lg-4 col-md-6 col-8 container_foto'>" +
					         "<div class='ver_mas'>" +
					            "<span class='fas fa-eye' id='" + delegados[i].id + "'></span>" +
					         "</div>" +
					         "<article>" +
								"<h2>" + delegados[i].nombre + " " + delegados[i].apellidos + "</h2>" +	
								"<p>Delegado</p>" +				        
					         "</article>" +
					         "<img src='../img/" + delegados[i].imagen + "' alt=''>" +
					      "</div>";
												
					$("#cuerpoTecnico").append(cardDelegados);

				}

				$('h4').after('<hr/>')

				/*Funcion para ver los datos de jugadores y cuerpo tecnico*/
				$("span").click(function(){ 
					id=$(this).attr("id")
					mostrarDatosUsuarios(id);
				  }); 
				

		})
		.catch(error => console.error('Error status:', error));	
	
}

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
			$("#delanteros").html("");
			$("#zagueros").html("");
			$("#liberos").html("");
			$("#cuerpoTecnico").html("");
			$("#delanterosTitulo").html("");
			$("#zaguerosTitulo").html("");
			$("#liberosTitulo").html("");
			$("#cuerpoTecnicoTitulo").html("");
			$(".equipos").hide();
			$("#selectEquipos").hide();
			$("#insertCategoriaEquipo").html("");
			

			/*Si el usuario es jugador*/
			if(jugador!=null){

				for(let i=0; i<jugador.length; i++){

					infoUsuario="<div class='row justify-content-center align-items-center mt-5'>" +
										"<div class='col-lg-4 col-md-6 col-sm-10 col-10 m-2'>" +
											"<img src='../img/" + jugador[i].imagen + "' class='imagenUsuario' alt=''>" +
										"</div>" +
										"<div class='col-lg-4 col-md-6 col-sm-10 m-2'>" +
											"<h2 class='text-center'>" + jugador[i].nombre + " " + jugador[i].apellidos + "</h2>" +
											"<hr>" +
											"<h5>Posicion: " + jugador[i].objJugador.posicion + "</h5>" +
											"<h5>Fecha de nacimiento: " + jugador[i].fechaDeNacimiento + "</h5>" +
											"<h5>Altura: " + jugador[i].objJugador.altura + "m</h5>" +
											"<h5>Peso: " + jugador[i].objJugador.peso + "kg</h5>" +
											"<hr>" +
											"<h5>Dirección: " + jugador[i].direccion + "</h5>" +
											"<h5>Email: " + jugador[i].email + "</h5>" +
										"</div>" +	
								"</div>";	

								idEquipo=jugador[i].objEquipo.id;

								$("#fichaUsuario").append(infoUsuario);
				}

			}

			/*Si el usuario es entrenador*/
			if(entrenador!=null){

				for(let i=0; i<entrenador.length; i++){

					infoUsuario="<div class='row justify-content-center align-items-center mt-5'>" +
										"<div class='col-lg-4 m-2'>" +
											"<img src='../img/" + entrenador[i].imagen + "' class='imagenUsuario' alt=''>" +
										"</div>" +
										"<div class='col-lg-4 m-2'>" +
											"<h2 class='text-center'>" + entrenador[i].nombre + " " + entrenador[i].apellidos + "</h2>" +
											"<hr>" +
											"<h5>Experiencia: " + entrenador[i].objEntrenador.experiencia + " años</h5>" +
											"<h5>Fecha de nacimiento: " + entrenador[i].fechaDeNacimiento + "</h5>" +
											"<hr>" +
											"<h5>Dirección: " + entrenador[i].direccion + "</h5>" +
											"<h5>Email: " + entrenador[i].email + "</h5>" +
										"</div>" +	
								"</div>";	

								idEquipo=entrenador[i].objEquipo.id;

								$("#fichaUsuario").append(infoUsuario);
				}

			}

			/*Si el usuario es entrenador*/
			if(delegado!=null){

				for(let i=0; i<delegado.length; i++){

					infoUsuario="<div class='row justify-content-center align-items-center mt-5'>" +
										"<div class='col-lg-4 m-2'>" +
											"<img src='../img/" + delegado[i].imagen + "' class='imagenUsuario' alt=''>" +
										"</div>" +
										"<div class='col-lg-4 m-2'>" +
											"<h2 class='text-center'>" + delegado[i].nombre + " " + delegado[i].apellidos + "</h2>" +
											"<hr>" +
											"<h5>Fecha de nacimiento: " + delegado[i].fechaDeNacimiento + "</h5>" +
											"<hr>" +
											"<h5>Dirección: " + delegado[i].direccion + "</h5>" +
											"<h5>Email: " + delegado[i].email + "</h5>" +
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
				$(".equipos").show();
				loadUsersByTeamId(idEquipo);
			});
			


		})
		.catch(error => console.error('Error status:', error));	
}
