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
          path={ AppRoute.Main }
          element={
            <Loader isLoading={isLoading} >
              <MainPage />
            </Loader>
          }
        />
        <Route
          path={ AppRoute.SignIn }
          element={ <SignInPage/> }
        />
        <Route
          path={ AppRoute.MyList }
          element={
            <PrivateRoute>
              <MyListPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ AppRoute.Film }
          element={ <MoviePage/> }
        />
        <Route
          path={ AppRoute.AddReview }
          element={
            <PrivateRoute>
              <AddReviewPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ `${AppRoute.Player }/:id` }
          element={ <PlayerPage/> }
        />
        <Route
          path={ AppRoute.NotFound }
          element={ <NotFoundPage/> }
        />
      </Routes>
    </HelmetProvider>
  );
};

export default App;
