class MoviesApi {
  constructor(url) {
    this._BASE_URL = url;
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  };

  getAllMovies() {
    return fetch(`${this._BASE_URL}beatfilm-movies`)
    .then(this._checkResponse)
  }
}

const moviesApi = new MoviesApi('https://api.nomoreparties.co/');

export default moviesApi;