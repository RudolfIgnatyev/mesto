class Api {
  constructor({ baseUrl, headers = {} }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // Публичный метод загрузки с сервера информации о пользователе
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // Если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  // Публичный метод загрузки с сервера начальных карточек
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // Если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
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
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // Если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
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
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // Если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  // Публичный метод удаления из сервера карточки
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // Если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  // Публичный метод создания пометки понравившейся карточки на сервере
  putCardLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // Если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  // Публичный метод удаления пометки понравившейся карточки на сервере
  deleteCardLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // Если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
}

export { Api };
