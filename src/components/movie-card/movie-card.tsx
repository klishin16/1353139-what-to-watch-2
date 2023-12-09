import { IMovie } from '../../types';
import { Link } from 'react-router-dom';
import { EAppRoute } from '../../constants.ts';
import VideoPlayer from '../video-player/video-player.tsx';
import React, { useState } from 'react';

interface IMovieCardProps {
  movie: IMovie;
}

const MovieCard = React.memo(({ movie }: IMovieCardProps) => {
  const [playPreview, setPlayPreview] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const mouseEnterHandler = () => {
    const id = window.setTimeout(() => {
      setPlayPreview(true);
    }, 1000);
    setTimeoutId(id);
  };
  const mouseLeaveHandler = () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setPlayPreview(false);
  };

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
      <div className="small-film-card__image">
        <VideoPlayer src={movie.previewVideoLink} poster={movie.previewImage} muted playPreview={playPreview} height={175} width={280} />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${EAppRoute.FILMS }/${ movie.id}`}>{ movie.name}</Link>
      </h3>
    </article>
  );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;
