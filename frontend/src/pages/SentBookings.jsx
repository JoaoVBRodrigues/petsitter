import { useEffect, useState } from 'react';
import api from '../services/api';
import { Loader2, Calendar, User as UserIcon, Clock } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { Link } from 'react-router-dom';

const StatusBadge = ({ status }) => {
  const styles = {
    PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800',
    CONFIRMED: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800',
    REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800'
  };

  const labels = {
    PENDING: 'Pendente',
    CONFIRMED: 'Aprovado',
    REJECTED: 'Recusado'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wide ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

export function SentBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await api.get('/bookings/sent');
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <Link to="/" className="text-primary-500 font-bold hover:underline mb-2 inline-block">← Voltar ao Dashboard</Link>
            <h2 className="text-3xl font-extrabold text-stone-800 dark:text-stone-100">Minhas Solicitações</h2>
            <p className="text-stone-500 dark:text-stone-400 mt-1">Acompanhe os pedidos de agendamento que você enviou.</p>
          </div>
          <ThemeToggle />
        </header>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 size={40} className="animate-spin text-primary-500" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white dark:bg-stone-800 p-12 rounded-[2rem] shadow-sm text-center border border-stone-100 dark:border-stone-700 flex flex-col items-center gap-4">
            <div className="bg-stone-100 dark:bg-stone-700 w-20 h-20 rounded-full flex items-center justify-center text-stone-400">
              <Calendar size={32} />
            </div>
            <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100">Nenhuma solicitação enviada</h3>
            <p className="text-stone-500 dark:text-stone-400 mb-4">Você ainda não solicitou nenhum pet sitter.</p>
            <Link to="/search" className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-bold transition-colors">
              Buscar Pet Sitters
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map(b => (
              <div key={b.id} className="bg-white dark:bg-stone-800 rounded-3xl p-6 shadow-sm border border-stone-100 dark:border-stone-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:shadow-md">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <UserIcon size={18} className="text-stone-400" />
                    <span className="font-bold text-lg text-stone-800 dark:text-stone-100">{b.sitter.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400">
                    <Clock size={16} />
                    <span>Datas: {b.dates}</span>
                  </div>
                </div>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
