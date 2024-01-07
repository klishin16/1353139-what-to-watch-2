export interface Movie {
  id: string;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  genre: string;
}

export interface MovieDetail extends Omit<Movie, 'previewImage' | 'previewVideoLink'> {
  description: string;
  director: string;
  runTime: string;
  starring: string[];
  posterImage: string;
  backgroundImage: string;
  released: number;
  rating: number;
  scoresCount: number;
  videoLink: string;
}

export interface MovieChangeFavoriteStatusPayload {
  movie: Movie;
  status: boolean;
}
