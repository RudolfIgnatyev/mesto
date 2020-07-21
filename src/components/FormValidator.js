class FormValidator {
  constructor(data, formForValidation) {
    this._formForValidation = formForValidation;
    this._formSelector = this._formForValidation.querySelector(data.formSelector);
    this._inputSelector = Array.from(this._formForValidation.querySelectorAll(data.inputSelector));
    this._submitButtonSelector = this._formForValidation.querySelector(data.submitButtonSelector);
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
  }

  // Публичный метод включения валидации формы
  enableValidation() {
    this._setEventListeners();
  }

  // Публичный метод очистки валидации формы
  resetValidation() {
    Array.from(this._formForValidation.querySelectorAll('.popup__error')).forEach((errorElement) => {
      errorElement.textContent = '';
    });

    this._toggleSubmitButtonErrorClass();
  }

  // Показываем класс поля при отрицательной проверке на валидность
  _showInputError(evt) {
    if (!evt.target.checkValidity()) {
      // Не валидно - показываем ошибки
      evt.target.classList.add(this._inputErrorClass);
      document.querySelector(`#${evt.target.id}-error`).textContent = evt.target.validationMessage;
    }
  }

  // Удаляем класс поля при положительной проверке на валидность
  _hideInputError(evt) {
    if (evt.target.checkValidity()) {
      // Валидно - скрываем ошибки
      evt.target.classList.remove(this._inputErrorClass);
      document.querySelector(`#${evt.target.id}-error`).textContent = '';
    }
  }

  // Показываем/удаляем класс недоступности кнопки при проверке формы на валидность
  _toggleSubmitButtonErrorClass() {
    const formIsNotValid = !this._formSelector.checkValidity();
    this._submitButtonSelector.disabled = formIsNotValid;
    this._submitButtonSelector.classList.toggle(this._inactiveButtonClass, formIsNotValid);
  }

  // Метод прикрепления обработчиков к элементам
  _setEventListeners() {
    this._inputSelector.forEach((inputElement) => {
      inputElement.addEventListener('input', this._showInputError);
      inputElement.addEventListener('input', this._hideInputError);
    });
    this._formSelector.addEventListener('input', this._toggleSubmitButtonErrorClass.bind(this));
  }
}

export { FormValidator };
