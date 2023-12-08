import {Navigate} from 'react-router-dom';
import { EAppRoute, EAuthorizationStatus } from '../../constants.ts';
import { useTypedSelector } from '../../hooks/useTypedSelector.ts';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useTypedSelector((state) => state.authorizationStatus);
  const { children} = props;

  return (
    authorizationStatus === EAuthorizationStatus.AUTH
      ? children
      : <Navigate to={EAppRoute.SIGNIN} />
  );
}

export default PrivateRoute;
