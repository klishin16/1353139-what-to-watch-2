import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component.tsx';
import { makeFakeStore } from '../../utils/mocks.ts';
import { Header } from './header.tsx';
import { AuthorizationStatus } from '../../constants.ts';

describe('Component Header', () => {
  it('Should render correctly when authorization status Auth', () => {
    const expectedSignOutText = 'Sign out';
    const componentWithHistory = withHistory(<Header />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      }
    }));

    render(withStoreComponent);

    expect(screen.getByText(expectedSignOutText)).toBeInTheDocument();
  });

  it('Should render correctly when authorization status NoAuth', () => {
    const expectedSignInText = 'Sign in';
    const componentWithHistory = withHistory(<Header />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      }
    }));

    render(withStoreComponent);

    expect(screen.getByText(expectedSignInText)).toBeInTheDocument();
  });

  it('Should render correctly when authorization status Unknown', () => {
    const expectedSignInText = 'Sign in';
    const componentWithHistory = withHistory(<Header />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      auth: {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
      }
    }));

    render(withStoreComponent);

    expect(screen.getByText(expectedSignInText)).toBeInTheDocument();
  });
});
