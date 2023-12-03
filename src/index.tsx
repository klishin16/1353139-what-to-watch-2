import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import { mockFilms } from './mocks/films.ts';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App mainMovie={mockFilms[0]} movies={mockFilms} />
    </Provider>
  </React.StrictMode>
);
