import MainPage from '../../pages/main/main-page.tsx';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../constants.ts';
import SignInPage from '../../pages/sign-in/sign-in.tsx';
import MoviePage from '../../pages/movie-page/movie-page.tsx';
import AddReviewPage from '../../pages/add-review/add-review.tsx';
import PlayerPage from '../../pages/player/player.tsx';
import NotFoundPage from '../../pages/not-found/not-found.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import MyListPage from '../../pages/my-list/my-list.tsx';
import ScrollToTop from '../scroll-to-top/scroll-to-top.tsx';
import { useTypedSelector } from '../../hooks/use-typed-selector.ts';
import { Loader } from '../loader/loader.tsx';
import { getMoviesIsLoading } from '../../store/movies/movies.selectors.ts';
import { HelmetProvider } from 'react-helmet-async';


const App = () => {
  const isLoading = useTypedSelector(getMoviesIsLoading);


  return (
    <HelmetProvider>
      <ScrollToTop/>

      <Routes>
        <Route
          index
          path={ AppRoute.MAIN }
          element={
            <Loader isLoading={isLoading} >
              <MainPage />
            </Loader>
          }
        />
        <Route
          path={ AppRoute.SIGN_IN }
          element={ <SignInPage/> }
        />
        <Route
          path={ AppRoute.MY_LIST }
          element={
            <PrivateRoute>
              <MyListPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ AppRoute.FILM }
          element={ <MoviePage/> }
        />
        <Route
          path={ AppRoute.ADD_REVIEW }
          element={
            <PrivateRoute>
              <AddReviewPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ `${AppRoute.PLAYER }/:id` }
          element={ <PlayerPage/> }
        />
        <Route
          path={ AppRoute.NOTFOUND }
          element={ <NotFoundPage/> }
        />
      </Routes>
    </HelmetProvider>
  );
};

export default App;
