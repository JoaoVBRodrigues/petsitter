import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { Dog, Search, Calendar, User as UserIcon, LogOut } from 'lucide-react';

export function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const isOwner = user?.role === 'OWNER';

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 p-4 px-8 flex justify-between items-center shadow-sm sticky top-0 z-10 transition-colors">
        <div className="flex items-center gap-2 text-primary-500">
          <Dog size={28} />
          <h1 className="text-xl font-extrabold tracking-tight">PetSitters Connect</h1>
        </div>
        <div className="flex gap-4 items-center">
          <ThemeToggle />
          <div className="hidden md:flex items-center gap-2">
            <span className="font-semibold">{user?.name}</span>
            <span className="text-xs bg-stone-100 dark:bg-stone-700 px-3 py-1 rounded-full text-stone-600 dark:text-stone-300 font-bold tracking-wide">
              {isOwner ? 'DONO' : 'SITTER'}
            </span>
          </div>
          <button 
            onClick={logout} 
            className="flex items-center gap-2 bg-stone-100 hover:bg-red-50 text-red-600 dark:bg-stone-700 dark:hover:bg-red-900/30 px-3 py-2 rounded-xl font-bold text-sm transition-all"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </header>
      
      <main className="p-8 flex-1 max-w-5xl mx-auto w-full">
        <div className="flex flex-col gap-8 mt-4">
          <div>
            <h2 className="text-3xl font-extrabold mb-2">
              Bem-vindo, {user?.name}!
            </h2>
            <p className="text-stone-500 dark:text-stone-400">
              {isOwner ? 'Encontre o cuidador perfeito para o seu pet hoje mesmo.' : 'Gerencie seu perfil e suas solicitações de trabalho.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isOwner ? (
              <>
                <Link to="/search" className="group bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-sm hover:shadow-md border border-stone-100 dark:border-stone-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all hover:-translate-y-1 flex flex-col gap-4">
                  <div className="bg-orange-100 dark:bg-orange-900/30 w-14 h-14 rounded-2xl flex items-center justify-center text-primary-500 group-hover:scale-110 transition-transform">
                    <Search size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">Buscar Sitters</h3>
                    <p className="text-stone-500 dark:text-stone-400 text-sm">Navegue pelos perfis e encontre o profissional ideal.</p>
                  </div>
                </Link>
                <Link to="/sent-bookings" className="group bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-sm hover:shadow-md border border-stone-100 dark:border-stone-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all hover:-translate-y-1 flex flex-col gap-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 w-14 h-14 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                    <Calendar size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">Minhas Solicitações</h3>
                    <p className="text-stone-500 dark:text-stone-400 text-sm">Acompanhe o status dos seus pedidos de agendamento.</p>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="group bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-sm hover:shadow-md border border-stone-100 dark:border-stone-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all hover:-translate-y-1 flex flex-col gap-4">
                  <div className="bg-orange-100 dark:bg-orange-900/30 w-14 h-14 rounded-2xl flex items-center justify-center text-primary-500 group-hover:scale-110 transition-transform">
                    <UserIcon size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">Editar Meu Perfil</h3>
                    <p className="text-stone-500 dark:text-stone-400 text-sm">Mantenha suas informações atualizadas para atrair clientes.</p>
                  </div>
                </Link>
                <Link to="/received-bookings" className="group bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-sm hover:shadow-md border border-stone-100 dark:border-stone-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all hover:-translate-y-1 flex flex-col gap-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 w-14 h-14 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                    <Calendar size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">Solicitações Recebidas</h3>
                    <p className="text-stone-500 dark:text-stone-400 text-sm">Gerencie os pedidos de donos de pets e responda rapidamente.</p>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
