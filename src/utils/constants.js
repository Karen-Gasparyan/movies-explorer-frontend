const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
  favoritesIcon,
  emailRegExp
}