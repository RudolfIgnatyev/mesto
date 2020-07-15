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

  // // Показываем/удаляем класс поля при его проверке на валидность
  // _displayInputError(evt) {
  //   const inputElement = evt.target;
  //   const errorElement = document.querySelector(`#${inputElement.id}-error`);
  //   // Проверяем поле на валидность
  //   const inputIsValid = inputElement.checkValidity();

  //   if (!inputIsValid) {
  //     // Не валидно - показываем ошибки
  //     inputElement.classList.add(this._inputErrorClass);
  //     errorElement.textContent = inputElement.validationMessage;
  //   } else {
  //     // Валидно - скрываем ошибки
  //     inputElement.classList.remove(this._inputErrorClass);
  //     errorElement.textContent = '';
  //   }
  // }

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
