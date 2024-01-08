import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component.tsx';
import SignIn from './sign-in.tsx';
import { AuthSliceState } from '../../store/auth/auth.slice.ts';
import { AuthorizationStatus } from '../../constants.ts';
import userEvent from '@testing-library/user-event';

describe('Page Sign in', () => {
  it('Should render correctly', () => {
    const emailText = 'Email address';
    const passwordText = 'Password';
    const signInText = 'Sign in';
    const auth: AuthSliceState = {
      user: null,
      authorizationStatus: AuthorizationStatus.UNKNOWN
    };
    const { withStoreComponent } = withStore(<SignIn />, { auth });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(emailText)).toBeInTheDocument();
    expect(screen.getByText(passwordText)).toBeInTheDocument();
    expect(screen.getAllByText(signInText).length).toBe(2);
  });

  it('Should render correctly when user typing', async () => {
    const emailElementTestId = 'emailElement';
    const passwordElementTestId = 'passwordElement';
    const expectedEmailValue = 't@test.ru';
    const expectedPasswordValue = '1234';
    const auth: AuthSliceState = {
      user: null,
      authorizationStatus: AuthorizationStatus.UNKNOWN
    };
    const { withStoreComponent } = withStore(<SignIn />, { auth });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(emailElementTestId),
      expectedEmailValue
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue
    );

    expect(screen.getByDisplayValue(expectedEmailValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
