/* ===============================
   JS GENERAL DEL SITIO
   =============================== */

document.addEventListener("DOMContentLoaded", () => {
  // Cargar header
  const headerContainer = document.getElementById("header");
  if (headerContainer) {
    fetch("components/header.html")
      .then((res) => res.text())
      .then((data) => {
        headerContainer.innerHTML = data;
        attachHeaderEvents(); // 👈 importante
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
});

/**
 * Función para conectar eventos una vez que el header se haya cargado
 */
function attachHeaderEvents() {
  const cartBtn = document.getElementById("cartBtn");
  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  }

  const userBtn = document.getElementById("userBtn");
  if (userBtn) {
    userBtn.addEventListener("click", () => {
      alert("Funcionalidad de usuario aún no implementada 👤");
    });
  }

  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      alert("Funcionalidad de búsqueda aún no implementada 🔍");
    });
  }

    fixLogoLink();
}

function fixLogoLink() {
  const logo = document.querySelector(".logo");
  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "index.html";
    });
  }
}
