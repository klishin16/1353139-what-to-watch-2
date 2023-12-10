import { Footer, Header, Loader, MoviesList } from '../../components';
import { useTypedSelector } from '../../hooks/useTypedSelector.ts';


const MyListPage = () => {
  const favoriteMovies = useTypedSelector((state) => state.movies.favoriteMovies);

  if (!favoriteMovies) {
    return <Loader />;
  }

  return (
    <div className="user-page">
      <Header>
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{ favoriteMovies.length }</span></h1>
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <MoviesList movies={favoriteMovies} />
      </section>

      <Footer />
    </div>
  );
};

export default MyListPage;
