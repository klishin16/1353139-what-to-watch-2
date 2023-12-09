import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EAPIRoute, EAppRoute } from '../../constants.ts';
import { IMovieDetail } from '../../types';
import { Footer, Header } from '../../components';
import { api } from '../../store';
import Catalog from '../../components/catalog/catalog.tsx';


const MainPage = () => {
  const navigate = useNavigate();

  const [promo, setPromo] = useState<IMovieDetail>();

  useEffect(() => {
    api.get<IMovieDetail>(EAPIRoute.PROMO)
      .then(({ data }) => {
        setPromo(data);
      });
  }, []);


  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promo?.backgroundImage} alt={promo?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promo?.posterImage} alt={promo?.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{ promo?.name }</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{ promo?.genre }</span>
                <span className="film-card__year">{ promo?.released }</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`${EAppRoute.PLAYER }/${ promo?.id ?? ''}`)}>
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
        <Catalog />

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default MainPage;
