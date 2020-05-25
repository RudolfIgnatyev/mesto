// Находим элементы в DOM
const editButton = document.querySelector('.profile__edit-button');
const editProfile = document.querySelector('.popup');
const closeIcon = document.querySelector('.popup__close-icon');
const formElement = document.querySelector('.popup__container');
const saveButton = document.querySelector('.popup__save-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__field_el_name');
const jobInput = document.querySelector('.popup__field_el_profession');
const cardsList = document.querySelector('.cards-list');
const cardTemplate = document.querySelector('#cards-list__item-template').content;
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
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
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

// Функция показа попапа
function showPopup() {
  editProfile.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

// Функция скрытия попапа
function hidePopup() {
  editProfile.classList.remove('popup_opened');
}

// Обработчик «отправки» формы
function formSubmitHandler(evt) {
  // Отменяем стандартную отправку формы
  evt.preventDefault();
  // Получаем значение полей из свойства value
  const newName = nameInput.value;
  const newJob = jobInput.value;
  // Вставляем новые значения
  profileTitle.textContent = newName;
  profileSubtitle.textContent = newJob;
  // Вызываем функцию скрытия попапа
  hidePopup();
}

// Функция добавления новой карточки
function addCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.cards-list__title').textContent = name;
  cardElement.querySelector('.cards-list__image').src = link;
  cardElement.querySelector('.cards-list__image').alt = name;
  cardsList.append(cardElement);
}

// Перебирем элементы массива базовых карточек
initialCards.forEach(function (item) {
  addCard(item.name, item.link);
});

// Прикрепляем обработчики к элементам
editButton.addEventListener('click', showPopup);
closeIcon.addEventListener('click', hidePopup);
formElement.addEventListener('submit', formSubmitHandler);
