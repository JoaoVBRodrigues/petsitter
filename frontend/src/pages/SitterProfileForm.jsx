import { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function SitterProfileForm() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [bio, setBio] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [availability, setAvailability] = useState('');
  const [petTypes, setPetTypes] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    if (user && user.role !== 'SITTER') {
      navigate('/');
      return;
    }

    const loadProfile = async () => {
      try {
        const response = await api.get('/sitter-profiles/me');
        if (response.data) {
          setBio(response.data.bio || '');
          setPricePerHour(response.data.pricePerHour || '');
          setAvailability(response.data.availability || '');
          setPetTypes(response.data.petTypes || '');
        }
      } catch (error) {
        console.log('Nenhum perfil encontrado. Será criado ao salvar.');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      loadProfile();
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/sitter-profiles/me', {
        bio,
        pricePerHour: parseFloat(pricePerHour),
        availability,
        petTypes
      });
      setMessage('Perfil salvo com sucesso!');
    } catch (err) {
      setMessage('Erro ao salvar perfil.');
    }
  };

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Editar Perfil de Pet Sitter</h1>
      {message && <div className="mb-4 text-blue-600 font-bold">{message}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <textarea 
          placeholder="Sua bio..." 
          className="border p-2 rounded h-32"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input 
          type="number" 
          step="0.01"
          placeholder="Preço por Hora (R$)" 
          className="border p-2 rounded"
          value={pricePerHour}
          onChange={(e) => setPricePerHour(e.target.value)}
          required
        />
        <input 
          type="text" 
          placeholder="Disponibilidade (ex: Seg a Sex, manhã)" 
          className="border p-2 rounded"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Tipos de pet (ex: Cachorro, Gato)" 
          className="border p-2 rounded"
          value={petTypes}
          onChange={(e) => setPetTypes(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white font-bold p-2 rounded hover:bg-blue-700">
          Salvar Perfil
        </button>
      </form>
    </div>
  );
}
