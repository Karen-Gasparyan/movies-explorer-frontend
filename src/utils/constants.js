const EMAIL_RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SUCCESSFUL = 'Успешно';
const SUCCESSFUL_REGISTRATION = 'Вы успешно зарегистрировались';
const SUCCESSFUL_LOGIN = 'Вы успешно вошли';

const PASSWORD_MESSAGE_AUTH = 'Пароль должен содержать не менее 8 символов';
const PASSWORD_MINIMUM_VALUE = 8;
const INCORRECT_EMAIL = 'Некорректный email';
const INCORRECT_USER_NAME = 'Имя не может содержать менее 2 символов';
const AUTHORIZATION_REQUIRED = 'Необходима авторизация';

const WELCOME_MESSAGE = (name) => {
  return `Добро пожаловать ${name}`;
};

const REMOVED_FROM_COLLECTION = 'Удалено из коллекции';
const ADDED_TO_COLLECTION = 'Добавлено в коллекцию';

const NO_SAVED_MOVIES = 'В вашей коллекции нет сохраненных фильмов';
const NO_SAVED_SHORT_MOVIES = 'В вашей коллекции нет сохраненных короткометражных фильмов';
const REQUEST_NOT_FOUND = 'Ничего не найдено';

const MOBILE_CARDS_VALUE = 5;
const TABLET_CARDS_VALUE = 8;
const DESCTOP_CARDS_VALUE = 12;

const SET_MOBILE_CARDS_VALUE = 2;
const SET_TABLET_CARDS_VALUE = 2;
const SET_DESCTOP_CARDS_VALUE = 3;

const INITIAL_CARDS_SIZE = 0;
const MOBILE_CARDS_SIZE = 320;
const TABLET_CARDS_SIZE = 768;
const DESCTOP_CARDS_SIZE = 1280;

const SHORT_MOVIE_TIME_LIMIT = 40;

const FAVORITES_ICON = {
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
  EMAIL_RegExp,
  SUCCESSFUL,
  SUCCESSFUL_REGISTRATION,
  SUCCESSFUL_LOGIN,
  PASSWORD_MESSAGE_AUTH,
  PASSWORD_MINIMUM_VALUE,
  INCORRECT_EMAIL,
  INCORRECT_USER_NAME,
  AUTHORIZATION_REQUIRED,
  WELCOME_MESSAGE,
  REMOVED_FROM_COLLECTION,
  ADDED_TO_COLLECTION,
  NO_SAVED_MOVIES,
  NO_SAVED_SHORT_MOVIES,
  REQUEST_NOT_FOUND,
  MOBILE_CARDS_VALUE,
  TABLET_CARDS_VALUE,
  DESCTOP_CARDS_VALUE,
  SET_MOBILE_CARDS_VALUE,
  SET_TABLET_CARDS_VALUE,
  SET_DESCTOP_CARDS_VALUE,
  INITIAL_CARDS_SIZE,
  MOBILE_CARDS_SIZE,
  TABLET_CARDS_SIZE,
  DESCTOP_CARDS_SIZE,
  SHORT_MOVIE_TIME_LIMIT,
  FAVORITES_ICON
};