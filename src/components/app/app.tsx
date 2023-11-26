import MainPage from '../../pages/main/main-page.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EAppRoute, EAuthorizationStatus } from '../../constants.ts';
import SignInPage from '../../pages/sign-in/sign-in.tsx';
import MoviePage from '../../pages/movie-page/movie-page.tsx';
import AddReviewPage from '../../pages/add-review/add-review.tsx';
import PlayerPage from '../../pages/player/player.tsx';
import NotFoundPage from '../../pages/not-found/not-found.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import MyListPage from '../../pages/my-list/my-list.tsx';
import { IMovie } from '../../types';
import ScrollToTop from '../scroll-to-top/ScrollToTop.tsx';


interface IAppProps {
  mainMovie: IMovie;
  movies: IMovie[];
}

const App = ({ mainMovie, movies }: IAppProps) => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route
        index
        path={ EAppRoute.MAIN }
        element={ <MainPage { ...mainMovie } movies={movies} /> }
      />
      <Route
        path={ EAppRoute.SIGNIN }
        element={ <SignInPage/> }
      />
      <Route
        path={ EAppRoute.MYLIST }
        element={ <PrivateRoute authorizationStatus={EAuthorizationStatus.AUTH}><MyListPage movies={movies}/></PrivateRoute> }
      />
      <Route
        path={ EAppRoute.FILM }
        element={ <MoviePage/> }
      />
      <Route
        path={ EAppRoute.ADDREVIEW }
        element={ <AddReviewPage/> }
      />
      <Route
        path={ EAppRoute.PLAYER }
        element={ <PlayerPage/> }
      />
      <Route
        path="*"
        element={ <NotFoundPage/> }
      />
    </Routes>
  </BrowserRouter>
);

export default App;
