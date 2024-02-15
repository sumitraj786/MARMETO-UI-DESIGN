document.addEventListener("DOMContentLoaded", function () {
  // Fetch product data from the API
  fetchProducts('Men'); // Display default products on page load

  // Set Men tab as active by default
  document.getElementById('men-tab').classList.add('active');

  // Attach event listeners to the tabs
  document.getElementById('men-tab').addEventListener('click', function () {
    handleTabClick('Men');
  });

  document.getElementById('women-tab').addEventListener('click', function () {
    handleTabClick('Women');
  });

  document.getElementById('kids-tab').addEventListener('click', function () {
    handleTabClick('Kids');
  });
});

// Function to handle tab clicks and fetch/display products
function handleTabClick(category) {
  // Remove "active" class from all tabs
  document.querySelectorAll('.tab-btn').forEach(tab => tab.classList.remove('active'));

  // Add "active" class to the clicked tab
  document.getElementById(`${category.toLowerCase()}-tab`).classList.add('active');

  // Fetch and display products based on the selected category
  fetchProducts(category);
}

// Function to fetch and display products based on the selected category
function fetchProducts(category) {
  fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
    .then(response => response.json())
    .then(data => {
      const products = data.categories.find(cat => cat.category_name === category)?.category_products || [];
      showProducts(products);
    })
    .catch(error => console.error('Error fetching product data:', error));
}

// Function to calculate percentage discount
function calculateDiscountPercentage(price, compareAtPrice) {
  const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
  return Math.round(discount);
}

// Function to display products in the product container
function showProducts(products) {
  const productContainer = document.getElementById('product-container');
  productContainer.innerHTML = ''; // Clear existing products

  products.forEach(product => {
    const discountPercentage = calculateDiscountPercentage(parseFloat(product.price), parseFloat(product.compare_at_price));

    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    const productImageContainer = document.createElement('div');
    productImageContainer.className = 'product-image-container';

    if (product.badge_text !== null) {
      const productBadgeBox = document.createElement('div');
      productBadgeBox.className = 'product-badge-box';

      const productBadge = document.createElement('div');
      productBadge.innerText = product.badge_text || '';
      productBadge.className = 'product-badge';
      productBadgeBox.appendChild(productBadge);

      productImageContainer.appendChild(productBadgeBox);
    }

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;
    productImage.className = 'product-image';

    productImageContainer.appendChild(productImage);

    const productDetails = document.createElement('div');
    productDetails.className = 'product-details';

    const productNameContainer = document.createElement('div');
    productNameContainer.className = 'product-name-container';

    const productTitle = document.createElement('div');
    productTitle.innerText = product.title;
    productTitle.className = 'product-title';

    const productVendor = document.createElement('div');
    productVendor.innerText = `• ${product.vendor}`;
    productVendor.className = 'product-vendor';

    productNameContainer.appendChild(productTitle);
    productNameContainer.appendChild(productVendor);

    const productPrice = document.createElement('div');
    productPrice.innerText = `Rs: ${product.price}`;
    productPrice.className = 'product-price';

    const compareAtPrice = document.createElement('div');
    compareAtPrice.innerText = `${product.compare_at_price}`;
    compareAtPrice.className = 'compare-at-price';

    const discountInfo = document.createElement('div');
    discountInfo.innerText = `${discountPercentage}% off`;
    discountInfo.className = 'discount-info';

    const addToCartBtn = document.createElement('button');
    addToCartBtn.innerText = 'Add to Cart';
    addToCartBtn.className = 'add-to-cart-btn';

    productDetails.appendChild(productNameContainer);
    productDetails.appendChild(productPrice);
    productDetails.appendChild(compareAtPrice);
    productDetails.appendChild(discountInfo);

    productCard.appendChild(productImageContainer);
    productCard.appendChild(productDetails);
    productCard.appendChild(addToCartBtn);

    productContainer.appendChild(productCard);
  });
}
