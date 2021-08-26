class Auth {
  constructor(url) {
    this._BASE_URL = url;
  }

  register = (name, email, password) => {
    return fetch(`${this._BASE_URL}signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
    .then(res => {
      if (res.status === 400) {
        return Promise.reject('Некорректно заполнено одно из полей');
      } else if (res.status === 409) {
        return Promise.reject('Пользователь с таким email уже зарегистрирован');
      } else {
        return res.json()
      }
    })
  }

  login = (email, password) => {
    return fetch(`${this._BASE_URL}signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(res => {
      if (res.status === 400) {
        return Promise.reject('Некорректно заполнено одно из полей');
      } else if (res.status === 401) {
        return Promise.reject('Неправильные почта или пароль');
      } else {
        return res.json();
      }
    })
  }

  getUserData = (token) => {
    return fetch(`${this._BASE_URL}users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(res => {
      if(res.status === 400) {
        return Promise.reject('Токен не передан или передан не в том формате');
      } else if(res.status === 401) {
        return Promise.reject('Переданный токен некорректен');
      } else {
        return res.json();
      }
    })
  }
}

const auth = new Auth('https://api.gks.movies.nomoredomains.monster/');

export default auth;