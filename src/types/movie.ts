export interface IMovie {
  id: string;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  genre: string;
}

export interface IMovieDetail extends IMovie {
  description: string;
  director: string;
  runTime: string;
  starring: string[];
  year: number;
}
