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
	var url = "grupo4.zerbitzaria.net/controller/cUsersByTeamId.php";
	

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
				
				console.log(result);
				
				
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

				/*JUGADORES*/
				
				zaguero="Zaguero";
				delantero="Delantero";
				libero="Libero";
				
				cardPosiciones="";
				cardJugadores="";
				
				for(var i=0; i<jugadores.length; i++){

					if(jugadores[i].posicion=="Delantero"){
						
						cardPosiciones="<div class='row justify-content-center mt-4'>" +
											"<div class='col-lg-12'>" +
												"<h4>Delanteros</h4>" +
												"<hr>" +
								               "</div>" +
										"</div>";	
						$("#delanterosTitulo").html(cardPosiciones);

						cardJugadores="<div class='col-lg-3'>" +
				                			  	"<div class='card'>" +
						        					"<img class='card-img-top' src='../img/" + jugadores[i].imagen + "' alt=''>" +
						        					"<div class='card-body'>" +
						        						"<h5 class='card-title text-center'>" + jugadores[i].nombre + " " + jugadores[i].apellidos + "</h5>" +
						        					"</div>" +
						        				"</div>" ;
						        				
						$("#delanteros").append(cardJugadores);
						
						
						
						
					}else if(jugadores[i].posicion=="Zaguero"){
						
						cardPosiciones="<div class='row justify-content-center mt-4'>" +
											"<div class='col-lg-12'>" +
											"<hr>" +
												"<h4>Zagueros</h4>" +
												"<hr>" +
							                "</div>" +
										"</div>";
						$("#zaguerosTitulo").html(cardPosiciones);
						
						cardJugadores="<div class='col-lg-3'>" +
					            			  	"<div class='card'>" +
						        					"<img class='card-img-top' src='../img/" + jugadores[i].imagen + "' alt=''>" +
						        					"<div class='card-body'>" +
						        						"<h5 class='card-title text-center'>" + jugadores[i].nombre + " " + jugadores[i].apellidos + "</h5>" +
						        					"</div>" +
						        				"</div>" +
						        				"</div>";
						
						$("#zagueros").append(cardJugadores);
						
						
					}else if(jugadores[i].posicion=="Libero"){
						
						cardPosiciones="<div class='row justify-content-center mt-4'>" +
											"<div class='col-lg-12'>" +
												"<hr>" +
												"<h4>Liberos</h4>" +
												"<hr>" +
							                "</div>" +
										"</div>";	
						$("#liberosTitulo").html(cardPosiciones);
						
						cardJugadores="<div class='col-lg-3'>" +
					            			  	"<div class='card'>" +
						        					"<img class='card-img-top' src='../img/" + jugadores[i].imagen + "' alt=''>" +
						        					"<div class='card-body'>" +
						        						"<h5 class='card-title text-center'>" + jugadores[i].nombre + " " + jugadores[i].apellidos + "</h5>" +
						        					"</div>" +
						        				"</div>" +
						        				"</div>";
						
						$("#liberos").append(cardJugadores);
						
						
					}
					

				}

				/*CUERPO TECNICO*/

				cuerpoTecnico="<hr><h4>Cuerpo Técnico</h4><hr>";
				$("#cuerpoTecnicoTitulo").html(cuerpoTecnico);


				cardEntrenador="";
				cardDelegado="";


				for(let i=0; i<entrenadores.length; i++){

					cardEntrenador="<div class='col-lg-3'>" +
					            			  	"<div class='card'>" +
						        					"<img class='card-img-top' src='../img/" + entrenadores[i].imagen + "' alt=''>" +
						        					"<div class='card-body'>" +
														"<h5 class='card-title text-center'>" + entrenadores[i].nombre + " " + entrenadores[i].apellidos + "</h5>" +
														"<p class='text-center'>Entrenador</p>" +
						        					"</div>" +
						        				"</div>" +
									"</div>";
									
					$("#cuerpoTecnico").append(cardEntrenador);

					cardDelegado="<div class='col-lg-3'>" +
					            			  	"<div class='card'>" +
						        					"<img class='card-img-top' src='../img/" + delegados[i].imagen + "' alt=''>" +
						        					"<div class='card-body'>" +
														"<h5 class='card-title text-center'>" + delegados[i].nombre + " " + delegados[i].apellidos + "</h5>" +
														"<p class='text-center'>Delegado</p>" +
						        					"</div>" +
						        				"</div>" +
									"</div>";
					
					$("#cuerpoTecnico").append(cardDelegado);				

				}
				

		})
		.catch(error => console.error('Error status:', error));	
	
}