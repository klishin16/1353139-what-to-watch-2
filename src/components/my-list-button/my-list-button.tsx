import { useAppDispatch, useTypedSelector } from '../../hooks/useTypedSelector.ts';
import { IMovie } from '../../types';
import { useEffect, useState } from 'react';
import { changeMovieFavoriteStatusAction } from '../../store/api-actions.ts';


interface IMyListButtonProps {
  movieId: string;
}

export const MyListButton = ({ movieId }: IMyListButtonProps) => {
  const dispatch = useAppDispatch();
  const { favoriteMovies, allMovies } = useTypedSelector((state) => state.movies);

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

  // onClick={() => navigate(EAppRoute.MYLIST)}

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
