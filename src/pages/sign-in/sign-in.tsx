import React, { useRef } from 'react';
import { useAppDispatch } from '../../hooks/use-typed-selector.ts';
import { clearErrorAction, loginAction } from '../../store/api-actions/api-actions.ts';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../constants.ts';
import { Footer, Header } from '../../components';
import { setError } from '../../store/errors/errors.slice.ts';

const SignInPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      if (/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/i.test(passwordRef.current.value)) {
        dispatch(loginAction({
          email: emailRef.current.value,
          password: passwordRef.current.value
        }))
          .unwrap()
          .then(() => {
            /** Переходим на главную страницу при успешной авторизации */
            navigate(AppRoute.Main);
          })
          .catch(() => {
            dispatch(setError('Server error'));
            dispatch(clearErrorAction());
          });
      } else {
        dispatch(setError('Password incorrect'));
        dispatch(clearErrorAction());
      }
    } else {
      dispatch(setError('The required fields are not filled in'));
      dispatch(clearErrorAction());
    }
  };

  return (
    <div className="user-page">
      <Header />

      <div className="sign-in user-page__content">
        <form onSubmit={ handleSubmit } className="sign-in__form">
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                ref={emailRef}
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
                ref={passwordRef}
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
