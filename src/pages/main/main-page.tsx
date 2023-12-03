import React, { useEffect, useState } from 'react';
import MoviesList from '../../components/movies-list/movies-list.tsx';
import { useNavigate } from 'react-router-dom';
import { EAppRoute } from '../../constants.ts';
import GenresList from '../../components/genres-list/genres-list.tsx';
import { useAppDispatch, useTypedSelector } from '../../hooks/useTypedSelector.ts';
import { changeGenre, getMovies } from '../../store/action.ts';
import { IGenre } from '../../types';
import { mockFilmsWithDetails } from '../../mocks/films.ts';

interface IMainPageProps {
  title: string;
  genre: string;
  year: number;
}

const MainPage = ({ title, genre, year }: IMainPageProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [genres, setGeneres] = useState<IGenre[]>([]);
  const selectedGenre = useTypedSelector((state) => state.genre);
  const movies = useTypedSelector((state) => state.movies);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch, selectedGenre]);

  useEffect(() => {
    setGeneres(
      [{ id: -1, title: 'All genres' }].concat(
        Array.from(mockFilmsWithDetails.reduce((acc, film) => acc.add(film.genre), new Set<string>()))
          .map((t, index) => ({
            id: index,
            title: t
          })))
    );
  }, []);

  const genreChangeHandler = (g: IGenre) => {
    dispatch(changeGenre(g));
  };

  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{ title }</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{ genre }</span>
                <span className="film-card__year">{ year }</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button" onClick={() => navigate(EAppRoute.MYLIST)}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genres={genres} selectedGenre={selectedGenre} onGenreClick={genreChangeHandler} />

          <MoviesList movies={movies} />

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default MainPage;
