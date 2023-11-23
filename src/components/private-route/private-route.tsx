import {Navigate} from 'react-router-dom';
import { EAppRoute, EAuthorizationStatus } from '../../constants.ts';

type PrivateRouteProps = {
  authorizationStatus: EAuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === EAuthorizationStatus.AUTH
      ? children
      : <Navigate to={EAppRoute.SIGNIN} />
  );
}

export default PrivateRoute;
