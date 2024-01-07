import { Movie } from '../../types';

export const getMoviesGenres = (movies: Movie[]) => [{id: -1, title: 'All genres'}].concat(
  Array.from(movies.reduce((acc, film) => acc.add(film.genre), new Set<string>()))
    .map((t, index) => ({
      id: index,
      title: t
    })));
