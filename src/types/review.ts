export interface AddReviewDto {
  rating?: number;
  comment: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  user: string;
  date: number;
}

export interface ReviewStatistics {
  averageRating: number;
  totalReviews: number;
}
