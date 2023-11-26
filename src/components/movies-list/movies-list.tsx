import { IMovie } from '../../types';
import MovieCard from '../movie-card/movie-card.tsx';
import { useState } from 'react';

interface IMoviesListProps {
  movies: IMovie[];
}

const MoviesList = ({ movies }: IMoviesListProps) => {
  const [activeMovie, setActiveMovie] = useState<string | null>(null);

  const movieCardHoverHandler = (movie: IMovie) => {
    setActiveMovie(movie.id);
  };

  // eslint-disable-next-line no-console
  console.log('active movie', activeMovie);

  return (
    <div className="catalog__films-list">
      { movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onCardHover={movieCardHoverHandler} />
      )) }
    </div>
  );
};

export default MoviesList;
