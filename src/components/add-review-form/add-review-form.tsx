import React, { useState } from 'react';
import { IAddReviewDto } from '../../types';


const AddReviewForm = () => {
  const [reviewForm, setReviewForm] = useState<IAddReviewDto>({ rating: 8, text: '' });

  const ratingChangeHandler = (rating: number) => {
    setReviewForm({
      ...reviewForm,
      rating
    });
  };

  const textChangeHandler = (text: string) => {
    setReviewForm({
      ...reviewForm,
      text
    });
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
            { Array.from(Array(10).keys()).map((i) => i + 1).reverse().map((rating) => (
              <React.Fragment key={rating}>
                <input className="rating__input" id={`star-${rating}`} type="radio" name="rating" value={rating} defaultChecked={rating === reviewForm.rating} onClick={() => ratingChangeHandler(rating)} />
                <label className="rating__label" htmlFor={`star-${rating}`}>Rating {rating}</label>
              </React.Fragment>
            )) }
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" onChange={(event) => textChangeHandler(event.target.value)} value={reviewForm.text}></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AddReviewForm;
