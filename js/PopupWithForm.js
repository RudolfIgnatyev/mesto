import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmitForm }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    this._inputListValues = {};

    this._inputList = this._popup.querySelectorAll('.popup__field');
    this._inputList.forEach(inputElement => {
      this._inputListValues[inputElement.name] = inputElement.value;
    });

    return this._inputListValues;
  }

  close() {
    super.close();

    this._popup.querySelector('.popup__container').reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.querySelector('.popup__container').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }
}

export { PopupWithForm };
