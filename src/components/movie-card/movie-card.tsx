import { IMovie } from '../../types';
import { Link } from 'react-router-dom';
import { EAppRoute } from '../../constants.ts';

interface IMovieCardProps {
  movie: IMovie;
  onCardHover: (movie: IMovie) => void;
}

const MovieCard = ({ movie, onCardHover }: IMovieCardProps) => (
  <article className="small-film-card catalog__films-card" onMouseEnter={() => onCardHover(movie)}>
    <div className="small-film-card__image">
      <img src={movie.preview} alt={movie.title} width="280" height="175" />
    </div>
    <h3 className="small-film-card__title">
      <Link className="small-film-card__link" to={`${EAppRoute.FILMS }/${ movie.id}`}>{ movie.title }</Link>
    </h3>
  </article>
);

export default MovieCard;

