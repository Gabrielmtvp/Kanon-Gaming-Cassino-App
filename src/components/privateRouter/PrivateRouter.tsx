import { parseCookies } from 'nookies';
import { FC } from 'react';
import { Navigate } from 'react-router-dom';

interface PropType {
  component: React.FC;
}

const PrivateRoute: FC<PropType> = ({ component: Component }) => {
  const cookies = parseCookies();
  const isAuthenticated = Object.keys(cookies).length > 0;
  if (isAuthenticated) return <Component />;
  return <Navigate to="/" />;
};

export default PrivateRoute;
