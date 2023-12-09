import React, { useEffect, useState } from 'react';
import MoviesList from '../../components/movies-list/movies-list.tsx';
import { useNavigate } from 'react-router-dom';
import { EAppRoute} from '../../constants.ts';
import GenresList from '../../components/genres-list/genres-list.tsx';
import { useAppDispatch, useTypedSelector } from '../../hooks/useTypedSelector.ts';
import { changeGenre, getMovies } from '../../store/action.ts';
import { IGenre } from '../../types';
import ShowMore from '../../components/show-more/show-more.tsx';
import Header from '../../components/header/header.tsx';


const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [genres, setGenres] = useState<IGenre[]>([]);
  const { loadedMovies, totalMovies, allMovies, genre: selectedGenre, movies } = useTypedSelector((state) => state);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch, selectedGenre]);

  useEffect(() => {
    setGenres(
      [{ id: -1, title: 'All genres' }].concat(
        Array.from(allMovies.reduce((acc, film) => acc.add(film.genre), new Set<string>()))
          .map((t, index) => ({
            id: index,
            title: t
          })))
    );
  }, [allMovies]);

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

        <Header />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{ allMovies[0].name }</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{ allMovies[0].genre }</span>
                <span className="film-card__year">{ 2000 }</span>
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

          <MoviesList movies={movies.slice(0, loadedMovies)} />

          { totalMovies > loadedMovies && <ShowMore /> }
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
