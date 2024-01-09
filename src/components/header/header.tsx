import React, { PropsWithChildren } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants.ts';
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
    navigate(AppRoute.MyList);
  };

  return (
    <header className="page-header user-page__head">
      <div className="logo">
        <Link to={ AppRoute.Main } className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      { children }

      <ul className="user-block">
        { authorizationStatus === AuthorizationStatus.Auth ?
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
          : <li className="user-block__item"><Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link></li>}
      </ul>
    </header>
  );
};
