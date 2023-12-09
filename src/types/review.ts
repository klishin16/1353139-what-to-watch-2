export interface IAddReviewDto {
  rating: number;
  comment: string;
}

export interface IReview {
  id: string;
  rating: number;
  comment: string;
  user: string;
  date: number;
}

export interface IReviewStatistics {
  averageRating: number;
  totalReviews: number;
}
