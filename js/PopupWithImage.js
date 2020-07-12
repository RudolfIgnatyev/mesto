import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(item) {
    super.open();

    this._popup.querySelector('.popup__image').src = item.link;
    this._popup.querySelector('.popup__image').alt = item.name;
    this._popup.querySelector('.popup__caption').textContent = item.name;
  }
}

export { PopupWithImage };
