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
            console.log(noticias.length);

            for (i = noticias.length; i > 0; i--) {
                console.log(i);
                noticia = "<div class='col-md-4 mb-4'>" +
                    "<div class='card mb-4 box-shadow'>" +
                    "<img class='card-img-top' src='" + noticias[i-1].imagen + "'>" +
                    "<div class='card-body'>" +
                    "<b><p class='card-text'>" + noticias[i-1].titulo + "</p></b><br>" +
                    "<p class='card-text'>" + noticias[i-1].texto + "</p>" +
                    "<div class='d-flex justify-content-between align-items-center'>" +
                    "<small class='text-muted'>" + noticias[i-1].fecha + "</small>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"

                    $("#noticias").append(noticia);
            }

            

        })
        .catch(error => console.error('Error status:', error));
};