export enum EAppRoute {
  MAIN = '/',
  SIGNIN = '/login',
  MYLIST = '/my-list',
  FILM = '/films/:id',
  FILMS = '/films',
  ADDREVIEW = '/films/:id/review',
  PLAYER = '/player/:id',
}

export enum EAuthorizationStatus {
  AUTH = 'AUTH',
  NOAUTH = 'NO_AUTH',
  UNKNOWN= 'UNKNOWN',
}

export const MOVIES_BY_PAGE = 8;

export enum EAPIRoute {
  Movies = '/films'
}
