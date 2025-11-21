/* ===============================
   JS GENERAL DEL SITIO (jQuery)
   =============================== */

$(document).ready(function() {
    // Cargar Header
    $("#header").load("components/header.html", function() {
        // Callback después de cargar el header (si es necesario inicializar algo extra)
        console.log("Header cargado");
        
        // Resaltar enlace activo
        var path = window.location.pathname;
        var page = path.split("/").pop();
        if(page === "") page = "index.html";
        
        $('.nav-link').each(function() {
            var href = $(this).attr('href');
            if (href === page) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    });

    // Cargar Footer
    $("#footer").load("components/footer.html", function() {
        console.log("Footer cargado");
    });

    // Cualquier otra lógica global aquí
});

