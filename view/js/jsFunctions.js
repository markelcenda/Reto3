$(window).on('load', function () {
    aos_init();
  });
  
  function aos_init() {
      console.log("on");
    AOS.init({
      duration: 800,
      once: true
    });
  }  

  function equiposDesdeIndex(id){
    pagina="view/pages/equipos.html?" + id;
    window.location.href=pagina;	
  }