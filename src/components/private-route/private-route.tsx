import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants.ts';
import { useTypedSelector } from '../../hooks/use-typed-selector.ts';
import { Loader } from '../loader/loader.tsx';
import { getAuthorizationStatus } from '../../store/auth/auth.selectors.ts';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useTypedSelector(getAuthorizationStatus);
  const { children} = props;

  if (authorizationStatus === AuthorizationStatus.UNKNOWN) {
    return <Loader />;
  }

  return (
    authorizationStatus === AuthorizationStatus.AUTH
      ? children
      : <Navigate to={AppRoute.SIGN_IN} />
  );
}

export default PrivateRoute;
