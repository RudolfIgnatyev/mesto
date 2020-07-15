class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

    // Связываем метод _handleEscClose с контекстом
    this._handleEscCloseByContext = this._handleEscClose.bind(this);
    // Связываем метод _handleOverlayClose с контекстом
    this._handleOverlayCloseByContext = this._handleOverlayClose.bind(this);
    // Связываем метод close с контекстом
    this.closeByContext = this.close.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');

    // Прикрепляем обработчик клика на клавишу
    document.addEventListener('keydown', this._handleEscCloseByContext);
  }

  close() {
    this._popup.classList.remove('popup_opened');

    // Удалям обработчик клика на клавишу
    document.removeEventListener('keydown', this._handleEscCloseByContext);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      // Вызываем функцию скрытия попапа
      this.closeByContext();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      // Вызываем функцию скрытия попапа
      this.closeByContext();
    }
  }

  // Метод прикрепления обработчика к иконке закрытия попапа
  setEventListeners() {
    this._popup.querySelector('.popup__close-icon').addEventListener('click', this.closeByContext);
    document.addEventListener('click', this._handleOverlayCloseByContext);
  }
}

export { Popup };
