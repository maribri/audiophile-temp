// Get the trigger buttons and the modal windows
const burgerButton = document.getElementById('header-burger');
const modalMenu = document.getElementById('mobile-menu');
const cartButton = document.getElementById('cart-btn');
const modalCart = document.getElementById('cart-modal');
const allModals = document.querySelectorAll('.js-modal');
const overlay = document.querySelector('.js-overlay');

//origin start
function openModal(modal) {
  allModals.forEach((m) => {
    if (m.classList.contains('modal--open')) {
      closeModal(m);
    }
  });

  modal.classList.toggle('modal--open');
  modal.setAttribute('aria-hidden',!modal.classList.contains('modal--open'));
  modal.setAttribute('aria-expanded', modal.classList.contains('modal--open'));
  document.body.classList.toggle('body--inactive');
  overlay.classList.toggle('overlay--visible');
}
function closeModal(modal) {
  modal.classList.remove('modal--open');
  modal.setAttribute('aria-hidden', true);
  modal.setAttribute('aria-expanded', false);
  document.body.classList.remove('body--inactive');
  overlay.classList.remove('overlay--visible');
}

// Add an event listener to the burger button
burgerButton.addEventListener('click', () => {
  openModal(modalMenu);
});

// Add an event listener to the modal window
modalMenu.addEventListener('click', (event) => {
  // Close the modal window if the user clicks outside of it
  if (event.target === modalMenu) {
    closeModal(modalMenu);
  }
});

cartButton.addEventListener('click', () => {
  openModal(modalCart);
});

modalCart.addEventListener('click', (event) => {
  if (event.target === modalCart) {
    closeModal(modalCart);
  }
});

overlay.addEventListener('click', () => {
  allModals.forEach((modal) => {
    closeModal(modal);
  });
});

//origin end

// @todo add js- prefix to all classes for quantity and form

function addQuantityInputListeners(input) {
  const increaseBtn = input.parentNode.querySelector('.qty__btn--increase');
  const decreaseBtn = input.parentNode.querySelector('.qty__btn--decrease');
  const minValue = parseInt(input.getAttribute('min'), 10);

  /*increaseBtn.addEventListener('click', function() {
    let value = parseInt(input.value);
    value = isNaN(value) || value < minValue? minValue : value;
    value++;
    input.value = value;
  });

  decreaseBtn.addEventListener('click', function() {
    let value = parseInt(input.value);
    value = isNaN(value) || value < minValue? minValue : value;
    if (value > 1) {
      value--;
      input.value = value;
    }
  });*/

  // slavka start
  // херь снизу === increaseBtn и decreaseBtn сверху
  const qtyBtn = input.parentNode.querySelectorAll('.qty__btn');
  qtyBtn.forEach((btn) => {
    btn.addEventListener('click', ()=>{
      const isIncr = btn.classList.contains('qty__btn--increase');
      let value = parseInt(input.value);
      value = isNaN(value) || value < minValue? minValue : value;
      isIncr ? value++ : value--;
      if (value > 0) {
        input.value = value;
        console.log(isIncr, value);
      }
    })
  })
  // slavka end
}

// Call the function for each quantity input field
const quantityInputs = document.querySelectorAll('.qty__field');
quantityInputs.forEach(function(input) {
  addQuantityInputListeners(input);
});

document.addEventListener('DOMContentLoaded', (event) => {//@todo check difference with other functions
  if (document.getElementById('js-show-more') === null) return;
  const showMoreButton = document.querySelector('#js-show-more');
  const cartListItems = document.querySelectorAll('.cart-list__item');

  showMoreButton.addEventListener('click', () => {
    // Starting from the second item (index 1), as index 0 is the first item
    for (let i = 1; i < cartListItems.length; i++) {
      cartListItems[i].style.display = 'block';
    }

    // Remove the button after updating the display of list items
    showMoreButton.remove();
  });
});
