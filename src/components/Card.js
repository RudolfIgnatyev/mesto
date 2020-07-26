class Card {
  constructor(data, cardSelector, { handleCardClick, handleHeartClick, handleBasketClick }, selectorsAndClass, idEquality, likedProperty, currentUserId) {
    this._name = data.name;
    this._link = data.link;
    this._likesCounter = data.likes;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleHeartClick = handleHeartClick;
    this._handleBasketClick = handleBasketClick;
    this._cardImageSelector = selectorsAndClass.cardImageSelector;
    this._cardTitleSelector = selectorsAndClass.cardTitleSelector;
    this._cardLikeIconSelector = selectorsAndClass.cardLikeIconSelector;
    this._cardLikeIconActiveClass = selectorsAndClass.cardLikeIconActiveClass;
    this._cardLikeAmountTextSelector = selectorsAndClass.cardLikeAmountTextSelector;
    this._cardDeleteIconSelector = selectorsAndClass.cardDeleteIconSelector;
    this._cardDeleteIconHiddenClass = selectorsAndClass.cardDeleteIconHiddenClass;
    this._idEquality = idEquality;
    this._likedProperty = likedProperty;
    this._currentUserId = currentUserId;
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

    this._element.id = this._cardId;
    this._element.querySelector(this._cardImageSelector).src = this._link;
    this._element.querySelector(this._cardImageSelector).alt = this._name;
    this._element.querySelector(this._cardTitleSelector).textContent = this._name;
    this._element.querySelector(this._cardLikeAmountTextSelector).textContent = this._likesCounter.length;

    // Скрываем для пользователя элемент корзинки карточки, если он не создатель карточки
    if (this._idEquality === false) {
      this._element.querySelector(this._cardDeleteIconSelector).classList.add(this._cardDeleteIconHiddenClass);
    }
    // Проверяем наличие "лайка" у карточки после загрузки страницы для автоматической пометки понравившейся карточки в положительном случае
    for (let i = 0; i < this._likesCounter.length; i++) {
      if (this._likesCounter[i]._id === this._currentUserId) {
        this._element.querySelector(this._cardLikeIconSelector).classList.toggle(this._cardLikeIconActiveClass);
      }
    }

    return this._element;
  }

  // Метод создания и удаления пометки понравившейся карточки
  _likeCard() {
    this._likedProperty = (!this._element.querySelector(this._cardLikeIconSelector).classList.contains('cards-list__like-icon_active')) ? true : false;

    this._handleHeartClick(this._element.id, this._element.querySelector(this._cardLikeAmountTextSelector), this._element.querySelector(this._cardLikeIconSelector), this._likedProperty);
  }

  // Публичный метод удаления карточки
  deleteCard(cardId) {
    const myCard = document.getElementById(cardId);
    myCard.remove();

    myCard.querySelector(this._cardLikeIconSelector).removeEventListener('click', this._likeCard.bind(this));
    myCard.querySelector(this._cardDeleteIconSelector).removeEventListener('click', () => {
      this._handleBasketClick();
    });
    myCard.querySelector(this._cardImageSelector).removeEventListener('click', () => {
      this._handleCardClick();
    });
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
