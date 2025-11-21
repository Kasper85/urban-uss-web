/* ===============================
   LÓGICA DEL CATÁLOGO DE PRODUCTOS (jQuery)
   =============================== */

$(document).ready(function () {
  const $grid = $("#productGrid");
  const $filterCategory = $("#filterCategory");
  const $filterOrder = $("#filterOrder");

  let currentProducts = [...products];

  renderProducts(currentProducts);

  // Filtro por categoría
  $filterCategory.on("change", function () {
    const selected = $(this).val();
    currentProducts = selected === "all"
      ? [...products]
      : products.filter(p => p.category === selected);
    renderProducts(currentProducts);
  });

  // Ordenar por precio
  $filterOrder.on("change", function () {
    const selected = $(this).val();
    let sorted = [...currentProducts];

    if (selected === "priceAsc") sorted.sort((a, b) => a.price - b.price);
    if (selected === "priceDesc") sorted.sort((a, b) => b.price - a.price);

    renderProducts(sorted);
  });

  // Renderizado de productos
  function renderProducts(list) {
    $grid.empty();
    list.forEach(product => {
      const $col = $("<div>").addClass("col-md-4 col-sm-6");
      const $card = $("<div>").addClass("card h-100 border-0 shadow-sm product-card cursor-pointer");

      // Evento click para ir al detalle
      $card.on("click", function () {
        window.location.href = `product.html?id=${product.id}`;
      });

      $card.html(`
                <img src="assets/img/productos/${product.image}" class="card-img-top object-fit-cover" alt="${product.name}" style="height: 300px;">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${product.name}</h5>
                    <p class="card-text text-muted text-truncate">${product.description}</p>
                    <p class="card-text fw-bold text-success fs-5">S/ ${product.price.toFixed(2)}</p>
                </div>
            `);

      $col.append($card);
      $grid.append($col);
    });
  }
});