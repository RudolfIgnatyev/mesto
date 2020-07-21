// Объект настроек с селекторами и классами формы
const selectorsAndClassesOfForm = {
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
};

// Объект настроек с селекторами и классом карточки
const selectorsAndClassOfCard = {
  cardImageSelector: '.cards-list__image',
  cardTitleSelector: '.cards-list__title',
  cardLikeIconSelector: '.cards-list__like-icon',
  cardLikeIconActiveClass: 'cards-list__like-icon_active',
  cardLikeAmountTextSelector: '.cards-list__like-amount-text',
  cardDeleteIconSelector: '.cards-list__delete-icon'
};

// Объект настроек с селекторами и классом карточки
const selectorsOfProfile = {
  profileNameSelector: '.profile__title',
  profileJobSelector: '.profile__subtitle',
  profileAvatarSelector: '.profile__avatar'
};

export { selectorsAndClassesOfForm, selectorsAndClassOfCard, selectorsOfProfile };
