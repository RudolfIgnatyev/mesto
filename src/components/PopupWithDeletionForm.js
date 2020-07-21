import { Popup } from './Popup.js';

class PopupWithDeletionForm extends Popup {
  constructor(popupSelector, { handleSubmitForm }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.querySelector('.popup__container').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm();
    });
  }
}

export { PopupWithDeletionForm };
