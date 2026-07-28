import { useEffect, useState } from 'react';
import api from '../services/api';
import { Search, MapPin, DollarSign, Loader2, Calendar } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { Link } from 'react-router-dom';

export function SitterSearch() {
  const [sitters, setSitters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchSitters() {
      try {
        const res = await api.get('/sitter-profiles');
        setSitters(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSitters();
  }, []);

  const handleBook = async (sitterId) => {
    const dates = prompt('Quais as datas do agendamento? (ex: 12/10 a 15/10)');
    if (!dates) return;
    
    setBookingLoading(sitterId);
    try {
      await api.post('/bookings', { sitterId, dates });
      setMessage('Solicitação enviada com sucesso!');
    } catch (err) {
      alert('Erro ao enviar solicitação');
    } finally {
      setBookingLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <Link to="/" className="text-primary-500 font-bold hover:underline mb-2 inline-block">← Voltar ao Dashboard</Link>
            <h2 className="text-3xl font-extrabold text-stone-800 dark:text-stone-100">Encontrar Pet Sitters</h2>
            <p className="text-stone-500 dark:text-stone-400 mt-1">Conecte-se com os melhores cuidadores da região.</p>
          </div>
          <ThemeToggle />
        </header>
        
        {message && (
          <div className="mb-6 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 p-4 rounded-xl font-bold flex items-center justify-between border border-emerald-100 dark:border-emerald-900/30">
            <span>{message}</span>
            <button onClick={() => setMessage('')} className="hover:text-emerald-800">×</button>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 size={40} className="animate-spin text-primary-500" />
          </div>
        ) : sitters.length === 0 ? (
          <div className="bg-white dark:bg-stone-800 p-12 rounded-[2rem] shadow-sm text-center border border-stone-100 dark:border-stone-700 flex flex-col items-center gap-4">
            <div className="bg-stone-100 dark:bg-stone-700 w-20 h-20 rounded-full flex items-center justify-center text-stone-400">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100">Nenhum sitter encontrado</h3>
            <p className="text-stone-500 dark:text-stone-400">Tente buscar novamente mais tarde.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sitters.map(sitter => (
              <div key={sitter.id} className="bg-white dark:bg-stone-800 rounded-3xl p-6 shadow-sm hover:shadow-md border border-stone-100 dark:border-stone-700 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-extrabold text-lg">
                      {sitter.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg text-stone-800 dark:text-stone-100">{sitter.user.name}</h3>
                      <p className="text-sm text-stone-500 dark:text-stone-400 flex items-center gap-1">
                        <MapPin size={14} /> Brasil
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-stone-600 dark:text-stone-300 text-sm line-clamp-3">
                      "{sitter.bio}"
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2 mb-6 text-sm">
                    <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-700/50 p-2 rounded-lg">
                      <DollarSign size={16} className="text-primary-500" />
                      <span className="font-semibold">R$ {sitter.pricePerHour}/hora</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-700/50 p-2 rounded-lg">
                      <Calendar size={16} className="text-emerald-500" />
                      <span>{sitter.availability}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleBook(sitter.userId)}
                  disabled={bookingLoading === sitter.userId}
                  className="w-full bg-stone-800 hover:bg-stone-900 dark:bg-primary-500 dark:hover:bg-primary-600 text-white py-3 rounded-xl font-bold transition-colors flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {bookingLoading === sitter.userId ? <Loader2 size={18} className="animate-spin" /> : 'Solicitar Agendamento'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
