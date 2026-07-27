import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('OWNER');
  const [error, setError] = useState('');
  
  const { register, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password, role);
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao registrar');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-96 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center">Cadastro</h2>
        
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        
        <input 
          type="text" 
          placeholder="Nome" 
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input 
          type="email" 
          placeholder="E-mail" 
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input 
          type="password" 
          placeholder="Senha" 
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select 
          className="border p-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="OWNER">Dono de Pet</option>
          <option value="SITTER">Pet Sitter</option>
        </select>
        
        <button type="submit" className="bg-green-600 text-white p-2 rounded font-bold hover:bg-green-700">
          Cadastrar
        </button>

        <p className="text-sm text-center">
          Já tem conta? <Link to="/login" className="text-blue-600">Faça login</Link>
        </p>
      </form>
    </div>
  );
}
