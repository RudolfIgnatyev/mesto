class Card {
  constructor(data, cardSelector, { handleCardClick }, selectorsAndClass) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._cardImageSelector = selectorsAndClass.cardImageSelector;
    this._cardTitleSelector = selectorsAndClass.cardTitleSelector;
    this._cardLikeIconSelector = selectorsAndClass.cardLikeIconSelector;
    this._cardLikeIconActiveClass = selectorsAndClass.cardLikeIconActiveClass;
    this._cardDeleteIconSelector = selectorsAndClass.cardDeleteIconSelector;
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

    this._element.querySelector(this._cardImageSelector).src = this._link;
    this._element.querySelector(this._cardImageSelector).alt = this._name;
    this._element.querySelector(this._cardTitleSelector).textContent = this._name;

    return this._element;
  }

  // Метод пометки понравившейся карточки
  _likeCard() {
    this._element.querySelector(this._cardLikeIconSelector).classList.toggle(this._cardLikeIconActiveClass);
  }

  // Метод удаления карточки
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Метод прикрепления обработчиков к элементам
  _setEventListeners() {
    this._element.querySelector(this._cardLikeIconSelector).addEventListener('click', this._likeCard.bind(this));
    this._element.querySelector(this._cardDeleteIconSelector).addEventListener('click', this._deleteCard.bind(this));
    this._element.querySelector(this._cardImageSelector).addEventListener('click', () => {
      this._handleCardClick();
    });
  }
}

export { Card };
