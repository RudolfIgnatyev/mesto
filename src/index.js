import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import { Section } from './components/Section.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';
import { initialCards, selectorsAndClasses } from './utils/constants.js';
import './pages/index.css';

// Находим элементы в DOM
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editProfile = document.querySelector('.popup_type_profile');
const addCards = document.querySelector('.popup_type_cards');
const nameInput = document.querySelector('.popup__field_el_name');
const jobInput = document.querySelector('.popup__field_el_profession');

// Создаём объект editProfileValidator класса FormValidator
const editProfileValidator = new FormValidator(selectorsAndClasses, editProfile);
// Активируем валидацию формы редактирования профиля
editProfileValidator.enableValidation();
// Создаём объект addCardsValidator класса FormValidator
const addCardsValidator = new FormValidator(selectorsAndClasses, addCards);
// Активируем валидацию формы добавления карточки
addCardsValidator.enableValidation();

// Создаём объект imagePopup класса PopupWithImage
const imagePopup = new PopupWithImage('.popup_type_images');
imagePopup.setEventListeners();

// Создаём объект cardsRenderer класса Section
const cardsRenderer = new Section({
  items: initialCards,
  renderer: item => {

    const card = new Card(item, '#cards-list__item-template', {
      handleCardClick: () => imagePopup.open(item)
    });
    const cardElement = card.generateCard();

    // Возвращаем новую карточку
    return cardElement;
  }
}, '.cards-list');
// Отрисовываем каждый отдельный элемент
cardsRenderer.renderItems();

// Создаём объект userInfo класса UserInfo
const userInfo = new UserInfo({
  profileNameSelector: '.profile__title',
  profileJobSelector: '.profile__subtitle'
});

// Создаём объект editProfilePopup класса PopupWithForm
const editProfilePopup = new PopupWithForm('.popup_type_profile', {
  handleSubmitForm: (inputListValuesObject) => {

    // Принимаем новые данные пользователя и добавляем их на страницу
    userInfo.setUserInfo(inputListValuesObject);
    editProfilePopup.close();
  }
});
editProfilePopup.setEventListeners();

// Создаём объект addCardsPopup класса PopupWithForm
const addCardsPopup = new PopupWithForm('.popup_type_cards', {
  handleSubmitForm: (inputListValuesObject) => {

    const newCardFromForm = new Card(inputListValuesObject, '#cards-list__item-template', {
      handleCardClick: () => imagePopup.open(inputListValuesObject)
    });
    const newCardFromFormElement = newCardFromForm.generateCard();

    cardsRenderer.addItem(newCardFromFormElement);
    addCardsPopup.close();

    // Возвращаем новую карточку
    return newCardFromFormElement;
  }
});
addCardsPopup.setEventListeners();

// Обработчик клика на оверлей
function handleOverlayClicked(evt) {
  if (evt.target.classList.contains('popup_type_images')) {
    // Скрываем попап карточки
    imagePopup.close();
  }
  if (evt.target.classList.contains('popup_type_profile')) {
    // Скрываем попап формы редактирования профиля
    editProfilePopup.close();
  }
  if (evt.target.classList.contains('popup_type_cards')) {
    // Скрываем попап формы добавления карточки
    addCardsPopup.close();
  }
}

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
document.addEventListener('click', handleOverlayClicked);
