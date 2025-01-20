/*const paymentOptions = document.querySelectorAll('.js-radio');
const eMoneyFields = document.querySelectorAll('.js-e-money');
const cashOnDeliveryNotice = document.querySelector('.js-notice-cash');

const paymentToggle = () => {
  const isEMoney = [...paymentOptions].some(el => el.checked && el.id === 'e-money');
  eMoneyFields.forEach(el => {
    el.style.display = isEMoney ? 'flex' : 'none';
    const input = el.querySelector('input');
    input.classList.remove('field__input--error');
    isEMoney ? input.setAttribute('required', '') : input.removeAttribute('required');
  });
  cashOnDeliveryNotice.style.display = isEMoney ? 'none' : 'block';
}

paymentOptions.forEach(option => option.addEventListener('change', paymentToggle));
if (eMoneyFields.length) {
  document.addEventListener('DOMContentLoaded', paymentToggle);
}
*/
// @todo refactor, avoid CLI
