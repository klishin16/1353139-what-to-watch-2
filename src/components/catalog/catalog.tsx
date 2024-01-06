import { useEffect } from 'react';
import { GenresList } from '../genres-list/genres-list.tsx';
import { MoviesList } from '../movies-list/movies-list.tsx';
import { ShowMore } from '../show-more/show-more.tsx';
import { useAppDispatch, useTypedSelector } from '../../hooks/useTypedSelector.ts';
import { getMovies } from '../../store/movies/movies.slice.ts';
import { getMoviesState } from '../../store/movies/movies.selectors.ts';

const Catalog = () => {
  const dispatch = useAppDispatch();
  const { loadedMovies, totalMovies, selectedGenre, movies } = useTypedSelector(getMoviesState);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch, selectedGenre]);


  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <GenresList />

      <MoviesList movies={movies.slice(0, loadedMovies)} />

      { totalMovies > loadedMovies && <ShowMore /> }
    </section>
  );
};

export default Catalog;
