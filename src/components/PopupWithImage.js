import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector, { popupImageSelector, popupCaptionSelector }) {
    super(popupSelector);
    this._popupImageSelector = popupImageSelector;
    this._popupCaptionSelector = popupCaptionSelector;
  }

  open(item) {
    super.open();

    this._popup.querySelector(this._popupImageSelector).src = item.link;
    this._popup.querySelector(this._popupImageSelector).alt = item.name;
    this._popup.querySelector(this._popupCaptionSelector).textContent = item.name;
  }
}

export { PopupWithImage };
