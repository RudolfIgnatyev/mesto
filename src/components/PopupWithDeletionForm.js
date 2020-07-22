import { Popup } from './Popup.js';

class PopupWithDeletionForm extends Popup {
  constructor(popupSelector, { handleSubmitForm }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  open(cardId) {
    super.open();

    this.setEventListeners(cardId);
  }

  setEventListeners(cardId) {
    super.setEventListeners();

    this._popup.querySelector('.popup__container').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(cardId);
    });
  }
}

export { PopupWithDeletionForm };
