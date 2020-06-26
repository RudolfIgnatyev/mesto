// Определяем базовый массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Йошкар-Ола',
    link: 'https://images.unsplash.com/photo-1591996686974-2e2f871e3c09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
    cardLikeElement.classList.toggle('cards-list__like-icon_active');
  }

  // Метод удаления карточки
  _deleteCard(cardDeleteElement) {
    cardDeleteElement.parentNode.parentNode.removeChild(cardDeleteElement.parentNode);
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
    Array.from(this._element.querySelectorAll('.cards-list__like-icon')).forEach((cardLikeElement) => {
      cardLikeElement.addEventListener('click', () => this._likeCard(cardLikeElement));
    });

    Array.from(this._element.querySelectorAll('.cards-list__delete-icon')).forEach((cardDeleteElement) => {
      cardDeleteElement.addEventListener('click', () => this._deleteCard(cardDeleteElement));
    });

    this._element.querySelector('.cards-list__image').addEventListener('click', () => {
      this._showCardPopup();
    });
  }
}

export { initialCards, zoomImages, Card };
