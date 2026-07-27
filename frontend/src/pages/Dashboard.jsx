import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">PetSitters Connect</h1>
        <div className="flex gap-4 items-center">
          <span>Olá, {user?.name} ({user?.role === 'OWNER' ? 'Dono' : 'Sitter'})</span>
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 font-bold text-sm">Sair</button>
        </div>
      </header>
      
      <main className="p-8 flex-1">
        {user?.role === 'OWNER' ? (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Painel do Dono</h2>
            <div className="flex gap-4">
              <Link to="/search" className="bg-blue-100 text-blue-800 p-6 rounded shadow flex-1 hover:bg-blue-200 transition text-center font-bold text-lg">
                Buscar Sitters
              </Link>
              <Link to="/sent-bookings" className="bg-green-100 text-green-800 p-6 rounded shadow flex-1 hover:bg-green-200 transition text-center font-bold text-lg">
                Minhas Solicitações
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">Painel do Pet Sitter</h2>
            <div className="flex gap-4">
              <Link to="/profile" className="bg-blue-100 text-blue-800 p-6 rounded shadow flex-1 hover:bg-blue-200 transition text-center font-bold text-lg">
                Editar Meu Perfil
              </Link>
              <Link to="/received-bookings" className="bg-green-100 text-green-800 p-6 rounded shadow flex-1 hover:bg-green-200 transition text-center font-bold text-lg">
                Solicitações Recebidas
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
