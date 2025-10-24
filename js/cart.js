/* ===============================
   LÓGICA DEL CARRITO DE COMPRAS
   =============================== */

// Simulación de carrito usando localStorage
const CART_KEY = "urbanUSS_cart";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cartContainer");
  const totalElement = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");

  // Cargar carrito desde localStorage
  let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  renderCart();

  // Renderizar productos del carrito
  function renderCart() {
    container.innerHTML = "";

    if (cart.length === 0) {
      container.innerHTML = `<p>Tu carrito está vacío 🛍️</p>`;
      totalElement.textContent = "S/ 0.00";
      return;
    }

    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <img src="assets/img/productos/${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>Talla: ${item.size}</p>
        </div>

        <div class="quantity-control">
          <button class="decrease">-</button>
          <span>${item.quantity}</span>
          <button class="increase">+</button>
        </div>

        <div class="cart-item-price">S/ ${(item.price * item.quantity).toFixed(2)}</div>
        <button class="cart-item-remove">Eliminar</button>
      `;
      container.appendChild(div);

      // Eventos
      div.querySelector(".increase").addEventListener("click", () => {
        item.quantity++;
        updateCart();
      });

      div.querySelector(".decrease").addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity--;
          updateCart();
        }
      });

      div.querySelector(".cart-item-remove").addEventListener("click", () => {
        cart.splice(index, 1);
        updateCart();
      });
    });

    // Calcular total
    const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
    totalElement.textContent = `S/ ${total.toFixed(2)}`;
  }

  function updateCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart();
  }

  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    alert("Compra finalizada. ¡Gracias por tu pedido! 🧾");
    localStorage.removeItem(CART_KEY);
    renderCart();
  });
});
