import './movie-card.css';
import { Movie } from '../../types';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../constants.ts';
import VideoPlayer from '../video-player/video-player.tsx';
import React, { useState } from 'react';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = React.memo(({ movie }: MovieCardProps) => {
  const navigate = useNavigate();

  const [playPreview, setPlayPreview] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const handleMouseEnter = () => {
    const id = window.setTimeout(() => {
      setPlayPreview(true);
    }, 1000);
    setTimeoutId(id);
  };
  const handleMouseLeave = () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setPlayPreview(false);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate(`${AppRoute.Films }/${ movie.id}`);
  };

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} data-testid={'movie-card'} onClick={handleCardClick}>
      <div className="small-film-card__image">
        <VideoPlayer src={movie.previewVideoLink} poster={movie.previewImage} muted playPreview={playPreview} height={175} width={280} />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link">{ movie.name}</a>
      </h3>
    </article>
  );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;
