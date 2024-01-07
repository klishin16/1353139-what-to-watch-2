import React, { PropsWithChildren } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, EAuthorizationStatus } from '../../constants.ts';
import { useAppDispatch, useTypedSelector } from '../../hooks/use-typed-selector.ts';
import { logoutAction } from '../../store/api-actions/api-actions.ts';
import { getAuthorizationState } from '../../store/auth/auth.selectors.ts';

export const Header = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authorizationStatus, user } = useTypedSelector(getAuthorizationState);

  const handleSignOutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logoutAction());
  };

  const handleAvatarClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    navigate(AppRoute.MY_LIST);
  };

  return (
    <header className="page-header user-page__head">
      <div className="logo">
        <Link to={ AppRoute.MAIN } className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      { children }

      <ul className="user-block">
        { authorizationStatus === EAuthorizationStatus.AUTH ?
          <>
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src={user?.avatarUrl || 'img/avatar.jpg'} alt="User avatar" width="63" height="63" onClick={handleAvatarClick} />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link" onClick={handleSignOutClick}>Sign out</a>
            </li>
          </>
          : <li className="user-block__item"><Link to={AppRoute.SIGN_IN} className="user-block__link">Sign in</Link></li>}
      </ul>
    </header>
  );
};
