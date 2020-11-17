document.addEventListener("DOMContentLoaded", function () {
    cargarNoticias();
});

function cargarNoticias() {
    var url = "../json/noticias.json";

    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }  // input data
    })
        .then(res => res.json()).then(result => {
            var noticias = result;
            console.log(noticias);

            var noticia = "";
            console.log(noticias);

            for (i = noticias.length; i > 0; i--) {
                console.log(i);
                noticia = "<div class='container py-3'>" +
                "<div class='card'>" +
                "<div class='row '>" +
                "<div class='col-md-7 px-3'>" +
                "<div class='card-block px-6'>" +
                "<h4 class='card-title'>" + noticias[i-1].titulo + "</h4>" +
                "<p class='card-text'>" + noticias[i-1].texto + "</p>" +
                "<br>" +
                "<a href='#' class='mt-auto btn btn-primary' id='masInfoNoticias'>Read More</a>" +
                "</div>" +
                "</div >" +
                "<img class='m-4' src='" + noticias[i-1].imagen + "'>" +
                "</div >" +
                "</div >"



                $("#noticias").append(noticia);
            }



        })
        .catch(error => console.error('Error status:', error));
};