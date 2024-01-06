import { Navigate } from 'react-router-dom';
import { EAppRoute, EAuthorizationStatus } from '../../constants.ts';
import { useTypedSelector } from '../../hooks/useTypedSelector.ts';
import { Loader } from '../loader/loader.tsx';
import { getAuthorizationStatus } from '../../store/auth/auth.selectors.ts';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useTypedSelector(getAuthorizationStatus);
  const { children} = props;

  if (authorizationStatus === EAuthorizationStatus.UNKNOWN) {
    return <Loader />;
  }

  return (
    authorizationStatus === EAuthorizationStatus.AUTH
      ? children
      : <Navigate to={EAppRoute.SIGN_IN} />
  );
}

export default PrivateRoute;
