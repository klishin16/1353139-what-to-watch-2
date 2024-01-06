import { IGenre, IMovie, IMovieDetail, IReview, IState } from '../types';
import * as faker from 'faker';
import { Action } from '@reduxjs/toolkit';
import { EAuthorizationStatus } from '../constants.ts';

export const makeFakeMovie = (): IMovie => ({
  id: faker.datatype.string(5),
  name: faker.name.firstName(),
  genre: faker.music.genre(),
  previewImage: faker.internet.url(),
  previewVideoLink: faker.internet.url(),
});

export const makeFakeDetailMovie = (): IMovieDetail => ({
  id: faker.datatype.string(5),
  name: faker.name.firstName(),
  genre: faker.music.genre(),
  backgroundImage: faker.image.imageUrl(),
  description: faker.name.title(),
  director: faker.name.firstName(),
  rating: faker.datatype.number(),
  posterImage: faker.image.imageUrl(),
  released: faker.datatype.number(9999),
  runTime: faker.datatype.string(),
  scoresCount: faker.datatype.number(100),
  starring: [faker.name.title(), faker.name.title(), faker.name.title()],
  videoLink: faker.image.imageUrl()
});

export const makeFakeMovies = (n = 5) => new Array(n).fill(null).map(() => makeFakeMovie());

export const makeFakeReview = (): IReview => ({
  id: faker.datatype.string(5),
  rating: faker.datatype.number(10),
  comment: faker.datatype.string(50),
  date: faker.datatype.number(),
  user: faker.datatype.string()
});

export const makeFakeReviews = (n = 5) => new Array(n).fill(null).map(() => makeFakeReview());

export const makeFakeGenre = (): IGenre => ({
  id: faker.datatype.number(),
  title: faker.name.title()
});

export const makeFakeGenres = (n = 5) => new Array(n).fill(null).map(() => makeFakeGenre());

export const makeFakeStore = (initialState?: Partial<IState>): IState => ({
  auth: { authorizationStatus: EAuthorizationStatus.NOAUTH, user: null },
  movies: {
    movies: [],
    genres: makeFakeGenres(),
    selectedGenre: makeFakeGenre(),
    totalMovies: 5,
    loadedMovies: 5,
    allMovies: makeFakeMovies(),
    favoriteMovies: makeFakeMovies(3),
    isLoading: false
  },
  errors: {
    error: null
  },
  ...initialState ?? {},
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
