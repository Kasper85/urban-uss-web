/* ===============================
LÓGICA ESPECÍFICA DE LA HOMEPAGE
=============================== */

document.addEventListener("DOMContentLoaded", () => {
console.log("Homepage lista 🚀");

// Animación simple del botón principal
const btn = document.querySelector(".btn-primary");
if (btn) {
btn.addEventListener("mouseover", () => {
btn.style.transform = "scale(1.05)";
btn.style.transition = "transform 0.3s ease";
});
btn.addEventListener("mouseleave", () => {
btn.style.transform = "scale(1)";
});
}
});
