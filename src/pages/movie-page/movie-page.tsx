import { EAppRoute } from '../../constants.ts';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MoviePageTabs from '../../components/movie-page-tabs/movie-page-tabs.tsx';
import { mockReviews } from '../../mocks/reviews.ts';
import { mockFilms, mockFilmsWithDetails } from '../../mocks/films.ts';
import MoviesList from '../../components/movies-list/movies-list.tsx';
import { useEffect, useState } from 'react';
import { IMovie } from '../../types';

const MoviePage = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<IMovie>();

  useEffect(() => {
    setMovie(mockFilms.find((m) => m.id === id));
  }, [id]);

  return (
    <div>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel"/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Link to={ EAppRoute.MAIN } className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">The Grand Budapest Hotel</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">Drama</span>
                <span className="film-card__year">2014</span>
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
                <Link to={`${EAppRoute.FILMS}/${id ?? 1}/review`} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218"
                height="327"
              />
            </div>

            <MoviePageTabs
              reviews={mockReviews}
              movie={mockFilmsWithDetails.find((f) => f.id === id) ?? mockFilmsWithDetails[0]}
              reviewsStatistics={{ averageRating: 8.9, totalReviews: 250 }}
            />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MoviesList movies={mockFilms.filter((m) => m.genre === movie?.genre)?.slice(0, 4) ?? []} />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to={EAppRoute.MAIN} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MoviePage;
