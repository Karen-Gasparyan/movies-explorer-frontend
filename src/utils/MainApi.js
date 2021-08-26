class MainApi {
  constructor(url) {
    this._BASE_URL = url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  };

  _headerHeandler(token) {
    return {
      "Authorization" : `Bearer ${token}`,
      "Content-Type": "application/json; charset=UTF-8"
    };
  }

  getSavedMovies(token) {
    return fetch(`${this._BASE_URL}movies`, {
      method: 'GET',
      headers: this._headerHeandler(token)
    })
    .then(this._checkResponse)
  }

  getUserInfo(token) {
    return fetch(`${this._BASE_URL}users/me`, {
      method: 'GET',
      headers: this._headerHeandler(token)
    })
    .then(this._checkResponse)
  };

  setSavedMovies(token, movieData) {
    const {
      country,
      director,
      duration,
      year,
      description,
      image: {url, formats: {thumbnail}},
      trailerLink,
      id,
      nameRU,
      nameEN
    } = movieData;

    const movie = {
      country,
      director,
      duration,
      year,
      description,
      image: `https://api.nomoreparties.co${url}`,
      trailer: trailerLink,
      thumbnail: `https://api.nomoreparties.co${thumbnail.url}`,
      movieId: id,
      nameRU,
      nameEN
    };

    return fetch(`${this._BASE_URL}movies`, {
      method: 'POST',
      headers: this._headerHeandler(token),
      body: JSON.stringify(movie)
    })
    .then(this._checkResponse)
  }

  setUserInfo(token, name, email) {
    return fetch(`${this._BASE_URL}users/me`, {
      method: 'PATCH',
      headers: this._headerHeandler(token),
      body: JSON.stringify({ name, email })
    })
    .then(this._checkResponse)
  };
}

const mainApi = new MainApi('https://api.gks.movies.nomoredomains.monster/');

export default mainApi;