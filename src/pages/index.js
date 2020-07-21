import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { selectorsAndClassesOfForm, selectorsAndClassOfCard, selectorsOfProfile } from '../utils/constants.js';
import './index.css';

// Находим элементы в DOM
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editProfile = document.querySelector('.popup_type_profile');
const addCards = document.querySelector('.popup_type_cards');
const nameInput = document.querySelector('.popup__field_el_name');
const jobInput = document.querySelector('.popup__field_el_profession');

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
  .then((result) => {
    document.querySelector(selectorsOfProfile.profileAvatarSelector).src = result.avatar;
    document.querySelector(selectorsOfProfile.profileAvatarSelector).alt = result.name;
    document.querySelector(selectorsOfProfile.profileNameSelector).textContent = result.name;
    document.querySelector(selectorsOfProfile.profileJobSelector).textContent = result.about;
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

// Создаём объект imagePopup класса PopupWithImage
const imagePopup = new PopupWithImage('.popup_type_images', {
  popupImageSelector: '.popup__image',
  popupCaptionSelector: '.popup__caption'
});
imagePopup.setEventListeners();

// Объявляем переменную cardsRenderer
let cardsRenderer;

function createCardObject(initialCards) {
  // Создаём объект cardsRenderer класса Section
  cardsRenderer = new Section({
    items: initialCards,
    renderer: item => {
      // Создаём объект card класса Card
      const card = new Card(item, '#cards-list__item-template', {
        handleCardClick: () => imagePopup.open(item)
      }, selectorsAndClassOfCard);
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
    createCardObject(initialCards);
    // Отрисовываем каждый отдельный элемент
    cardsRenderer.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

// Создаём объект userInfo класса UserInfo
const userInfo = new UserInfo(selectorsOfProfile);

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
        // Создаём объект newCardFromForm класса Card
        const newCardFromForm = new Card(newCardObject, '#cards-list__item-template', {
          handleCardClick: () => imagePopup.open(newCardObject)
        }, selectorsAndClassOfCard);
        const newCardFromFormElement = newCardFromForm.generateCard();

        cardsRenderer.addItem(newCardFromFormElement, false);
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
addButton.addEventListener('click', () => {
  // Очищаем валидацию формы
  addCardsValidator.resetValidation();
  // Открываем попап формы добавления карточки
  addCardsPopup.open();
});

