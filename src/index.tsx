import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import { mockFilms } from './mocks/films.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App mainMovie={mockFilms[0]} movies={mockFilms} />
  </React.StrictMode>
);
