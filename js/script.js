// Находим элементы в DOM
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editProfile = document.querySelector('.popup_type_profile');
const addCards = document.querySelector('.popup_type_cards');
const zoomImages = document.querySelector('.popup_type_images');
const closeIconProfile = document.querySelector('.popup__close-icon_type_profile');
const closeIconCards = document.querySelector('.popup__close-icon_type_cards');
const closeIconImages = document.querySelectorAll('.popup__close-icon_type_images');
const formProfile = document.querySelector('.popup__container_type_profile');
const formCards = document.querySelector('.popup__container_type_cards');
const popupTitle = document.querySelector('.popup__title');
const saveButton = document.querySelector('.popup__save-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__field_el_name');
const jobInput = document.querySelector('.popup__field_el_profession');
const placeInput = document.querySelector('.popup__field_el_place');
const linkInput = document.querySelector('.popup__field_el_link');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
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
function showPopup(modifier) {
  modifier.classList.add('popup_opened');

  if (modifier === editProfile) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  }
}

function hidePopup(modifier) {
  modifier.classList.remove('popup_opened');
}

// Функция управления (добавления, «лайка» и удаления) карточками
function manageCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  // Находим элементы внутри cardElement
  const cardTitle = cardElement.querySelector('.cards-list__title');
  const cardImage = cardElement.querySelector('.cards-list__image');
  const cardsListImage = cardElement.querySelectorAll('.cards-list__image');
  const cardLike = cardElement.querySelector('.cards-list__like-icon');
  const cardDelete = cardElement.querySelectorAll('.cards-list__delete-icon');

  // Добавляем текст содержимому тега заголовка
  cardTitle.textContent = name;
  // Добавляем атрибутам тега картинки значения
  cardImage.src = link;
  cardImage.alt = name;

  // Прикрепляем обработчик к кнопке «нравится»
  cardLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards-list__like-icon_active');
  });

  // Прикрепляем обработчик к кнопке удаления карточки
  cardDelete.forEach(function (item) {
    item.addEventListener('click', function () {
      item.parentNode.parentNode.removeChild(item.parentNode);
    })
  });

  // Открываем картинку
  cardsListImage.forEach(function (item) {
    item.addEventListener('click', function () {
      showPopup(zoomImages);

      // Добавляем атрибутам тега картинки значения
      popupImage.src = item.src;
      popupImage.alt = item.alt;
      // Добавляем текст содержимому тега подписи картинки
      popupCaption.textContent = name;
    })
  });

  // Закрываем картинку
  closeIconImages.forEach(function (item) {
    item.addEventListener('click', function () {
      hidePopup(zoomImages);
    })
  });

  // Добавляем новую карточку в начало контейнера
  cardsList.prepend(cardElement);
}

// «Передаём» базовые карточки функции добавления новой карточки
initialCards.forEach(function (item) {
  manageCard(item.name, item.link);
});

// Обработчик «отправки» формы добавления карточки
function formCardsSubmitHandler(evt) {
  // Отменяем стандартную отправку формы
  evt.preventDefault();
  // Вызываем функцию добавления новой карточки
  manageCard(placeInput.value, linkInput.value);
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
editButton.addEventListener('click', () => showPopup(editProfile));
addButton.addEventListener('click', () => showPopup(addCards));
closeIconProfile.addEventListener('click', () => hidePopup(editProfile));
closeIconCards.addEventListener('click', () => hidePopup(addCards));
formProfile.addEventListener('submit', formProfileSubmitHandler);
formCards.addEventListener('submit', formCardsSubmitHandler);
