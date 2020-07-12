class Card {
  constructor(data, cardSelector, { handleCardClick }) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  // Метод клонирования содержимого селектора шаблона
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);

    return cardElement.firstElementChild;
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
    this._element.querySelector('.cards-list__like-icon').classList.toggle('cards-list__like-icon_active');
  }

  // Метод удаления карточки
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Метод прикрепления обработчиков к элементам
  _setEventListeners() {
    this._element.querySelector('.cards-list__like-icon').addEventListener('click', this._likeCard.bind(this));
    this._element.querySelector('.cards-list__delete-icon').addEventListener('click', this._deleteCard.bind(this));
    this._element.querySelector('.cards-list__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  }
}

export { Card };
