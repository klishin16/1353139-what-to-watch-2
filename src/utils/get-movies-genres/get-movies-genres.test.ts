import { describe, expect } from 'vitest';
import { IMovie } from '../../types';
import { makeFakeMovie } from '../mocks.ts';
import { getMoviesGenres } from './get-movies-genres.ts';

describe('Function: getMoviesGenres', () => {
  it('should return genres', () => {
    const movies: IMovie[] = [
      {
        ...makeFakeMovie(),
        genre: 'Comedy'
      },
      {
        ...makeFakeMovie(),
        genre: 'Fantasy'
      }
    ];

    const result = getMoviesGenres(movies);

    expect(result).toEqual([{ id: -1, title: 'All genres' }, { id: 0, title: 'Comedy' }, { id: 1, title: 'Fantasy' }]);
  });

  it('should return genres without duplicates', () => {
    const movies: IMovie[] = [
      {
        ...makeFakeMovie(),
        genre: 'Comedy'
      },
      {
        ...makeFakeMovie(),
        genre: 'Fantasy'
      },
      {
        ...makeFakeMovie(),
        genre: 'Fantasy'
      }
    ];

    const result = getMoviesGenres(movies);

    expect(result).toEqual([{ id: -1, title: 'All genres' }, { id: 0, title: 'Comedy' }, { id: 1, title: 'Fantasy' }]);
  });

  it('should return "All genres"', () => {
    const movies: IMovie[] = [];

    const result = getMoviesGenres(movies);

    expect(result).toEqual([{ id: -1, title: 'All genres' }]);
  });
});
