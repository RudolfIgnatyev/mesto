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
  profileTitle.innerText = newName;
  profileSubtitle.innerText = newJob;
  // Вызываем функцию скрытия попапа
  hidePopup();
}

// Прикрепляем обработчики к элементам
editButton.addEventListener('click', showPopup);
closeIcon.addEventListener('click', hidePopup);
formElement.addEventListener('submit', formSubmitHandler);
