/* ===============================
   LÓGICA ESPECÍFICA DE LA HOMEPAGE (jQuery)
   =============================== */

$(document).ready(function () {
    console.log("Homepage lista 🚀");

    // Animación simple del botón principal
    $(".btn-primary").hover(
        function () {
            $(this).css({
                "transform": "scale(1.05)",
                "transition": "transform 0.3s ease"
            });
        },
        function () {
            $(this).css("transform", "scale(1)");
        }
    );
});
