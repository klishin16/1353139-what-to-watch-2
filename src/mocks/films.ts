import { IMovie, IMovieDetail } from '../types';


export const mockFilms: IMovie[] = [
  {
    id: '1',
    title: 'Fantastic Beasts: The Crimes of Grindelwald',
    genre: 'Drama',
    year: 2014,
    preview: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    url: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  },
  {
    id: '2',
    title: 'Bohemian Rhapsody',
    genre: 'Drama',
    year: 2014,
    preview: 'img/bohemian-rhapsody.jpg',
    url: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  },
  {
    id: '3',
    title: 'Macbeth',
    genre: 'Thrillers',
    year: 2014,
    preview: 'img/macbeth.jpg',
    url: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  },
  {
    id: '4',
    title: 'Aviator',
    genre: 'Thrillers',
    year: 2014,
    preview: 'img/aviator.jpg',
    url: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  },
  {
    id: '5',
    title: 'We need to talk about Kevin',
    genre: 'Documentary',
    year: 2014,
    preview: 'img/we-need-to-talk-about-kevin.jpg',
    url: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  },
  {
    id: '6',
    title: 'What We Do in the Shadows',
    genre: 'Comedies',
    year: 2014,
    preview: 'img/what-we-do-in-the-shadows.jpg',
    url: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  },
  {
    id: '7',
    title: 'Revenant',
    genre: 'Romance',
    year: 2014,
    preview: 'img/revenant.jpg',
    url: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  },
  {
    id: '8',
    title: 'Johnny English',
    genre: 'Romance',
    year: 2014,
    preview: 'img/johnny-english.jpg',
    url: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  },
];

export const mockFilmsWithDetails: IMovieDetail[] = mockFilms.map((film) => ({
  ...film,
  description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege. Gustave prides himself on providing first-class service to the hotel\'s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave\'s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.',
  director: 'Wes Anderson',
  starring: ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan', 'Tony Revoloru', 'Tilda Swinton', 'Tom Wilkinson', 'Owen Wilkinson', 'Adrien Brody', 'Ralph Fiennes', 'Jeff Goldblum'],
  runTime: '1h 39m'
}));
