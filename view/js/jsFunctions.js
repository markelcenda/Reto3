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