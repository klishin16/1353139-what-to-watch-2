import React from 'react';
import { Link } from 'react-router-dom';
import { EAppRoute, EAuthorizationStatus } from '../../constants.ts';
import { useAppDispatch, useTypedSelector } from '../../hooks/useTypedSelector.ts';
import { logoutAction } from '../../store/api-actions.ts';

const Header = () => {
  const dispatch = useAppDispatch();
  const { authorizationStatus, user } = useTypedSelector((state) => state);

  const signOutHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <header className="page-header film-card__head">
      <div className="logo">
        <Link to={ EAppRoute.MAIN } className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <ul className="user-block">
        { authorizationStatus === EAuthorizationStatus.AUTH ?
          <>
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src={user?.avatarUrl || 'img/avatar.jpg'} alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link" onClick={signOutHandler}>Sign out</a>
            </li>
          </>
          : <li className="user-block__item"><Link to={EAppRoute.SIGNIN} className="user-block__link">Sign in</Link></li>}
      </ul>
    </header>
  );
};

export default Header;
