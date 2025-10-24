/* ===============================
   LÓGICA DEL CATÁLOGO DE PRODUCTOS
   (ahora con navegación a product.html)
   =============================== */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("productGrid");
  const filterCategory = document.getElementById("filterCategory");
  const filterOrder = document.getElementById("filterOrder");

  let currentProducts = [...products];

  renderProducts(currentProducts);

  // Filtro por categoría
  filterCategory.addEventListener("change", () => {
    const selected = filterCategory.value;
    currentProducts =
      selected === "all"
        ? [...products]
        : products.filter((p) => p.category === selected);
    renderProducts(currentProducts);
  });

  // Ordenar por precio
  filterOrder.addEventListener("change", () => {
    const selected = filterOrder.value;
    let sorted = [...currentProducts];

    if (selected === "priceAsc") sorted.sort((a, b) => a.price - b.price);
    if (selected === "priceDesc") sorted.sort((a, b) => b.price - a.price);

    renderProducts(sorted);
  });

  // Renderizado de productos
  function renderProducts(list) {
    grid.innerHTML = "";
    list.forEach((product) => {
      const item = document.createElement("div");
      item.classList.add("product-card");
      item.innerHTML = `
        <img src="assets/img/productos/${product.image}" alt="${product.name}">
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-price">S/ ${product.price.toFixed(2)}</div>
        </div>
      `;

      // 🔗 Evento: al hacer clic, abrir product.html con ID
      item.addEventListener("click", () => {
        window.location.href = `product.html?id=${product.id}`;
      });

      grid.appendChild(item);
    });
  }
});