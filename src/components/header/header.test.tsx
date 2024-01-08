import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component.tsx';
import { makeFakeStore } from '../../utils/mocks.ts';
import { Header } from './header.tsx';
import { AuthorizationStatus } from '../../constants.ts';

describe('Component Header', () => {
  it('Should render correctly when authorization status AUTH', () => {
    const expectedSignOutText = 'Sign out';
    const componentWithHistory = withHistory(<Header />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      auth: {
        authorizationStatus: AuthorizationStatus.AUTH,
        user: null,
      }
    }));

    render(withStoreComponent);

    expect(screen.getByText(expectedSignOutText)).toBeInTheDocument();
  });

  it('Should render correctly when authorization status NO_AUTH', () => {
    const expectedSignInText = 'Sign in';
    const componentWithHistory = withHistory(<Header />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      auth: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        user: null,
      }
    }));

    render(withStoreComponent);

    expect(screen.getByText(expectedSignInText)).toBeInTheDocument();
  });

  it('Should render correctly when authorization status UNKNOWN', () => {
    const expectedSignInText = 'Sign in';
    const componentWithHistory = withHistory(<Header />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore({
      auth: {
        authorizationStatus: AuthorizationStatus.UNKNOWN,
        user: null,
      }
    }));

    render(withStoreComponent);

    expect(screen.getByText(expectedSignInText)).toBeInTheDocument();
  });
});
