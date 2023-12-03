import { IGenre } from '../../types';
import React from 'react';

export interface IGenresListProps {
  genres: IGenre[];
  selectedGenre: IGenre;
  onGenreClick: (genre: IGenre) => void;
}

const GenresList = ({ genres, selectedGenre, onGenreClick }: IGenresListProps) => {
  const genreClickHandler = (e: React.MouseEvent<HTMLAnchorElement>, genre: IGenre) => {
    e.preventDefault();
    onGenreClick(genre);
  };

  return (
    <ul className="catalog__genres-list">
      { genres.map((genre) => (
        <li key={genre.id} className={`catalog__genres-item ${ genre.title === selectedGenre.title ? 'catalog__genres-item--active' : ''}`}>
          <a href="#" className="catalog__genres-link" onClick={(e) => genreClickHandler(e, genre)}>{ genre.title }</a>
        </li>
      )) }
    </ul>
  );
};

export default GenresList;
