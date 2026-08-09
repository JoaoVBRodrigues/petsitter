import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { SitterSearch } from './pages/SitterSearch';
import { SentBookings } from './pages/SentBookings';
import { ReceivedBookings } from './pages/ReceivedBookings';
import { SitterProfileForm } from './pages/SitterProfileForm';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Landing } from './pages/Landing';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          
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
