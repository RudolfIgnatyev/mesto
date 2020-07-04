// Находим элементы в DOM
const zoomImages = document.querySelector('.popup_type_images');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;

    // Связываем метод _handleEscKeyPressed с контекстом
    this._handleEscKeyPressedByContext = this._handleEscKeyPressed.bind(this);
    // Связываем метод handleCardOverlayClicked с контекстом
    this._handleCardOverlayClickedByContext = this._handleCardOverlayClicked.bind(this);
  }

  // Метод клонирования содержимого селектора шаблона
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);

    return cardElement;
  }

  // Публичный метод генерирования карточки
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.cards-list__image').src = this._link;
    this._element.querySelector('.cards-list__image').alt = this._name;
    this._element.querySelector('.cards-list__title').textContent = this._name;

    return this._element;
  }

  // Метод пометки понравившейся карточки
  _likeCard() {
    this._element.querySelector('.cards-list__like-icon').classList.toggle('.cards-list__like-icon_active');
  }

  // Метод удаления карточки
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Метод скрытия попапа карточки
  _hideCardPopup() {
    zoomImages.classList.remove('popup_opened');

    // Удалям обработчик клика на клавишу
    document.removeEventListener('keydown', this._handleEscKeyPressedByContext);
    // Удалям обработчик клика на оверлей
    document.removeEventListener('click', this._handleCardOverlayClickedByContext);
  }

  // Метод скрытия попапа карточки нажатием на клавишу Escape
  _handleEscKeyPressed(evt) {
    if (evt.key === 'Escape') {
      // Вызываем функцию скрытия попапа карточки
      this._hideCardPopup();
    }
  }

  // Метод скрытия попапа карточки кликом на оверлей
  _handleCardOverlayClicked(evt) {
    if (evt.target.classList.contains('popup')) {
      // Вызываем функцию скрытия попапа карточки
      this._hideCardPopup();
    }
  }

  // Метод показа попапа карточки
  _showCardPopup() {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupCaption.textContent = this._name;
    zoomImages.classList.add('popup_opened');

    // Прикрепляем обработчик клика на клавишу
    document.addEventListener('keydown', this._handleEscKeyPressedByContext);
    // Прикрепляем обработчик клика на оверлей
    document.addEventListener('click', this._handleCardOverlayClickedByContext);
  }

  // Метод прикрепления обработчиков к элементам
  _setEventListeners() {
    this._element.querySelector('.cards-list__like-icon').addEventListener('click', this._likeCard.bind(this));
    this._element.querySelector('.cards-list__delete-icon').addEventListener('click', this._deleteCard.bind(this));
    this._element.querySelector('.cards-list__image').addEventListener('click', () => {
      this._showCardPopup();
    });
  }
}

export { Card };
