import { render, screen } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import App from './app';
import { withHistory, withStore } from '../../utils/mock-component';
import { EAppRoute, EAuthorizationStatus } from '../../constants.ts';
import { makeFakeStore } from '../../utils/mocks.ts';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "Main page" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(EAppRoute.MAIN);
    const promoCardTestId = 'promo-card';

    render(withStoreComponent);

    expect(screen.getByTestId(promoCardTestId)).toBeInTheDocument();
  });

  it('should render "Sign in page" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(EAppRoute.SIGN_IN);

    render(withStoreComponent);

    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render "My list" when user navigate to "/my-list"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      auth: { authorizationStatus: EAuthorizationStatus.AUTH, user: null },
    }));
    mockHistory.push(EAppRoute.MY_LIST);
    const expectedText = 'My list';

    render(withStoreComponent);

    expect(screen.getAllByText(expectedText).length).toBe(2);
  });

  it('should render "Not found page" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
