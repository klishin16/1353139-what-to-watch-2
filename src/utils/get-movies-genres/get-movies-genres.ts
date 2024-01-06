import { IMovie } from '../../types';

export const getMoviesGenres = (movies: IMovie[]) => [{id: -1, title: 'All genres'}].concat(
  Array.from(movies.reduce((acc, film) => acc.add(film.genre), new Set<string>()))
    .map((t, index) => ({
      id: index,
      title: t
    })));
