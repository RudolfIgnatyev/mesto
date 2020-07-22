class Card {
  constructor(data, cardSelector, { handleCardClick, handleBasketClick }, selectorsAndClass, idEquality) {
    this._name = data.name;
    this._link = data.link;
    this._likesCounter = data.likes;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleBasketClick = handleBasketClick;
    this._cardImageSelector = selectorsAndClass.cardImageSelector;
    this._cardTitleSelector = selectorsAndClass.cardTitleSelector;
    this._cardLikeIconSelector = selectorsAndClass.cardLikeIconSelector;
    this._cardLikeIconActiveClass = selectorsAndClass.cardLikeIconActiveClass;
    this._cardLikeAmountTextSelector = selectorsAndClass.cardLikeAmountTextSelector;
    this._cardDeleteIconSelector = selectorsAndClass.cardDeleteIconSelector;
    this._cardDeleteIconHiddenClass = selectorsAndClass.cardDeleteIconHiddenClass;
    this._idEquality = idEquality;
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

    if (this._idEquality === false) {
      this._element.querySelector(this._cardDeleteIconSelector).classList.add(this._cardDeleteIconHiddenClass);
    }

    this._element.id = this._cardId;
    this._element.querySelector(this._cardImageSelector).src = this._link;
    this._element.querySelector(this._cardImageSelector).alt = this._name;
    this._element.querySelector(this._cardTitleSelector).textContent = this._name;
    this._element.querySelector(this._cardLikeAmountTextSelector).textContent = this._likesCounter.length;

    return this._element;
  }

  // Метод пометки понравившейся карточки
  _likeCard() {
    this._element.querySelector(this._cardLikeIconSelector).classList.toggle(this._cardLikeIconActiveClass);
  }

  // Метод прикрепления обработчиков к элементам
  _setEventListeners() {
    this._element.querySelector(this._cardLikeIconSelector).addEventListener('click', this._likeCard.bind(this));
    this._element.querySelector(this._cardDeleteIconSelector).addEventListener('click', () => {
      this._handleBasketClick();
    });
    this._element.querySelector(this._cardImageSelector).addEventListener('click', () => {
      this._handleCardClick();
    });
  }
}

export { Card };
