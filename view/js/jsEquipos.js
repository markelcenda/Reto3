$(document).ready(function () {
	
	loadEquipos();
	
});

function loadEquipos(){
	
	var url = "../../controller/cEquipos.php";
	
	fetch(url, {
		  method: 'GET', 
		  headers:{'Content-Type': 'application/json'}  // input data
		  })
	.then(res => res.json()).then(result => {
		console.log(result.list);
		
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
				
				/*console.log(jugadores);
				console.log(entrenadores);
				console.log(delegados);
				console.log(equipos);*/
				
				
				/*Limpiar los cards para que no se repitan al hacer change*/
				$("#delanteros").html("");
				$("#zagueros").html("");
				$("#liberos").html("");
				$("#cuerpoTecnico").html("");
				
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
								                "<h4>Delanteros</h4>" +
								               "</div>" +
										"</div>";	
						$("#delanterosTitulo").html(cardPosiciones);

					      cardJugadores="<div class='col-lg-4 col-md-6 col-8 container_foto'>" +
					         "<div class='ver_mas text-center'>" +
					            "<span class='fas fa-eye' id='" + jugadores[i].id + "'></span>" +
					         "</div>" +
					         "<article class='text-center'>" +
					            "<h2>" + jugadores[i].nombre + " " + jugadores[i].apellidos + "</h2>" +				        
					         "</article>" +
					         "<img src='../img/" + jugadores[i].imagen + "' alt=''>" +
						  "</div>";
 				
						$("#delanteros").append(cardJugadores);
						
						
						
						
					}else if(jugadores[i].objJugador.posicion=="Zaguero"){
						
						cardPosiciones="<div class='row justify-content-center mt-4'>" +
							                "<div class='col-lg-12'>" +
							                	"<h4>Zagueros</h4>" +
							                "</div>" +
										"</div>";
						$("#zaguerosTitulo").html(cardPosiciones);
						
						cardJugadores="<div class='col-lg-4 col-md-6 col-8 container_foto'>" +
					         "<div class='ver_mas text-center'>" +
					            "<span class='fa fa-eye'></span>" +
					         "</div>" +
					         "<article class='text-center'>" +
					            "<h2>" + jugadores[i].nombre + " " + jugadores[i].apellidos + "</h2>" +				        
					         "</article>" +
					         "<img src='../img/" + jugadores[i].imagen + "' alt=''>" +
					      "</div>";
						
						$("#zagueros").append(cardJugadores);
						
						
					}else if(jugadores[i].objJugador.posicion=="Libero"){
						
						cardPosiciones="<div class='row justify-content-center mt-4'>" +
					                "<div class='col-lg-12'>" +
					                "<h4>Liberos</h4>" +
					                "</div>" +
									"</div>";	
						$("#liberosTitulo").html(cardPosiciones);
						
						cardJugadores="<div class='col-lg-4 col-md-6 col-8 container_foto'>" +
					         "<div class='ver_mas text-center'>" +
					            "<div class='fa fa-eye'></div>" +
					         "</div>" +
					         "<article class='text-center'>" +
					            "<h2>" + jugadores[i].nombre + " " + jugadores[i].apellidos + "</h2>" +				        
					         "</article>" +
					         "<img src='../img/" + jugadores[i].imagen + "' alt=''>" +
					      "</div>";
						
						$("#liberos").append(cardJugadores);
						
						
					}

				}

				$("#1").click(function(){

					console.log("prueba");
					
				 });

				

				

				/*CUERPO TECNICO*/

			
				cuerpoTecnicoTitulo="<div class='row justify-content-center mt-4'>" +
					                "<div class='col-lg-12'>" +
					                "<h4>Cuerpo Técnico</h4>" +
					                "</div>" +
									"</div>";	
				$("#cuerpoTecnicoTitulo").html(cuerpoTecnicoTitulo);

				cardEntrenadores="";
				cardDelegados="";

				for(let i=0; i<entrenadores.length; i++){

					cardEntrenadores="<div class='col-lg-4 col-md-6 col-8 container_foto'>" +
					         "<div class='ver_mas text-center'>" +
					            "<span class='fa fa-eye'></span>" +
					         "</div>" +
					         "<article class='text-center'>" +
								"<h2>" + entrenadores[i].nombre + " " + entrenadores[i].apellidos + "</h2>" +	
								"<p>Entrenador</p>" +			        
					         "</article>" +
					         "<img src='../img/" + entrenadores[i].imagen + "' alt=''>" +
					      "</div>";
												
					$("#cuerpoTecnico").append(cardEntrenadores);

					cardDelegados="<div class='col-lg-4 col-md-6 col-8 container_foto'>" +
					         "<div class='ver_mas text-center'>" +
					            "<span class='fa fa-eye'></span>" +
					         "</div>" +
					         "<article class='text-center'>" +
								"<h2>" + delegados[i].nombre + " " + delegados[i].apellidos + "</h2>" +	
								"<p>Delegado</p>" +				        
					         "</article>" +
					         "<img src='../img/" + delegados[i].imagen + "' alt=''>" +
					      "</div>";
												
					$("#cuerpoTecnico").append(cardDelegados);

				}

				$('h4').after('<hr/>')
				

		})
		.catch(error => console.error('Error status:', error));	
	
}
