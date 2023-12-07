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
import { IMovie, IMovieDetail } from '../../types';
import ScrollToTop from '../scroll-to-top/ScrollToTop.tsx';
import { useEffect } from 'react';
import Loader from '../loader/loader.tsx';
import { useAppDispatch, useTypedSelector } from '../../hooks/useTypedSelector.ts';
import { fetchAllMoviesAction } from '../../store/api-actions.ts';


interface IAppProps {
  mainMovie: IMovieDetail;
  movies: IMovie[];
}

const App = ({ mainMovie, movies }: IAppProps) => {
  const isLoading = useTypedSelector((state) => state.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllMoviesAction());
  }, [dispatch]);


  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route
          index
          path={ EAppRoute.MAIN }
          element={
            <Loader isLoading={isLoading} >
              <MainPage { ...mainMovie } />
            </Loader>
          }
        />
        <Route
          path={ EAppRoute.SIGNIN }
          element={ <SignInPage/> }
        />
        <Route
          path={ EAppRoute.MYLIST }
          element={
            <PrivateRoute authorizationStatus={ EAuthorizationStatus.AUTH }>
              <MyListPage movies={ movies } />
            </PrivateRoute>
          }
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
};

export default App;
