import React, { useState } from 'react';
import { IMovieDetail, IReview, IReviewStatistics } from '../../types';


enum EMoviePageTab {
  OVERVIEW = 'Overview',
  DETAILS = 'Details',
  REVIEWS = 'Reviews'
}

interface IMoviePageTabsProps {
  movie: IMovieDetail;
  reviews: IReview[];
  reviewsStatistics: IReviewStatistics;
}

export const MoviePageTabs = ({ movie, reviews, reviewsStatistics }: IMoviePageTabsProps) => {
  const [activeTab, setActiveTab] = useState<EMoviePageTab>(EMoviePageTab.OVERVIEW);

  const tabLinkClickHandler = (e: React.MouseEvent<HTMLAnchorElement>, tab: EMoviePageTab) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  const getLevel = (rating: number) => {
    switch (true) {
      case rating < 3:
        return 'Very bad';
      case rating >= 3 && rating < 4:
        return 'Bad';
      case rating >= 5 && rating < 6:
        return 'Normal';
      case rating >= 6 && rating < 8:
        return 'Good';
      case rating >= 8:
        return 'Very good';
    }
  };

  const renderReview = (review: IReview) => (
    <div className="review" key={review.id}>
      <blockquote className="review__quote">
        <p className="review__text">{ review.comment }</p>

        <footer className="review__details">
          <cite className="review__author">{ review.user }</cite>
          <time className="review__date" dateTime="2016-12-24">{ new Date(review.date).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }</time>
        </footer>
      </blockquote>

      <div className="review__rating">{ review.rating.toFixed(1).replace('.', ',') }</div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case EMoviePageTab.OVERVIEW:
        return (
          <React.Fragment>
            <div className="film-rating">
              <div className="film-rating__score">{ reviewsStatistics.averageRating.toFixed(1).replace('.', ',') }</div>
              <p className="film-rating__meta">
                <span className="film-rating__level">{ getLevel(reviewsStatistics.averageRating) }</span>
                <span className="film-rating__count">{reviewsStatistics.totalReviews} ratings</span>
              </p>
            </div>

            <div className="film-card__text">
              <p>{ movie.description }</p>

              <p className="film-card__director"><strong>Director: { movie.director }</strong></p>

              <p className="film-card__starring"><strong>Starring: { movie.starring.join(', ') }</strong></p>
            </div>
          </React.Fragment>
        );
      case EMoviePageTab.DETAILS:
        return (
          <div className="film-card__text film-card__row">
            <div className="film-card__text-col">
              <p className="film-card__details-item">
                <strong className="film-card__details-name">Director</strong>
                <span className="film-card__details-value">{ movie.director }</span>
              </p>
              <p className="film-card__details-item">
                <strong className="film-card__details-name">Starring</strong>
                <span className="film-card__details-value">
                  { movie.starring.map((v) => (
                    <>
                      {v}, <br />
                    </>
                  )) }
                </span>
              </p>
            </div>

            <div className="film-card__text-col">
              <p className="film-card__details-item">
                <strong className="film-card__details-name">Run Time</strong>
                <span className="film-card__details-value">{ movie.runTime }</span>
              </p>
              <p className="film-card__details-item">
                <strong className="film-card__details-name">Genre</strong>
                <span className="film-card__details-value">{ movie.genre }</span>
              </p>
              <p className="film-card__details-item">
                <strong className="film-card__details-name">Released</strong>
                <span className="film-card__details-value">{ movie.released }</span>
              </p>
            </div>
          </div>
        );
      case EMoviePageTab.REVIEWS:
        return (
          <div className="film-card__reviews film-card__row">
            { reviews.length ?
              <>
                <div className="film-card__reviews-col">
                  { reviews.filter((_, index) => !(index % 2)).map((review) => renderReview(review)) }
                </div>
                <div className="film-card__reviews-col">
                  { reviews.filter((_, index) => index % 2).map((review) => renderReview(review)) }
                </div>
              </> :
              <div style={{ color: 'black' }}>No reviews</div>}
          </div>
        );
    }
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          { Object.values(EMoviePageTab).map((tab) => (
            <li key={tab} className={ `film-nav__item ${ activeTab === tab ? 'film-nav__item--active' : ''}` }>
              <a href='#' className="film-nav__link" onClick={(e) => tabLinkClickHandler(e, tab)}>{ tab }</a>
            </li>
          )) }
        </ul>
      </nav>
      {renderContent()}
    </div>
  );
};
