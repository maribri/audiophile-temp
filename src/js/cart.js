// Get the "Add to cart" button and add an event listener to it
/*const addToCartBtn = document.querySelector('.product__add');
addToCartBtn.addEventListener('click', addToCart);*/

// Get the quantity input field and add an event listener to it
/*const quantityInput = document.querySelector('.qty__field');
quantityInput.addEventListener('change', updateCart);*/

// Get the cart list element and create a cart list if it doesn't exist
/*let cartList = document.querySelector('.cart-list');
if (!cartList) {
  cartList = document.createElement('ul');
  cartList.classList.add('cart-list');
  document.querySelector('.cart__items').appendChild(cartList);
}*/

// Get the cart heading element and update its text content with the number of items in the cart
/*const cartHeading = document.querySelector('.cart__heading');
const cartItems = getCartItems();
updateCartHeading(cartItems.length);*/

// Get the cart items from local storage and create a cart item for each one
/*function getCartItems() {
  let cartItems = JSON.parse(localStorage.getItem('audiophile-cart')) || [];
  return cartItems;
}*/

// Update the cart heading element with the number of items in the cart
/*function updateCartHeading(numItems) {
  cartHeading.textContent = `Cart (${numItems})`;
}*/

// Add a product to the cart
/*function addToCart() {
  const product = {
    title: document.querySelector('.product__title').textContent,
    price: document.querySelector('.product__price').textContent.replace('$', ''),
    quantity: parseInt(document.querySelector('.qty__field').value),
  };
  const cartItems = getCartItems();
  const existingItem = cartItems.find(item => item.title === product.title);
  if (existingItem) {
    existingItem.quantity += product.quantity;
  } else {
    cartItems.push(product);
  }
  localStorage.setItem('audiophile-cart', JSON.stringify(cartItems));
  console.log(cartItems)
  updateCart();
}*/

// Update the cart when the quantity input field changes
/*function updateCart() {
  const cartItems = getCartItems();
  console.log('updateCart()', cartItems)
  const cartList = document.querySelector('.cart-list');
  cartList.innerHTML = '';
  cartItems.forEach(item => {
    const cartItem = document.createElement('li');
    cartItem.classList.add('cart-list__item');
    cartItem.innerHTML = `
      <img class="cart-list__pic" src="assets/cart/image-xx99-mark-two-headphones.jpg" alt=""/>
      <div class="cart-list__details">
        <div class="cart-list__title">${item.title}</div>
        <div class="cart-list__price">$${item.price}</div>
      </div>
      <div class="qty qty--small cart-list__qty">
        <input class="qty__field qty__field--small" type="number" value="${item.quantity}" min="1" aria-label="Quantity" />
        <button class="qty__btn qty__btn--decrease" type="button" aria-label="Decrease quantity">-</button>
        <button class="qty__btn qty__btn--increase" type="button" aria-label="Increase quantity">+</button>
      </div>
    `;
    cartList.appendChild(cartItem);
  });
  updateCartHeading(cartItems.length);
}*/

// Get the cart items from local storage
//const cartItems = JSON.parse(localStorage.getItem('audiophile-cart')) || [];

// Get the cart items HTML
/*const cartItemsHtml = cartItems.map(item => `
  <li class="cart-list__item">
    <img class="cart-list__pic" src="${item.image}" alt=""/>
    <div class="cart-list__details">
      <div class="cart-list__title">${item.title}</div>
      <div class="cart-list__price">$ ${item.price}</div>
    </div>
    <div class="qty qty--small cart-list__qty">
      <input class="qty__field qty__field--small" type="number" value="${item.quantity}" min="1" aria-label="Quantity" />
      <button class="qty__btn qty__btn--decrease" type="button" aria-label="Decrease quantity">-</button>
      <button class="qty__btn qty__btn--increase" type="button" aria-label="Increase quantity">+</button>
    </div>
    <button class="cart-list__remove-btn js-remove-btn" data-index="${cartItems.indexOf(item)}">Remove</button>
  </li>
`).join('');*/

// Update the cart items HTML
//document.querySelector('.cart-list').innerHTML = cartItemsHtml;

// Update the cart total items count
//document.querySelector('.cart__total-items').textContent = `${cartItems.length} item(s)`;

// Add event listeners to the quantity buttons
/*const quantityInputs2 = document.querySelectorAll('.qty__field');
quantityInputs2.forEach(input => {
  input.addEventListener('change', updateCartTotal);
});

// Add event listeners to the quantity buttons
const quantityBtns = document.querySelectorAll('.qty__btn');
quantityBtns.forEach(btn => {
  btn.addEventListener('click', updateCartTotal);
});*/

// Add event listener to the remove button
/*const removeBtns = document.querySelectorAll('.cart-list__remove-btn');
removeBtns.forEach(btn => {
  btn.addEventListener('click', removeFromCart);
});

// Add event listener to the remove all button
const removeAllBtn = document.querySelector('.js-remove-btn');
removeAllBtn.addEventListener('click', removeAllFromCart);*/

// Function to update the cart total
function updateCartTotal() {
  /*const cartItems = JSON.parse(localStorage.getItem('audiophile-cart')) || [];

  let totalPrice = 0;
  let totalQuantity = 0;
  cartItems.forEach(item => {
    totalPrice += item.price * item.quantity;
    totalQuantity += item.quantity;
  });*/

  //document.querySelector('.cart__total-price').textContent = `$ ${totalPrice.toFixed(2)}`;
  //document.querySelector('.cart__total-items').textContent = `${totalQuantity} item(s)`;
}

// Function to remove a product from the cart
/*function removeFromCart(event) {
  // Get the index of the product to remove
  const index = event.target.dataset.index;

  // Remove the product from the cart array
  cartItems.splice(index, 1);
  localStorage.setItem('audiophile-cart', JSON.stringify(cartItems));

  updateCartItemsHtml();
  updateCartTotal();
}*/

// Function to remove all products from the cart
/*function removeAllFromCart() {
  cartItems.length = 0;
  localStorage.setItem('audiophile-cart', JSON.stringify(cartItems));
  updateCartItemsHtml();
  updateCartTotal();
}*/

/*document.addEventListener('DOMContentLoaded', function() {
  console.log(cartItems);
  //updateCartItemsHtml();
});*/
