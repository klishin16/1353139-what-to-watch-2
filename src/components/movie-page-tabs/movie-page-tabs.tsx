import React, { useState } from 'react';
import { MovieDetail, Review, ReviewStatistics } from '../../types';


enum MoviePageTab {
  OVERVIEW = 'Overview',
  DETAILS = 'Details',
  REVIEWS = 'Reviews'
}

interface MoviePageTabsProps {
  movie: MovieDetail;
  reviews: Review[];
  reviewsStatistics: ReviewStatistics;
}

export const MoviePageTabs = ({ movie, reviews, reviewsStatistics }: MoviePageTabsProps) => {
  const [activeTab, setActiveTab] = useState<MoviePageTab>(MoviePageTab.OVERVIEW);

  const handleTabLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, tab: MoviePageTab) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  const getLevel = (rating: number) => {
    switch (true) {
      case rating < 3:
        return 'Bad';
      case rating >= 3 && rating < 5:
        return 'Normal';
      case rating >= 5 && rating < 8:
        return 'Good';
      case rating >= 8 && rating < 10:
        return 'Very good';
      case rating >= 8:
        return 'Awesome';
    }
  };

  const getDuration = (runTime: number) => {
    const hours = Math.floor(runTime / 60);
    const minutes = runTime % 60;
    return `${hours}h ${minutes}m`;
  };

  const renderReview = (review: Review) => (
    <div className="review" key={review.id}>
      <blockquote className="review__quote">
        <p className="review__text">{ review.comment }</p>

        <footer className="review__details">
          <cite className="review__author">{ review.user }</cite>
          <time className="review__date" dateTime="2016-12-24">{ new Date(review.date).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }</time>
        </footer>
      </blockquote>

      <div className="review__rating">{ review.rating.toFixed(1) }</div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case MoviePageTab.OVERVIEW:
        return (
          <React.Fragment>
            <div className="film-rating">
              <div className="film-rating__score">{ reviewsStatistics.averageRating.toFixed(1) }</div>
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
      case MoviePageTab.DETAILS:
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
                    <React.Fragment key={v}>
                      {v}, <br />
                    </React.Fragment>
                  )) }
                </span>
              </p>
            </div>

            <div className="film-card__text-col">
              <p className="film-card__details-item">
                <strong className="film-card__details-name">Run Time</strong>
                <span className="film-card__details-value">{ getDuration(parseInt(movie.runTime, 10)) }</span>
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
      case MoviePageTab.REVIEWS:
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
        <ul className="film-nav__list" data-testid={'tabs-container'}>
          { Object.values(MoviePageTab).map((tab) => (
            <li key={tab} className={ `film-nav__item ${ activeTab === tab ? 'film-nav__item--active' : ''}` } data-testid={'tab'}>
              <a href='#' className="film-nav__link" onClick={(e) => handleTabLinkClick(e, tab)}>{ tab }</a>
            </li>
          )) }
        </ul>
      </nav>
      {renderContent()}
    </div>
  );
};
