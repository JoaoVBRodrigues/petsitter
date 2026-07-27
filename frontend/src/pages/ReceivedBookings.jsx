import { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function ReceivedBookings() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role !== 'SITTER') {
      navigate('/');
      return;
    }

    loadBookings();
  }, [user, navigate]);

  const loadBookings = async () => {
    try {
      const response = await api.get('/bookings/received');
      setBookings(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/bookings/${id}/status`, { status: newStatus });
      loadBookings(); 
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao atualizar');
    }
  };

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Solicitações Recebidas</h1>
      <div className="flex flex-col gap-4">
        {bookings.map(booking => (
          <div key={booking.id} className="bg-white p-4 rounded shadow border flex justify-between items-center">
            <div>
              <p className="font-bold text-lg">{booking.owner?.name} <span className="text-sm font-normal text-gray-500">({booking.owner?.email})</span></p>
              <p className="text-gray-700">Data Solicitada: {new Date(booking.requestedDate).toLocaleString('pt-BR')}</p>
              <p className="text-sm mt-1">Status: <span className={`font-bold ${booking.status === 'PENDING' ? 'text-yellow-600' : booking.status === 'ACCEPTED' ? 'text-green-600' : 'text-red-600'}`}>{booking.status}</span></p>
            </div>
            {booking.status === 'PENDING' && (
              <div className="flex gap-2">
                <button onClick={() => handleStatusChange(booking.id, 'ACCEPTED')} className="bg-green-600 text-white font-bold p-2 rounded hover:bg-green-700">Aceitar</button>
                <button onClick={() => handleStatusChange(booking.id, 'DECLINED')} className="bg-red-600 text-white font-bold p-2 rounded hover:bg-red-700">Recusar</button>
              </div>
            )}
          </div>
        ))}
        {bookings.length === 0 && <p className="text-gray-500">Nenhuma solicitação recebida.</p>}
      </div>
    </div>
  );
}
