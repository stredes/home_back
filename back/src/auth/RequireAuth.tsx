import { Navigate } from 'react-router-dom';
import { useAuth } from './auth.context';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}
