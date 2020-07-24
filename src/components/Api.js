class Api {
  constructor({ baseUrl, headers = {} }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // Метод проверки промиса с его разрешением или отклонением в зависимости от ответа сервера
  _checkPromise(res) {
    if (res.ok) {
      return res.json();
    }

    // Если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Публичный метод загрузки с сервера информации о пользователе
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => this._checkPromise(res));
  }

  // Публичный метод загрузки с сервера начальных карточек
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => this._checkPromise(res));
  }

  // Публичный метод редактирования профиля с сохранением данных на сервере
  patchProfileInfo(profileNewInfo) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: profileNewInfo.popup__field_el_name,
        about: profileNewInfo.popup__field_el_profession
      })
    })
      .then(res => this._checkPromise(res));
  }

  // Публичный метод добавления на сервер новой карточки
  postNewCard(item) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    })
      .then(res => this._checkPromise(res));
  }

  // Публичный метод удаления из сервера карточки
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => this._checkPromise(res));
  }

  // Публичный метод создания пометки понравившейся карточки на сервере
  putCardLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(res => this._checkPromise(res));
  }

  // Публичный метод удаления пометки понравившейся карточки на сервере
  deleteCardLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => this._checkPromise(res));
  }

  // Публичный метод изменения на сервере аватара пользователя
  patchAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(avatar)
    })
      .then(res => this._checkPromise(res));
  }
}

export { Api };
