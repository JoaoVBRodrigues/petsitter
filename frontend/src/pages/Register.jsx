import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { Dog, Loader2 } from 'lucide-react';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('OWNER');
  const [error, setError] = useState('');
  const [loadingLocal, setLoadingLocal] = useState(false);
  
  const { register, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoadingLocal(true);
    setError('');
    try {
      await register(name, email, password, role);
      await login(email, password);
      navigate('/');
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors.map(e => e.message).join(', '));
      } else {
        setError(err.response?.data?.message || 'Erro ao registrar');
      }
      setLoadingLocal(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-900">
      <div className="absolute top-4 right-4"><ThemeToggle /></div>
      <div className="flex-1 flex flex-col items-center justify-center p-4 py-12">
        <div className="mb-6 flex flex-col items-center gap-3 text-primary-500">
          <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-3xl">
            <Dog size={40} />
          </div>
        </div>
        
        <form onSubmit={handleRegister} className="bg-white dark:bg-stone-800 p-8 sm:p-10 rounded-[2rem] shadow-sm border border-stone-100 dark:border-stone-700 w-full max-w-md flex flex-col gap-4">
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">Criar uma conta</h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">Junte-se ao PetSitters Connect</p>
          </div>
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm text-center font-medium border border-red-100 dark:border-red-900/30">
              {error}
            </div>
          )}
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-stone-700 dark:text-stone-300">Nome Completo</label>
            <input 
              type="text" 
              placeholder="João da Silva" 
              className="border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all dark:text-stone-100"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-stone-700 dark:text-stone-300">E-mail</label>
            <input 
              type="email" 
              placeholder="seu@email.com" 
              className="border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all dark:text-stone-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-stone-700 dark:text-stone-300">Senha</label>
            <input 
              type="password" 
              placeholder="Mínimo 6 caracteres" 
              className="border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all dark:text-stone-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-stone-700 dark:text-stone-300">O que você é?</label>
            <select 
              className="border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all dark:text-stone-100 cursor-pointer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="OWNER">🐶 Sou Dono de Pet</option>
              <option value="SITTER">🏠 Sou Pet Sitter</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            disabled={loadingLocal}
            className="mt-4 bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-xl font-bold transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loadingLocal && <Loader2 size={18} className="animate-spin" />}
            Cadastrar
          </button>

          <p className="text-sm text-center text-stone-500 dark:text-stone-400 mt-2">
            Já tem conta? <Link to="/login" className="text-primary-500 font-bold hover:underline">Faça login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
