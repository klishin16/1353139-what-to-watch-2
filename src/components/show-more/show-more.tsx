import { useAppDispatch } from '../../hooks/useTypedSelector.ts';
import { showMoreMovies } from '../../store/movies/movies.slice.ts';

export const ShowMore = () => {
  const dispatch = useAppDispatch();

  const showMoreButtonClickHandler = () => {
    dispatch(showMoreMovies());
  };

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={showMoreButtonClickHandler}>Show more</button>
    </div>
  );
};
