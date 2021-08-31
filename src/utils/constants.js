const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const successful = 'Успешно';
const successfulRegistration = 'Вы успешно зарегистрировались';
const successfulLogin = 'Вы успешно вошли';

const removedFromCollection = 'Удалено из коллекции';
const addedToCollection = 'Добавлено в коллекцию';

const noSavedMovies = 'В вашей коллекции нет сохраненных фильмов';
const requestNotFound = 'Ничего не найдено';

const favoritesIcon = {
  add: {
    active: "favorite-icon-active",
    disabled: "favorite-icon-disabled",
    title: "Добавить в избранное"
  },
  remove: {
    active: "favorite-icon-remove",
    disabled: "favorite-icon-remove",
    title: "Удалить из избранного"
  }
};

export {
  emailRegExp,
  favoritesIcon,

  successful,
  successfulRegistration,
  successfulLogin,

  removedFromCollection,
  addedToCollection,

  noSavedMovies,
  requestNotFound
}