import React from 'react';
import { useAppDispatch } from '../../hooks/useTypedSelector.ts';
import { loginAction } from '../../store/api-actions.ts';
import { useNavigate } from 'react-router-dom';
import { EAppRoute } from '../../constants.ts';

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
      <header className="page-header user-page__head">
        <div className="logo">
          <a href="main.html" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form onSubmit={ loginFormHandler } className="sign-in__form">
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="email" id="user-email"/>
              <label className="sign-in__label visually-hidden" htmlFor="email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="password"
                id="user-password"
              />
              <label className="sign-in__label visually-hidden" htmlFor="password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

export default SignInPage;
