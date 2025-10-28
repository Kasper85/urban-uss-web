/* ===============================
   JS GENERAL DEL SITIO
   =============================== */

let stickyHeader = null;
let contentToPush = null; 
let stickyOffset = 0;
let headerHeight = 0;


document.addEventListener("DOMContentLoaded", () => {
  // Cargar header
  const headerContainer = document.getElementById("header");
  if (headerContainer) {
    fetch("components/header.html")
      .then((res) => res.text())
      .then((data) => {
        headerContainer.innerHTML = data;
        attachHeaderEvents(); // Espera a que el header se cargue
      })
      .catch((err) => console.error("Error cargando header:", err));
  }

  // Cargar footer
  const footerContainer = document.getElementById("footer");
  if (footerContainer) {
    fetch("components/footer.html")
      .then((res) => res.text())
      .then((data) => (footerContainer.innerHTML = data))
      .catch((err) => console.error("Error cargando footer:", err));
  }


  window.onscroll = () => {
    handleStickyHeader();
  };

});


function handleStickyHeader() {

  if (!stickyHeader || !contentToPush) {
    return;
  }

  if (window.pageYOffset > stickyOffset) {
    stickyHeader.classList.add("sticky");
    contentToPush.style.paddingTop = `${headerHeight}px`;
  } else {
    stickyHeader.classList.remove("sticky");
    contentToPush.style.paddingTop = "0";
  }
}

//Función para conectar eventos una vez que el header se haya cargado
function attachHeaderEvents() {
  const cartBtn = document.getElementById("cartBtn");
  if (cartBtn) {
    cartBtn.addEventListener("click", () => (window.location.href = "cart.html"));
  }
  // Conectar menú hamburguesa
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });
  }

  stickyHeader = document.querySelector(".main-header");
  contentToPush = document.querySelector("main"); 

  if (stickyHeader && contentToPush) {
    stickyOffset = stickyHeader.offsetTop;
    headerHeight = stickyHeader.offsetHeight;

    handleStickyHeader();
  } else {
    if (!stickyHeader) console.error("No se encontró el elemento .main-header");
    if (!contentToPush) console.error("No se encontró el elemento de contenido principal ('main')");
  }
}

