import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = localStorage.getItem('user');
      const storagedToken = localStorage.getItem('token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
      }
      setLoading(false);
    }

    loadStoragedData();
  }, []);

  async function login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    
    const { user, token } = response.data;
    
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    
    setUser(user);
  }

  async function register(name, email, password, role) {
    const response = await api.post('/auth/register', { name, email, password, role });
    return response.data;
  }

  function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
