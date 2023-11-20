import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import { IMainPageProps } from './pages/main/main-page.tsx';

const mainPageProps: IMainPageProps = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  year: 2014
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App mainPageProps={mainPageProps} />
  </React.StrictMode>
);
