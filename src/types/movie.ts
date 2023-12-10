export interface IMovie {
  id: string;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  genre: string;
}

export interface IMovieDetail extends Omit<IMovie, 'previewImage' | 'previewVideoLink'> {
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

export interface IMovieChangeFavoriteStatusPayload {
  movie: IMovie;
  status: boolean;
}
