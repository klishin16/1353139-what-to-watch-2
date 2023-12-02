export interface IAddReviewDto {
  rating: number;
  text: string;
}

export interface IReview {
  id: string;
  rating: number;
  text: string;
  author: string;
  timestamp: number;
}

export interface IReviewStatistics {
  averageRating: number;
  totalReviews: number;
}
