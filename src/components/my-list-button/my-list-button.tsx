import { useAppDispatch, useTypedSelector } from '../../hooks/use-typed-selector.ts';
import { IMovie } from '../../types';
import { useEffect, useState } from 'react';
import { changeMovieFavoriteStatusAction } from '../../store/api-actions/api-actions.ts';
import { getMoviesState } from '../../store/movies/movies.selectors.ts';


interface IMyListButtonProps {
  movieId: string;
}

export const MyListButton = ({ movieId }: IMyListButtonProps) => {
  const dispatch = useAppDispatch();
  const { favoriteMovies, allMovies } = useTypedSelector(getMoviesState);

  const [movie, setMovie] = useState<IMovie>();
  const [isFavoriteMovie, setIsFavoriteMovie] = useState<boolean>(false);

  useEffect(() => {
    setMovie(allMovies.find(({ id }) => id === movieId));
  }, [allMovies, movieId]);

  useEffect(() => {
    if (movieId && favoriteMovies) {
      setIsFavoriteMovie(!!favoriteMovies.find((favoriteMovie) => favoriteMovie.id === movieId));
    }
  }, [movieId, favoriteMovies]);

  const buttonClickHandler = () => {
    if (movie) {
      dispatch(changeMovieFavoriteStatusAction({ movie, status: !isFavoriteMovie }));
    }
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={buttonClickHandler}>
      { isFavoriteMovie ?
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#in-list"></use>
        </svg> :
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>}
      <span>My list</span>
      <span className="film-card__count">{ favoriteMovies?.length ?? 0 }</span>
    </button>
  );
};
