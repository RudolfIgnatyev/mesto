import { zoomImages, Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

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

// Объект настроек с селекторами и классами формы
const selectorsAndClasses = {
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
};

// Находим элементы в DOM
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editProfile = document.querySelector('.popup_type_profile');
const addCards = document.querySelector('.popup_type_cards');
const closeIconProfile = document.querySelector('.popup__close-icon_type_profile');
const closeIconCards = document.querySelector('.popup__close-icon_type_cards');
const closeIconImages = document.querySelector('.popup__close-icon_type_images');
const formProfile = document.querySelector('.popup__container_type_profile');
const formCards = document.querySelector('.popup__container_type_cards');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__field_el_name');
const jobInput = document.querySelector('.popup__field_el_profession');
const placeInput = document.querySelector('.popup__field_el_place');
const linkInput = document.querySelector('.popup__field_el_link');

// Функция добавления новой карточки в DOM
function putCardIntoDom(cardElement, item) {
  // Добавляем в DOM
  item.name === placeInput.value ? document.querySelector('.cards-list').prepend(cardElement) : document.querySelector('.cards-list').append(cardElement);
}

// Функция создания новой карточки
function newCard(item) {
  const card = new Card(item, '#cards-list__item-template');
  const cardElement = card.generateCard();

  // Вызываем функцию добавления новой карточки в DOM
  putCardIntoDom(cardElement, item);
}

initialCards.forEach(newCard);

// Функция скрытия попапа
function hidePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Обработчик клика на клавишу Escape
function handleEscapeKeyPressed(evt) {
  if (evt.key === 'Escape') {
    // Вызываем функцию скрытия попапа
    hidePopup(document.querySelector('.popup_opened'));
    // Удалям обработчик клика на клавишу
    this.removeEventListener('keydown', handleEscapeKeyPressed);
  }
}

// Обработчик клика на оверлей
function handleOverlayClicked(evt) {
  if (evt.target.classList.contains('popup')) {
    // Вызываем функцию скрытия попапа
    hidePopup(evt.target);
    // Удалям обработчик клика на оверлей
    this.removeEventListener('keydown', handleOverlayClicked);
  }
}

// Функция активации валидации формы
function activateValidation(currentForm) {
  const formValidator = new FormValidator(selectorsAndClasses, currentForm);
  formValidator.enableValidation();
}

// Функция показа попапа
function showPopup(popup) {
  popup.classList.add('popup_opened');
  // Прикрепляем обработчик клика на клавишу
  document.addEventListener('keydown', handleEscapeKeyPressed);
  // Прикрепляем обработчик клика на оверлей
  document.addEventListener('click', handleOverlayClicked);
  // Вызываем функцию активации валидации формы
  activateValidation(popup);
}

// Функция вложения в поля формы editProfile значений по умолчанию
function putEditProfileDefaultValues() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

// Обработчик «отправки» формы добавления карточки
function formCardsSubmitHandler(evt) {
  // Отменяем стандартную отправку формы
  evt.preventDefault();
  // Определяем массив из новой карточки
  const formCardsValues = {
    name: placeInput.value,
    link: linkInput.value
  };
  // Вызываем функцию добавления новой карточки в DOM
  newCard(formCardsValues);
  // Вызываем функцию скрытия попапа
  hidePopup(addCards);
}

// Обработчик «отправки» формы редактирования профиля
function formProfileSubmitHandler(evt) {
  // Отменяем стандартную отправку формы
  evt.preventDefault();
  // Получаем значение полей из свойства value
  const newName = nameInput.value;
  const newJob = jobInput.value;
  // Вставляем новые значения
  profileTitle.textContent = newName;
  profileSubtitle.textContent = newJob;
  // Вызываем функцию скрытия попапа
  hidePopup(editProfile);
}

// Прикрепляем обработчики к элементам
editButton.addEventListener('click', () => {
  showPopup(editProfile);
  putEditProfileDefaultValues();
});
addButton.addEventListener('click', () => showPopup(addCards));
closeIconProfile.addEventListener('click', () => hidePopup(editProfile));
closeIconCards.addEventListener('click', () => hidePopup(addCards));
closeIconImages.addEventListener('click', () => hidePopup(zoomImages));
formProfile.addEventListener('submit', formProfileSubmitHandler);
formCards.addEventListener('submit', formCardsSubmitHandler);
