import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export function ProtectedRoute({ children, role }) {
  const { signed, loading, user } = useContext(AuthContext);

  if (loading) return <div>Carregando...</div>;

  if (!signed) {
    return <Navigate to="/login" />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}
