// Функция включения валидации форм
function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    // Находим элементы внутри formElement
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const submitButton = formElement.querySelector(settings.submitButtonSelector);

    inputList.forEach((inputElement) => {
      // Прикрепляем обработчик ввода текста в поле для проверки валидности вполя
      inputElement.addEventListener('input', evt => displayInputError(evt, settings.inputErrorClass));
    })

    // Прикрепляем обработчик ввода текста в поле для проверки валидности формы
    formElement.addEventListener('input', () => toggleSubmitButtonErrorClass(formElement, submitButton, settings.inactiveButtonClass));
  })
}

// Показываем/удаляем класс поля при его проверке на валидность
function displayInputError(evt, inputErrorClass) {
  const inputElement = evt.target;
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  // Проверяем поле на валидность
  const inputIsValid = inputElement.checkValidity();

  if (!inputIsValid) {
    // Не валидно - показываем ошибки
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  } else {
    // Валидно - скрываем ошибки
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
  }
}

// Показываем/удаляем класс кнопки при проверке формы на валидность
function toggleSubmitButtonErrorClass(formElement, submitButton, inactiveButtonClass){
  const formIsNotValid = !formElement.checkValidity();
  submitButton.disabled = formIsNotValid;
  submitButton.classList.toggle(inactiveButtonClass, formIsNotValid);
}

// Включаем валидацию вызовом enableValidation
enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
});
