import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGenre, IMovie } from '../types';
import { MOVIES_BY_PAGE } from '../constants.ts';
import { fetchAllMoviesAction } from './api-actions.ts';

interface IMoviesSliceState {
  genres: IGenre[];
  selectedGenre: IGenre;
  allMovies: IMovie[];
  movies: IMovie[];
  totalMovies: number;
  loadedMovies: number;
  isLoading: boolean;
}

const initialState: IMoviesSliceState = {
  genres: [],
  selectedGenre: {id: -1, title: 'All genres'},
  allMovies: [],
  movies: [],
  totalMovies: 0,
  loadedMovies: 0,
  isLoading: true,
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<IGenre>) => {
      state.selectedGenre = action.payload;
    },
    getMovies: (state) => {
      state.movies = state.selectedGenre.title === 'All genres' ? state.allMovies : state.allMovies.filter((movie) => movie.genre === state.selectedGenre.title);
      state.totalMovies = state.movies.length;
      state.loadedMovies = Math.min(state.totalMovies, MOVIES_BY_PAGE);
    },
    showMoreMovies: (state) => {
      state.loadedMovies += MOVIES_BY_PAGE;
    },
    setAllMovies: (state, action: PayloadAction<IMovie[]>) => {
      state.allMovies = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMoviesAction.fulfilled, (state, action) => {
        state.genres = [{id: -1, title: 'All genres'}].concat(
          Array.from(action.payload.reduce((acc, film) => acc.add(film.genre), new Set<string>()))
            .map((t, index) => ({
              id: index,
              title: t
            })));
      });
  }
});

export const {setAllMovies, getMovies, showMoreMovies, setLoading, changeGenre} = moviesSlice.actions;
