import { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function SentBookings() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role !== 'OWNER') {
      navigate('/');
      return;
    }

    loadBookings();
  }, [user, navigate]);

  const loadBookings = async () => {
    try {
      const response = await api.get('/bookings/sent');
      setBookings(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Solicitações Enviadas</h1>
      <div className="flex flex-col gap-4">
        {bookings.map(booking => (
          <div key={booking.id} className="bg-white p-4 rounded shadow border">
            <p className="font-bold text-lg">Sitter: {booking.sitter?.name}</p>
            <p className="text-gray-700">Data Solicitada: {new Date(booking.requestedDate).toLocaleString('pt-BR')}</p>
            {booking.sitter?.sitterProfile && (
               <p className="text-sm mt-1">Preço/h: R$ {Number(booking.sitter.sitterProfile.pricePerHour).toFixed(2)}</p>
            )}
            <p className="text-sm mt-2">
              Status: <span className={`font-bold px-2 py-1 rounded ${booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : booking.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {booking.status === 'PENDING' ? 'Pendente' : booking.status === 'ACCEPTED' ? 'Aceito' : 'Recusado'}
              </span>
            </p>
          </div>
        ))}
        {bookings.length === 0 && <p className="text-gray-500">Nenhuma solicitação enviada.</p>}
      </div>
    </div>
  );
}
