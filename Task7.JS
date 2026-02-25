let allProducts = [];

  async function fetchProducts() {
    const message = document.getElementById("message");

    try {
      message.innerText = "Loading products...";

      const response = await fetch("https://fakestoreapi.com/products?limit=12");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const products = await response.json();

      allProducts = products;

      message.innerText = "";

      displayProducts(products);

      document.getElementById("productCount").innerText =
        "Total Products: " + products.length;

    } catch (error) {
      message.innerText = "Error: " + error.message;
      message.style.color = "red";
    }
  }

  function displayProducts(products) {
    const container = document.getElementById("products");

    container.innerHTML = "";

    products.forEach(product => {
      const div = document.createElement("div");

      div.className = "product";

      div.innerHTML = `
        <img src="${product.image}" />
        <h4>${product.title}</h4>
        <p class="price">$${product.price}</p>
      `;

      container.appendChild(div);
    });
  }

  function sortLowToHigh() {
    const sorted = [...allProducts].sort((a, b) => a.price - b.price);
    displayProducts(sorted);
  }

  fetchProducts();
