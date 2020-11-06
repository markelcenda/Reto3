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
		
	})
	.catch(error => console.error('Error status:', error));	
	
}