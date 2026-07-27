import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { SitterSearch } from './pages/SitterSearch';
import { SentBookings } from './pages/SentBookings';
import { ReceivedBookings } from './pages/ReceivedBookings';
import { SitterProfileForm } from './pages/SitterProfileForm';
import { ProtectedRoute } from './components/ProtectedRoute';

function RootRoute() {
  const { signed, loading } = useContext(AuthContext);
  if (loading) return <div>Carregando...</div>;
  return signed ? <Dashboard /> : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={<RootRoute />} />
          
          <Route path="/search" element={
            <ProtectedRoute role="OWNER"><SitterSearch /></ProtectedRoute>
          } />
          <Route path="/sent-bookings" element={
            <ProtectedRoute role="OWNER"><SentBookings /></ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute role="SITTER"><SitterProfileForm /></ProtectedRoute>
          } />
          <Route path="/received-bookings" element={
            <ProtectedRoute role="SITTER"><ReceivedBookings /></ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
