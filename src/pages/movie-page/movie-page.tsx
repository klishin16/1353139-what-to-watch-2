import { EAPIRoute, EAppRoute, EAuthorizationStatus } from '../../constants.ts';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IMovie, IMovieDetail, IReview } from '../../types';
import { api } from '../../store';
import { useTypedSelector } from '../../hooks/use-typed-selector.ts';
import { Footer, Header, Loader, MoviePageTabs, MoviesList, MyListButton } from '../../components';
import { getAuthorizationStatus } from '../../store/auth/auth.selectors.ts';

const MoviePage = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<IMovieDetail>();
  const [reviews, setReviews] = useState<IReview[]>();
  const [similarMovies, setSimilarMovies] = useState<IMovie[]>();

  const authorizationStatus = useTypedSelector(getAuthorizationStatus);

  useEffect(() => {
    if (id && navigate) {
      api.get<IMovieDetail>(`${EAPIRoute.MOVIES}/${id}`)
        .then(({ data }) => {
          setMovie(data);
        })
        .catch(() => {
          navigate(EAppRoute.NOTFOUND);
        });

      api.get<IReview[]>(`${EAPIRoute.COMMENTS}/${id}`)
        .then(({ data }) => {
          setReviews(data);
        });

      api.get<IMovie[]>(`${EAPIRoute.MOVIES }/${ id }/similar`)
        .then(({ data }) => {
          setSimilarMovies(data);
        });
    }
  }, [id, navigate]);

  if (!movie) {
    return <Loader />;
  }

  return (
    <div>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={movie.backgroundImage} alt={movie.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{movie.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{movie.genre}</span>
                <span className="film-card__year">{movie.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`${EAppRoute.PLAYER }/${ movie.id}`)}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <MyListButton movieId={movie.id} />
                { authorizationStatus === EAuthorizationStatus.AUTH && <Link to={`${EAppRoute.FILMS}/${id ?? 1}/review`} className="btn film-card__button">Add review</Link> }
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={movie.posterImage} alt={movie.name} width="218"
                height="327"
              />
            </div>

            <MoviePageTabs
              reviews={reviews ?? []}
              movie={movie}
              reviewsStatistics={{ averageRating: movie.rating, totalReviews: movie.scoresCount }}
            />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MoviesList movies={ similarMovies?.slice(0, 4) ?? []} />
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default MoviePage;
