/* ===============================
   PÁGINA DE PRODUCTO INDIVIDUAL (jQuery)
   (con talla + cantidad)
   =============================== */

const CART_KEY = "urbanUSS_cart";

$(document).ready(function () {
  const $container = $("#productContainer");

  // 📦 Obtener el ID del producto desde la URL
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"));

  // Buscar producto en data.js
  const product = products.find(p => p.id === productId) || products[0];

  // Renderizar producto con Bootstrap
  $container.html(`
        <div class="row">
            <div class="col-md-6 mb-4">
                <img src="assets/img/productos/${product.image}" alt="${product.name}" class="img-fluid rounded shadow-sm w-100 object-fit-cover" style="max-height: 500px;">
            </div>

            <div class="col-md-6">
                <h1 class="display-5 fw-bold mb-3">${product.name}</h1>
                <p class="lead text-secondary mb-4">${product.description}</p>
                <div class="h2 text-success fw-bold mb-4">S/ ${product.price.toFixed(2)}</div>

                <div class="mb-4">
                    <p class="fw-bold mb-2">Talla:</p>
                    <div class="btn-group size-selector" role="group">
                        <button type="button" class="btn btn-outline-dark" data-size="S">S</button>
                        <button type="button" class="btn btn-outline-dark" data-size="M">M</button>
                        <button type="button" class="btn btn-outline-dark" data-size="L">L</button>
                        <button type="button" class="btn btn-outline-dark" data-size="XL">XL</button>
                    </div>
                </div>

                <div class="mb-4">
                    <p class="fw-bold mb-2">Cantidad:</p>
                    <div class="input-group" style="width: 150px;">
                        <button class="btn btn-outline-secondary" type="button" id="decreaseQty">-</button>
                        <input type="number" class="form-control text-center" id="productQty" value="1" min="1">
                        <button class="btn btn-outline-secondary" type="button" id="increaseQty">+</button>
                    </div>
                </div>

                <button class="btn btn-primary btn-lg w-100 text-uppercase fw-bold add-to-cart">Agregar al carrito</button>
            </div>
        </div>
    `);

  // --- Selección de talla ---
  let selectedSize = null;
  const $sizeButtons = $(".size-selector button");

  $sizeButtons.on("click", function () {
    $sizeButtons.removeClass("active btn-dark").addClass("btn-outline-dark");
    $(this).removeClass("btn-outline-dark").addClass("active btn-dark");
    selectedSize = $(this).data("size");
  });

  // --- Control de cantidad ---
  const $qtyInput = $("#productQty");

  $("#increaseQty").on("click", function () {
    $qtyInput.val(parseInt($qtyInput.val()) + 1);
  });

  $("#decreaseQty").on("click", function () {
    if ($qtyInput.val() > 1) $qtyInput.val(parseInt($qtyInput.val()) - 1);
  });

  // --- Agregar al carrito ---
  $(".add-to-cart").on("click", function () {
    if (!selectedSize) {
      alert("Por favor selecciona una talla antes de agregar al carrito.");
      return;
    }

    const quantity = parseInt($qtyInput.val());
    addToCart(product, selectedSize, quantity);
  });
});

function addToCart(product, size, quantity) {
  let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  const existing = cart.find(item => item.id === product.id && item.size === size);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      quantity
    });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  alert(`✅ ${product.name} (Talla ${size}, Cantidad ${quantity}) fue agregado al carrito.`);
}
