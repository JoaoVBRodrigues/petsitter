import { useEffect, useState } from 'react';
import api from '../services/api';
import { Loader2, Calendar, User as UserIcon, Clock, Check, X } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { Link } from 'react-router-dom';

const StatusBadge = ({ status }) => {
  const styles = {
    PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800',
    ACCEPTED: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800',
    DECLINED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800'
  };

  const labels = {
    PENDING: 'Pendente',
    ACCEPTED: 'Aprovado',
    DECLINED: 'Recusado'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wide ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

export function ReceivedBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      const res = await api.get('/bookings/received');
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdate = async (id, status) => {
    setActionLoading(id);
    try {
      await api.patch(`/bookings/${id}/status`, { status });
      fetchBookings(); // Atualiza lista
    } catch (err) {
      alert('Erro ao atualizar agendamento');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <Link to="/" className="text-primary-500 font-bold hover:underline mb-2 inline-block">← Voltar ao Dashboard</Link>
            <h2 className="text-3xl font-extrabold text-stone-800 dark:text-stone-100">Solicitações Recebidas</h2>
            <p className="text-stone-500 dark:text-stone-400 mt-1">Gerencie os pedidos de donos de pets.</p>
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
            <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100">Nenhuma solicitação recebida</h3>
            <p className="text-stone-500 dark:text-stone-400">Seu perfil ainda não recebeu pedidos de agendamento.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map(b => (
              <div key={b.id} className="bg-white dark:bg-stone-800 rounded-3xl p-6 shadow-sm border border-stone-100 dark:border-stone-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all hover:shadow-md">
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-3">
                    <UserIcon size={18} className="text-stone-400" />
                    <span className="font-bold text-lg text-stone-800 dark:text-stone-100">Cliente: {b.owner.name}</span>
                    <StatusBadge status={b.status} />
                  </div>
                  <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-700/50 p-3 rounded-xl w-fit">
                    <Clock size={16} className="text-primary-500" />
                    <span className="font-medium">Data solicitada: {new Date(b.requestedDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>
                  </div>
                </div>
                
                {b.status === 'PENDING' && (
                  <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0">
                    <button 
                      onClick={() => handleUpdate(b.id, 'ACCEPTED')}
                      disabled={actionLoading === b.id}
                      className="flex-1 md:flex-none bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {actionLoading === b.id ? <Loader2 size={18} className="animate-spin" /> : <><Check size={18} /> Aceitar</>}
                    </button>
                    <button 
                      onClick={() => handleUpdate(b.id, 'DECLINED')}
                      disabled={actionLoading === b.id}
                      className="flex-1 md:flex-none bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400 px-5 py-2.5 rounded-xl font-bold transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {actionLoading === b.id ? <Loader2 size={18} className="animate-spin" /> : <><X size={18} /> Recusar</>}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
