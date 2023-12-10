export enum EAppRoute {
  MAIN = '/',
  SIGN_IN = '/login',
  MY_LIST = '/my-list',
  FILM = '/films/:id',
  FILMS = '/films',
  ADD_REVIEW = '/films/:id/review',
  PLAYER = '/player',
  NOTFOUND = '*',
}

export enum EAuthorizationStatus {
  AUTH = 'AUTH',
  NOAUTH = 'NO_AUTH',
  UNKNOWN= 'UNKNOWN',
}

export const MOVIES_BY_PAGE = 8;
export const AUTH_TOKEN_KEY_NAME = 'what-to-watch-token';
export const TIMEOUT_SHOW_ERROR = 2000;

export enum EAPIRoute {
  MOVIES = '/films',
  COMMENTS = '/comments',
  FAVORITE_MOVIES = '/favorite',
  PROMO = '/promo',
  LOGIN = '/login',
  LOGOUT = '/logout',
}
