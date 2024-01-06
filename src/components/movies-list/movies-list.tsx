import { IMovie } from '../../types';
import MovieCard from '../movie-card/movie-card.tsx';

interface IMoviesListProps {
  movies: IMovie[];
}

export const MoviesList = ({ movies }: IMoviesListProps) => (
  <div className="catalog__films-list" data-testid={'movies-list'}>
    { movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    )) }
  </div>
);
