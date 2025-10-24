/* ===============================
   PÁGINA DE PRODUCTO INDIVIDUAL
   (con lectura de ID desde URL)
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
        <button data-size="S">S</button>
        <button data-size="M">M</button>
        <button data-size="L">L</button>
        <button data-size="XL">XL</button>
      </div>

      <button class="add-to-cart">Agregar al carrito</button>
    </div>
  `;

  // Selección de talla
  const sizeButtons = container.querySelectorAll(".size-selector button");
  let selectedSize = null;

  sizeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      sizeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedSize = btn.dataset.size;
    });
  });

  // Agregar al carrito
  const addToCartBtn = container.querySelector(".add-to-cart");
  addToCartBtn.addEventListener("click", () => {
    if (!selectedSize) {
      alert("Por favor selecciona una talla antes de agregar al carrito.");
      return;
    }

    addToCart(product, selectedSize);
  });
});

function addToCart(product, size) {
  let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  const existing = cart.find(
    (item) => item.id === product.id && item.size === size
  );

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      quantity: 1,
    });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  alert(`✅ ${product.name} (Talla ${size}) fue agregado al carrito.`);
}