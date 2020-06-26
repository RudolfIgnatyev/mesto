// Объект настроек с селекторами и классами формы
const selectorsAndClasses = {
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
};

class FormValidator {
  constructor(data, formForValidation) {
    this._formForValidation = formForValidation;
    this._formSelector =  Array.from(document.querySelectorAll(data.formSelector));
    this._inputSelector = Array.from(this._formForValidation.querySelectorAll(data.inputSelector));
    this._submitButtonSelector =  this._formForValidation.querySelector(data.submitButtonSelector);
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;

  }

  // Публичный метод включения валидации формы
  enableValidation() {
    this._setEventListeners();
  }

  // Показываем/удаляем класс поля при его проверке на валидность
  _displayInputError(evt) {
    const inputElement = evt.target;
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    // Проверяем поле на валидность
    const inputIsValid = inputElement.checkValidity();

    if (!inputIsValid) {
      // Не валидно - показываем ошибки
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
    } else {
      // Валидно - скрываем ошибки
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.textContent = '';
    }
  }

  // Показываем/удаляем класс недоступности кнопки при проверке формы на валидность
  _toggleSubmitButtonErrorClass(formElement) {
    const formIsNotValid = !formElement.checkValidity();
    this._submitButtonSelector.disabled = formIsNotValid;
    this._submitButtonSelector.classList.toggle(this._inactiveButtonClass, formIsNotValid);
  }

  // Метод прикрепления обработчиков к элементам
  _setEventListeners() {
    this._formSelector.forEach((formElement) => {
      this._inputSelector.forEach((inputElement) => {
        inputElement.addEventListener('input', this._displayInputError);
      });
      formElement.addEventListener('input', () => this._toggleSubmitButtonErrorClass(formElement));
    });
  }
}

export { selectorsAndClasses, FormValidator };
