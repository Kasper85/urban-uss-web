/* ===============================
   PÁGINA DE PRODUCTO INDIVIDUAL
   (con talla + cantidad)
   =============================== */

const CART_KEY = "urbanUSS_cart";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("productContainer");

  // 📦 Obtener el ID del producto desde la URL
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"));

  // Buscar producto en data.js
  const product = products.find((p) => p.id === productId) || products[0];

  // Renderizar producto
  container.innerHTML = `
    <div class="product-image">
      <img src="assets/img/productos/${product.image}" alt="${product.name}" />
    </div>

    <div class="product-info">
      <h1>${product.name}</h1>
      <p>${product.description}</p>
      <div class="product-price">S/ ${product.price.toFixed(2)}</div>

      <div class="size-selector">
        <p><strong>Talla:</strong></p>
        <button data-size="S">S</button>
        <button data-size="M">M</button>
        <button data-size="L">L</button>
        <button data-size="XL">XL</button>
      </div>

      <div class="quantity-selector">
        <p><strong>Cantidad:</strong></p>
        <div class="quantity-controls">
          <button id="decreaseQty">-</button>
          <input type="number" id="productQty" value="1" min="1" />
          <button id="increaseQty">+</button>
        </div>
      </div>

      <button class="add-to-cart">Agregar al carrito</button>
    </div>
  `;

  // --- Selección de talla ---
  const sizeButtons = container.querySelectorAll(".size-selector button");
  let selectedSize = null;

  sizeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      sizeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedSize = btn.dataset.size;
    });
  });

  // --- Control de cantidad ---
  const qtyInput = container.querySelector("#productQty");
  container.querySelector("#increaseQty").addEventListener("click", () => {
    qtyInput.value = parseInt(qtyInput.value) + 1;
  });
  container.querySelector("#decreaseQty").addEventListener("click", () => {
    if (qtyInput.value > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
  });

  // --- Agregar al carrito ---
  const addToCartBtn = container.querySelector(".add-to-cart");
  addToCartBtn.addEventListener("click", () => {
    if (!selectedSize) {
      alert("Por favor selecciona una talla antes de agregar al carrito.");
      return;
    }

    const quantity = parseInt(qtyInput.value);
    addToCart(product, selectedSize, quantity);
  });
});

function addToCart(product, size, quantity) {
  let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  const existing = cart.find(
    (item) => item.id === product.id && item.size === size
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      quantity,
    });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  alert(`✅ ${product.name} (Talla ${size}, Cantidad ${quantity}) fue agregado al carrito.`);
}
