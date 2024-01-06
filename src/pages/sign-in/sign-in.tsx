import React from 'react';
import { useAppDispatch } from '../../hooks/useTypedSelector.ts';
import { loginAction } from '../../store/api-actions/api-actions.ts';
import { useNavigate } from 'react-router-dom';
import { EAppRoute } from '../../constants.ts';
import { Footer, Header } from '../../components';

const SignInPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    dispatch(loginAction({
      email: (data.get('email') as string).replace(/\s/g, '') || '',
      password: (data.get('password') as string).replace(/\s/g, '') || ''
    }))
      .unwrap()
      .then(() => {
        /** Переходим на главную страницу при успешной авторизации */
        navigate(EAppRoute.MAIN);
      });
  };

  return (
    <div className="user-page">
      <Header />

      <div className="sign-in user-page__content">
        <form onSubmit={ loginFormHandler } className="sign-in__form">
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="email"
                id="user-email"
                data-testid={'emailElement'}
              />
              <label className="sign-in__label visually-hidden" htmlFor="email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="password"
                id="user-password"
                data-testid={'passwordElement'}
              />
              <label className="sign-in__label visually-hidden" htmlFor="password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default SignInPage;
