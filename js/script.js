const editButton = document.querySelector('.profile__edit-button');
const editProfile = document.querySelector('.popup');
const closeIcon = document.querySelector('.popup__close-icon');
const formElement = document.querySelector('.popup__container');
const saveButton = document.querySelector('.popup__save-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__field_el_name');
const jobInput = document.querySelector('.popup__field_el_profession');

function showPopup() {
  editProfile.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;
  profileTitle.textContent = newName;
  profileSubtitle.textContent = newJob;
}

function hidePopup() {
  editProfile.classList.remove('popup_opened');
  nameInput.value = '';
  jobInput.value = '';
}

editButton.addEventListener('click', showPopup);
formElement.addEventListener('submit', formSubmitHandler);
closeIcon.addEventListener('click', hidePopup);
