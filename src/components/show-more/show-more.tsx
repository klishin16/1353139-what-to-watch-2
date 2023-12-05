import { useAppDispatch } from '../../hooks/useTypedSelector.ts';
import { showMoreMovies } from '../../store/action.ts';

const ShowMore = () => {
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

export default ShowMore;
