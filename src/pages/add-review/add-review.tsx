import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../store';
import { MovieDetail } from '../../types';
import { EAPIRoute } from '../../constants.ts';
import { AddReviewForm, Header, Loader } from '../../components';


const AddReviewPage = () => {
  const {id} = useParams();
  const [movie, setMovie] = useState<MovieDetail>();


  useEffect(() => {
    if (id) {
      api.get<MovieDetail>(`${EAPIRoute.MOVIES}/${id}`)
        .then(({ data }) => {
          setMovie(data);
        });
    }
  }, [id]);

  if (!movie) {
    return <Loader />;
  }


  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={movie.backgroundImage} alt={movie.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__poster film-card__poster--small">
          <img src={movie.posterImage} alt={movie.name} width="218" height="327" />
        </div>
      </div>

      <AddReviewForm movieId={movie.id} />

    </section>
  );
};

export default AddReviewPage;
