import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithDeletionForm } from '../components/PopupWithDeletionForm';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { selectorsAndClassesOfForm, selectorsAndClassOfCard, selectorsOfProfile } from '../utils/constants.js';
import './index.css';

// Находим элементы в DOM
const editButton = document.querySelector('.profile__edit-button');
const editAvatarButton = document.querySelector('.profile__avatar-edit-button');
const addButton = document.querySelector('.profile__add-button');
const editProfile = document.querySelector('.popup_type_profile');
const editAvatar = document.querySelector('.popup_type_avatar');
const addCards = document.querySelector('.popup_type_cards');
const nameInput = document.querySelector('.popup__field_el_name');
const jobInput = document.querySelector('.popup__field_el_profession');

// Создаём объект userInfo класса UserInfo
const userInfo = new UserInfo(selectorsOfProfile);

// Объявляем переменные currentUserId, idEquality, cardsRenderer, card, newCardFromForm
let currentUserId, idEquality, cardsRenderer, card, newCardFromForm;
// Объявляем переменную mineCardlikedProperty со значением false по умолчанию
let likedProperty = false;

// Создаём объект api класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: 'fec7b8f9-403f-4d91-ad40-57682e4afbf3',
    'Content-Type': 'application/json'
  }
});
// Загружаем информацию о пользователе
api.getUserInfo()
  .then((initialUserInfo) => {
    userInfo.setUserInfo(initialUserInfo);
    userInfo.setUserAvatar(initialUserInfo.avatar);

    // Присваиваем переменной currentUserId id текущего пользователя
    currentUserId = initialUserInfo._id;
  })
  .catch((err) => {
    console.log(err);
  });

// Создаём объект editProfileValidator класса FormValidator
const editProfileValidator = new FormValidator(selectorsAndClassesOfForm, editProfile);
// Активируем валидацию формы редактирования профиля
editProfileValidator.enableValidation();
// Создаём объект addCardsValidator класса FormValidator
const addCardsValidator = new FormValidator(selectorsAndClassesOfForm, addCards);
// Активируем валидацию формы добавления карточки
addCardsValidator.enableValidation();
// Создаём объект editAvatarValidator класса FormValidator
const editAvatarValidator = new FormValidator(selectorsAndClassesOfForm, editAvatar);
// Активируем валидацию формы редактирования аватара
editAvatarValidator.enableValidation();

// Создаём объект imagePopup класса PopupWithImage
const imagePopup = new PopupWithImage('.popup_type_images', {
  popupImageSelector: '.popup__image',
  popupCaptionSelector: '.popup__caption'
});
imagePopup.setEventListeners();

// Создаём объект imageDeletionPopup класса PopupWithDeletionForm
const imageDeletionPopup = new PopupWithDeletionForm('.popup_type_card-deletion', {
  handleSubmitForm: cardId => {
    // Удаляем карточку
    api.deleteCard(cardId)
      .then(() => {
        // Удаляем свою карточку из разметки
        card.deleteCard(cardId);

        imageDeletionPopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// Сравниваем id текущего пользователя с id владельца карточки
function checkIdEquality(itemOwnerId) {
  idEquality = (currentUserId === itemOwnerId) ? true : false;
}

// Функция постановки "лайка" карточке
function handleCardLike(cardId, cardLikeAmountElement, cardLikeElement) {
  cardLikeElement.disabled = true;
  api.putCardLike(cardId)
    .then((cardObject) => {
      cardLikeAmountElement.textContent = cardObject.likes.length;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardLikeElement.disabled = false;
    });
}

// Функция снятия "лайка" с карточки
function handleCardDislike(cardId, cardLikeAmountElement, cardLikeElement) {
  cardLikeElement.disabled = true;
  api.deleteCardLike(cardId)
    .then((cardObject) => {
      cardLikeAmountElement.textContent = cardObject.likes.length;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardLikeElement.disabled = false;
    });
}

function createSectionObject(initialCards) {
  // Создаём объект cardsRenderer класса Section
  cardsRenderer = new Section({
    items: initialCards,
    renderer: initialCardObject => {
      // Вызываем функцию сравнения id текущего пользователя с id владельца карточки
      checkIdEquality(initialCardObject.owner._id);

      // Создаём объект card класса Card
      card = new Card(initialCardObject, '#cards-list__item-template', {
        handleCardClick: () => imagePopup.open(initialCardObject),
        handleHeartClick: (cardId, cardLikeAmountElement, cardLikeElement, currentLikedProperty) => {
          currentLikedProperty ? handleCardLike(cardId, cardLikeAmountElement, cardLikeElement) : handleCardDislike(cardId, cardLikeAmountElement, cardLikeElement);
        },
        handleBasketClick: () => imageDeletionPopup.open(initialCardObject._id)
      }, selectorsAndClassOfCard, idEquality, likedProperty);

      const cardElement = card.generateCard();

      // Возвращаем новую карточку
      return cardElement;
    }
  }, '.cards-list');
}

// Загружаем начальные карточки
api.getInitialCards()
  .then((initialCards) => {
    // Вызываем функцию создания объекта класса Section
    createSectionObject(initialCards);
    // Отрисовываем каждый отдельный элемент
    cardsRenderer.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

// Создаём объект editProfilePopup класса PopupWithForm
const editProfilePopup = new PopupWithForm('.popup_type_profile', {
  handleSubmitForm: (inputListValuesObject) => {
    // Редактируем профиль
    api.patchProfileInfo(inputListValuesObject)
      .then((newUserInfo) => {
        // Принимаем новые данные пользователя и добавляем их на страницу
        userInfo.setUserInfo(newUserInfo);

        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
editProfilePopup.setEventListeners();

// Создаём объект addCardsPopup класса PopupWithForm
const addCardsPopup = new PopupWithForm('.popup_type_cards', {
  handleSubmitForm: (inputListValuesObject) => {
    // Добавляем новую карточку
    api.postNewCard(inputListValuesObject)
      .then((newCardObject) => {
        // Вызываем функцию сравнения id текущего пользователя с id владельца карточки
        checkIdEquality(newCardObject.owner._id);

        // Создаём объект newCardFromForm класса Card
        newCardFromForm = new Card(newCardObject, '#cards-list__item-template', {
          handleCardClick: () => imagePopup.open(newCardObject),
          handleHeartClick: (cardId, cardLikeAmountElement, cardLikeElement, currentLikedProperty) => {
            currentLikedProperty ? handleCardLike(cardId, cardLikeAmountElement, cardLikeElement) : handleCardDislike(cardId, cardLikeAmountElement, cardLikeElement);
          },
          handleBasketClick: () => imageDeletionPopup.open(newCardObject._id)
        }, selectorsAndClassOfCard, idEquality, likedProperty);

        const newCardFromFormElement = newCardFromForm.generateCard();

        cardsRenderer.addItem(newCardFromFormElement);

        addCardsPopup.close();

        // Возвращаем новую карточку
        return newCardFromFormElement;
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
addCardsPopup.setEventListeners();


// Создаём объект editProfilePopup класса PopupWithForm
const editAvatarPopup = new PopupWithForm('.popup_type_avatar', {
  handleSubmitForm: (inputListValuesObject) => {
    // Редактируем профиль
    api.patchAvatar(inputListValuesObject)
      .then((editedAvatar) => {
        // Принимаем новый аватар пользователя и добавляем его на страницу
        userInfo.setUserAvatar(editedAvatar.avatar);

        editAvatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
editAvatarPopup.setEventListeners();


// Прикрепляем обработчики к элементам
editButton.addEventListener('click', () => {
  // Очищаем валидацию формы
  editProfileValidator.resetValidation();
  // Открываем попап формы редактирования профиля
  editProfilePopup.open();

  // Вкладываем в поля формы редактирования профиля значения по умолчанию
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
});
editAvatarButton.addEventListener('click', () => {
  // Очищаем валидацию формы
  editAvatarValidator.resetValidation();
  // Открываем попап формы добавления карточки
  editAvatarPopup.open();
});
addButton.addEventListener('click', () => {
  // Очищаем валидацию формы
  addCardsValidator.resetValidation();
  // Открываем попап формы добавления карточки
  addCardsPopup.open();
});
