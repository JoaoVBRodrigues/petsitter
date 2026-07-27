import { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function SitterSearch() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [profiles, setProfiles] = useState([]);
  const [petType, setPetType] = useState('');
  const [loading, setLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState('');
  const [selectedSitter, setSelectedSitter] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user && user.role !== 'OWNER') {
      navigate('/');
      return;
    }

    loadProfiles();
  }, [user, navigate]);

  const loadProfiles = async (filter = '') => {
    setLoading(true);
    try {
      const response = await api.get(`/sitter-profiles${filter ? `?petType=${filter}` : ''}`);
      setProfiles(response.data);
    } catch (error) {
      console.error('Erro ao buscar sitters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadProfiles(petType);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await api.post('/bookings', {
        sitterId: selectedSitter,
        requestedDate: bookingDate
      });
      setMessage('Solicitação enviada com sucesso!');
      setSelectedSitter(null);
      setBookingDate('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao agendar');
    }
  };

  if (loading && profiles.length === 0) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Buscar Pet Sitters</h1>
      {message && <div className="mb-4 text-green-600 font-bold">{message}</div>}
      
      <form onSubmit={handleSearch} className="mb-8 flex gap-4">
        <input 
          type="text" 
          placeholder="Filtrar por tipo de pet..." 
          className="border p-2 rounded flex-1 max-w-sm"
          value={petType}
          onChange={(e) => setPetType(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white font-bold p-2 rounded hover:bg-blue-700">
          Buscar
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map(profile => (
          <div key={profile.id} className="bg-white p-4 rounded shadow border flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold">{profile.user?.name}</h2>
              <p className="text-gray-600 mt-2 line-clamp-3">{profile.bio}</p>
              <div className="mt-4 flex flex-col gap-1 text-sm">
                <span className="font-semibold text-green-700">R$ {Number(profile.pricePerHour).toFixed(2)}/h</span>
                <span><strong>Disponível:</strong> {profile.availability}</span>
                <span><strong>Pets:</strong> {profile.petTypes}</span>
              </div>
            </div>
            {selectedSitter === profile.userId ? (
              <form onSubmit={handleBooking} className="mt-4 flex flex-col gap-2">
                <input 
                  type="datetime-local" 
                  className="border p-2 rounded text-sm"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                />
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 bg-green-600 text-white font-bold p-2 rounded text-sm">Confirmar</button>
                  <button type="button" onClick={() => setSelectedSitter(null)} className="flex-1 bg-gray-300 text-gray-700 font-bold p-2 rounded text-sm">Cancelar</button>
                </div>
              </form>
            ) : (
              <button 
                className="mt-4 w-full bg-blue-100 text-blue-700 font-bold p-2 rounded hover:bg-blue-200"
                onClick={() => { setSelectedSitter(profile.userId); setMessage(''); }}
              >
                Solicitar Agendamento
              </button>
            )}
          </div>
        ))}
        {profiles.length === 0 && !loading && (
          <p className="text-gray-500">Nenhum sitter encontrado.</p>
        )}
      </div>
    </div>
  );
}
