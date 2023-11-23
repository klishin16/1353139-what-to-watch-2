import { Link } from 'react-router-dom';
import { EAppRoute } from '../../constants.ts';

const NotFoundPage = () => (
  <div>
    <section className="game__screen">
      <h1>404. Page not found</h1>
      <Link to={EAppRoute.MAIN}>Вернуться на главную</Link>
    </section>
  </div>
);

export default NotFoundPage;
