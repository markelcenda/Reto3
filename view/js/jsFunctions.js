document.addEventListener("DOMContentLoaded", function (event) {
	
  sessionVarsView();
  
});

$(window).on('load', function () {
    aos_init();
  });
  
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
          method: 'GET', // or 'POST'
          headers:{'Content-Type': 'application/json'}
        })
      .then(res => res.json()).then(result => {
        
    	  var url = "controller/cSessionVarsView.php";
    		
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
    		             img="<img id='imgSesion' src='view/img/" + usuario[i].imagen + "'>";
    		             $(".botonLogin").hide();
    		             $(".botonLogout").show();
    		             $(".sesionUsuario").css('display','flex');
    		             $("#sitioUsuario").html(img);
    				}

             
          }

    		})
    		.catch(error => console.error('Error status:', error));	
        
      })
      .catch(error => console.error('Error status:', error));
      
    }