import { useAppDispatch } from '../../hooks/use-typed-selector.ts';
import { showMoreMovies } from '../../store/movies/movies.slice.ts';

export const ShowMore = () => {
  const dispatch = useAppDispatch();

  const handleShowMoreButtonClick = () => {
    dispatch(showMoreMovies());
  };

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={handleShowMoreButtonClick}>Show more</button>
    </div>
  );
};
