/* ===============================
   LÓGICA DEL CARRITO DE COMPRAS (jQuery)
   =============================== */

// Simulación de carrito usando localStorage
const CART_KEY = "urbanUSS_cart";

$(document).ready(function () {
  const $container = $("#cartContainer");
  const $totalElement = $("#cartTotal");
  const $checkoutBtn = $("#checkoutBtn");

  // Cargar carrito desde localStorage
  let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  renderCart();

  // Renderizar productos del carrito
  function renderCart() {
    $container.empty();

    if (cart.length === 0) {
      $container.html(`<div class="alert alert-info text-center">Tu carrito está vacío 🛍️</div>`);
      $totalElement.text("S/ 0.00");
      return;
    }

    cart.forEach((item, index) => {
      const $card = $("<div>").addClass("card border-0 shadow-sm p-3");

      $card.html(`
                <div class="d-flex align-items-center gap-3">
                    <img src="assets/img/productos/${item.image}" alt="${item.name}" class="rounded object-fit-cover" style="width: 80px; height: 80px;">
                    
                    <div class="flex-grow-1">
                        <h5 class="mb-1 fw-bold">${item.name}</h5>
                        <p class="mb-0 text-muted small">Talla: ${item.size}</p>
                    </div>

                    <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-sm btn-outline-secondary decrease" type="button">-</button>
                        <span class="fw-bold" style="width: 20px; text-align: center;">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary increase" type="button">+</button>
                    </div>

                    <div class="fw-bold text-success" style="min-width: 80px; text-align: right;">
                        S/ ${(item.price * item.quantity).toFixed(2)}
                    </div>

                    <button class="btn btn-sm btn-outline-danger cart-item-remove" type="button">
                        <img src="assets/icons/trash.svg" alt="Eliminar" style="width: 16px; filter: invert(1);">
                    </button>
                </div>
            `);

      // Si no tienes icono de trash, usa texto "X" o similar, pero asumimos que existe o usamos texto
      // Ajuste rápido para el icono si no existe:
      // <span class="text-danger fw-bold">&times;</span>

      $container.append($card);

      // Eventos
      $card.find(".increase").on("click", function () {
        item.quantity++;
        updateCart();
      });

      $card.find(".decrease").on("click", function () {
        if (item.quantity > 1) {
          item.quantity--;
          updateCart();
        }
      });

      $card.find(".cart-item-remove").on("click", function () {
        cart.splice(index, 1);
        updateCart();
      });
    });

    // Calcular total
    const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
    $totalElement.text(`S/ ${total.toFixed(2)}`);
  }

  function updateCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart();
  }

  $checkoutBtn.on("click", function () {
    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    alert("Compra finalizada. ¡Gracias por tu pedido! 🧾");
    localStorage.removeItem(CART_KEY);
    cart = [];
    renderCart();
  });
});
