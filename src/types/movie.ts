export interface IMovie {
  id: string;
  title: string;
  genre: string;
  year: number;
  preview: string;
  url: string;
}

export interface IMovieDetail extends IMovie {
  description: string;
  director: string;
  runTime: string;
  starring: string[];
}
