$(document).ready(function () {

    $(".botonLoginStart").click(login);
    $(".botonLogout").click(logout);
    sessionVarsView();

});

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

                console.log(result.error);

                //Filtro que mira si se ha podido inicar sesion
                if(result.confirm == true){

                    //Al detectar que si, econde el boton de iniciar sesion y muestra el de cerrarla y la imagen de usuario
                    $(".botonLogin").hide();
                    $(".botonLogout").show();
                    $(".sesionUsuario").css('display','flex');
                    $("#usuario").val("");
                    $("#password").val("");
                    $("#modelId").modal("hide");

                    //Muestra la imagen que le corresponde al usuario que ha iniciado sesion
                   img="<a href='#' class='ml-3' ><img id='imgSesion' src='../../view/uploads/" + result.usuarioSesion.imagen + "'></a>";

                   $("#sitioUsuario").html(img);

                }
                
    		})
            .catch(error => console.error('Error status:', error));	

        }else{

            //en caso de estar vacios, aparecera un alert advirtiendo al usuario
            alert("Los campos usuario y contraseña no pueden estar vacios");

        }
}

//Fucnion de logout
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
	
        console.log(result.confirm);
        alert(result.confirm);
	
	})
	.catch(error => console.error('Error status:', error));	

}

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
    		             img="<img id='imgSesion' src='../img/" + usuario[i].imagen + "'>";
    		             $(".botonLogin").hide();
    		             $(".botonLogout").show();
    		             $(".sesionUsuario").css('display','flex');
                         $("#sitioUsuario").html(img);
                         zonaAdministrador(usuario);
    				}
                }

               

    		})
    		.catch(error => console.error('Error status:', error));	
    }

    function zonaAdministrador(usuario){

        for(let i=0; i<usuario.length; i++){

            if(usuario[i].admin==0){
                usuarioInfo=/*"<div class='col-lg-6 border text-center'>" +
                                "<img class='imagenUsuario' src='../uploads/"+ usuario[i].imagen + "'>"+
                            "</div>" +
                            "<div class='col-lg-6 border'>" +
                                "<p>" + usuario[i].nombre + "</p>" +
                                "<p>" + usuario[i].apellidos + "</p>" +
                            "</div>" +
                             "<div class='col-lg-6'>" +*/
                             "<div class='col-lg-12 text-center'>"+
                                /*"<img class='imagenUsuario' src='../uploads/"+ usuario[i].imagen + "'>"+*/
                                "<h1 class='font-weight-bold m-2'>"+ usuario[i].usuario +"</h1>"+
                                "<p class='font-weight-bold m-2'>Selecciona una de la siguientes opciones:</p>"+
                                "<button type='button' class='btn text-white m-2 col-lg-2' id='btnVerDatosUsuario'>Ver mis datos</button>" +
                                "<button type='button' class='btn text-white m-2 col-lg-2' id='btnUpdateUsuario'>Actualizar Información</button>" +
                            "</div>";
                            //"</div>"
                            

            }else if(usuario[i].admin==1){
                usuarioInfo="<div class='col-lg-6'>" +
                                "<p>" + usuario[i].admin + "</p>" +
                             "</div>" +
                             "<div class='col-lg-6'>" +
                                "<button type='button' class='btn btn-primary' id='btnUpdateUsuario'>Actualizar Administrador</button>" +
                                "<button type='button' class='btn btn-primary'>Borra Administrador</button>" +
                            "</div>";
            }

        }


        $("#zonaUsuario").append(usuarioInfo);

        $("#btnVerDatosUsuario").click(function(){
            datosUsuario(usuario);
        });

        $("#btnUpdateUsuario").click(function(){
            updateUsuario(usuario);
        });
    }

   function datosUsuario(usuario){

        $newrow = "<p class='m-5'>" + usuario[0].nombre + "</p>"+
                    "<img class='imagenUsuario' src='../uploads/"+ usuario[0].imagen + "'>";

        $('#zonaUsuario').append($newrow);

    }

    function updateUsuario(usuario){

        alert(usuario[0].nombre);

    }
