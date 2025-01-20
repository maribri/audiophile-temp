/*// Define a mapping object to hold regular expressions for different input types
const regexMap = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  tel: /^\+?(\d[\s-]*){10,}$/,
  number: /^\d+$/
};

// Get the form element
const form = document.getElementById('checkout');

if (form) {
  // Add an event listener to the form submit event
  form.addEventListener('submit', (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    const inputErrorClassName = 'field__input--error';
    const labelErrorClassName = 'field__label--error';

    // Re-query the required input elements each time the form is submitted
    const requiredInputs = form.querySelectorAll('input[required]');
    console.log(requiredInputs.length)

    // Loop through all the required input elements in the form
    for (const input of requiredInputs) {
      // Get the parent field element
      const field = input.closest('.field');//@todo check radio

      // Get the associated label element
      const label = field.querySelector('.field__label');

      // Get or create the associated error message element
      let error = field.querySelector('.field__error');

      // Reset the error state for this input element and label
      input.classList.remove(inputErrorClassName);
      label.classList.remove(labelErrorClassName);
      if (error) {
        error.remove();
      }

      // Check if the input value is empty or doesn't match the regex
      let errorMessage = '';
      if (input.value === '') {
        errorMessage = 'Empty field';
      } else if (regexMap[input.type] && !regexMap[input.type].test(input.value)) {
        errorMessage = 'Wrong format';
      }

      // Create and insert error message if an error is found
      if (errorMessage) {
        error = document.createElement('span');
        error.className = 'field__error';
        error.textContent = errorMessage;
        input.insertAdjacentElement('beforebegin', error);
        input.classList.add(inputErrorClassName);
        label.classList.add(labelErrorClassName);
      }
    }

    // If there are any errors, prevent the form from submitting
    const errorInputs = form.querySelectorAll('.field__input--error');
    if (errorInputs.length > 0) {
      console.log('errorInputs', errorInputs.length)
      event.preventDefault();
    } else {
      // Otherwise, submit the form
      //form.submit();
      console.log('form submitted');
    }
  });
}
*/
