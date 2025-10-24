/* ===============================
   VALIDACIÓN DE FORMULARIO DE CONTACTO
   =============================== */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Por favor ingresa un correo electrónico válido.");
      return;
    }

    alert(`Gracias, ${name}! Tu mensaje fue enviado correctamente.`);
    form.reset();
  });

  function validateEmail(email) {
    const regex = /^[\\w.-]+@[\\w.-]+\\.\\w{2,}$/;
    return regex.test(email);
  }
});
