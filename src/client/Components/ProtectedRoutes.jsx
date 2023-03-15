import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';


const ProtectedRoutes = () => {
  const { loggedIn } = useAuth();

  return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
