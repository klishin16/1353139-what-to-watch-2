import React, { useEffect, useState } from 'react';
import { AddReviewDto } from '../../types';
import { api } from '../../store';
import { EAPIRoute } from '../../constants.ts';
import { useNavigate } from 'react-router-dom';


interface AddReviewFormProps {
  movieId: string;
}

export const AddReviewForm = ({ movieId }: AddReviewFormProps) => {
  const navigate = useNavigate();
  const [reviewForm, setReviewForm] = useState<AddReviewDto>({ comment: '' });
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRatingChange = (rating: number) => {
    setReviewForm({
      ...reviewForm,
      rating
    });
  };

  const handleTextChange = (comment: string) => {
    setReviewForm({
      ...reviewForm,
      comment
    });
  };

  useEffect(() => {
    setSubmitButtonDisabled(!(Number.isInteger(reviewForm.rating) && reviewForm.comment.length >= 50 && reviewForm.comment.length < 400));
  }, [reviewForm]);

  const handleSubmitRatingForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    api.post(`${EAPIRoute.COMMENTS }/${ movieId}`, reviewForm)
      .then(() => {
        navigate(`${EAPIRoute.MOVIES }/${ movieId}`);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="add-review">
      <form onSubmit={handleSubmitRatingForm} className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
            { Array.from(Array(10).keys()).map((i) => i + 1).reverse().map((rating) => (
              <React.Fragment key={rating}>
                <input disabled={isLoading} className="rating__input" id={`star-${rating}`} type="radio" name="rating" value={rating} defaultChecked={rating === reviewForm.rating} onClick={() => handleRatingChange(rating)} />
                <label className="rating__label" htmlFor={`star-${rating}`}>Rating {rating}</label>
              </React.Fragment>
            )) }
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="comment"
            placeholder="Review text"
            onChange={(event) => handleTextChange(event.target.value)} value={reviewForm.comment}
            disabled={isLoading}
          >
          </textarea>
          <div className="add-review__submit">
            <button disabled={submitButtonDisabled || isLoading} className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
};
