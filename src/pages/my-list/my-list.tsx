import { IMovie } from '../../types';
import { Footer, Header, MoviesList } from '../../components';

interface IMyListPageProps {
  movies: IMovie[];
}

const MyListPage = ({ movies }: IMyListPageProps) => (
  <div className="user-page">
    <Header>
      <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
    </Header>

    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <MoviesList movies={movies} />
    </section>

    <Footer />
  </div>
);

export default MyListPage;
