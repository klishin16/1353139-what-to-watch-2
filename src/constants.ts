export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  Films = '/films',
  AddReview = '/films/:id/review',
  Player = '/player',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'auth',
  NoAuth = 'no_auth',
  Unknown = 'unknown',
}

export const MOVIES_BY_PAGE = 8;
export const AUTH_TOKEN_KEY_NAME = 'what-to-watch-token';
export const TIMEOUT_SHOW_ERROR = 2000;

export enum ApiRoute {
  Movies = '/films',
  Comments = '/comments',
  FavoriteMovies = '/favorite',
  Promo = '/promo',
  Login = '/login',
  Logout = '/logout',
}
