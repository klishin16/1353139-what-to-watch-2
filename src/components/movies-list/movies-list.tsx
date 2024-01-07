import { Movie } from '../../types';
import MovieCard from '../movie-card/movie-card.tsx';

interface MoviesListProps {
  movies: Movie[];
}

export const MoviesList = ({ movies }: MoviesListProps) => (
  <div className="catalog__films-list" data-testid={'movies-list'}>
    { movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    )) }
  </div>
);
