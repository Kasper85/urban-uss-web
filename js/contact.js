/* ===============================
   VALIDACIÓN DE FORMULARIO DE CONTACTO (jQuery)
   =============================== */

$(document).ready(function () {
  const $form = $("#contactForm");

  $form.on("submit", function (e) {
    e.preventDefault();

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const message = $("#message").val().trim();

    if (!name || !email || !message) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Por favor ingresa un correo electrónico válido.");
      return;
    }

    alert(`Gracias, ${name}! Tu mensaje fue enviado correctamente.`);
    this.reset(); // 'this' refers to the form DOM element
  });

  function validateEmail(email) {
    const regex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
    return regex.test(email);
  }
});
