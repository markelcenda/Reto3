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