// Находим элементы в DOM
const zoomImages = document.querySelector('.popup_type_images');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
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
  _likeCard(cardLikeElement) {
    this._element = cardLikeElement;
    this._element.classList.toggle('cards-list__like-icon_active');
  }

  // Метод удаления карточки
  _deleteCard(cardDeleteElement) {
    this._element = cardDeleteElement;
    this._element.remove();
    this._element = null;
  }

  // Метод скрытия попапа карточки нажатием на клавишу Escape
  _handleEscKeyPressed(evt) {
    if (evt.key === 'Escape') {
      zoomImages.classList.remove('popup_opened');

      // Удалям обработчик клика на клавишу
      document.removeEventListener('keydown', this._handleEscKeyPressedByContext);
    }
  }

  // Метод показа попапа карточки
  _showCardPopup() {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupCaption.textContent = this._name;
    zoomImages.classList.add('popup_opened');

    // Связываем метод _handleEscKeyPressed с контекстом
    this._handleEscKeyPressedByContext = this._handleEscKeyPressed.bind(this);
    // Прикрепляем обработчик клика на клавишу
    document.addEventListener('keydown', this._handleEscKeyPressedByContext);
  }

  // Метод прикрепления обработчиков к элементам
  _setEventListeners() {
    const cardLikeElement = this._element.querySelector('.cards-list__like-icon');
    const cardDeleteElement = this._element.querySelector('.cards-list__item');

    cardLikeElement.addEventListener('click', () => {
      this._likeCard(cardLikeElement);
    });

    this._element.querySelector('.cards-list__delete-icon').addEventListener('click', () => {
      this._deleteCard(cardDeleteElement);
    });

    this._element.querySelector('.cards-list__image').addEventListener('click', () => {
      this._showCardPopup();
    });
  }
}

export { zoomImages, Card };
