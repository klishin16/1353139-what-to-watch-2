import MainPage, { IMainPageProps } from '../../pages/main/main-page.tsx';


interface IAppProps {
  mainPageProps: IMainPageProps;
}

const App = ({ mainPageProps }: IAppProps) => (
  <MainPage {...mainPageProps} />
);

export default App;
