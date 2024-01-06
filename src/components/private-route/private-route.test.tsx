import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from '../../utils/mock-component';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import { render, screen } from '@testing-library/react';
import { EAppRoute, EAuthorizationStatus } from '../../constants.ts';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(EAppRoute.MY_LIST);
  });

  it('should render component for public route, when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={EAppRoute.SIGN_IN} element={<span>{expectedText}</span>} />
        <Route path={EAppRoute.MY_LIST} element={
          <PrivateRoute>
            <span>{notExpectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(preparedComponent, {
      auth: {
        user: null,
        authorizationStatus: EAuthorizationStatus.NOAUTH
      }
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={EAppRoute.SIGN_IN} element={<span>{notExpectedText}</span>} />
        <Route path={EAppRoute.MY_LIST} element={
          <PrivateRoute>
            <span>{expectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(preparedComponent, {
      auth: {
        user: null,
        authorizationStatus: EAuthorizationStatus.AUTH
      }
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
