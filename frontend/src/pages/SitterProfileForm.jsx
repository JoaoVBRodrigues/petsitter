import { useState, useEffect } from 'react';
import api from '../services/api';
import { Loader2, Save } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { Link } from 'react-router-dom';

export function SitterProfileForm() {
  const [bio, setBio] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [availability, setAvailability] = useState('');
  const [petTypes, setPetTypes] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await api.get('/sitter-profiles/me');
        if (res.data) {
          setBio(res.data.bio || '');
          setPricePerHour(res.data.pricePerHour || '');
          setAvailability(res.data.availability || '');
          setPetTypes(res.data.petTypes || '');
        }
      } catch (err) {
        console.error("Nenhum perfil encontrado", err);
      } finally {
        setFetchLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await api.put('/sitter-profiles/me', {
        bio,
        pricePerHour: parseFloat(pricePerHour),
        availability,
        petTypes
      });
      setMessage('Perfil salvo com sucesso!');
    } catch (err) {
      alert('Erro ao salvar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 p-8">
      <div className="max-w-3xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <Link to="/" className="text-primary-500 font-bold hover:underline mb-2 inline-block">← Voltar ao Dashboard</Link>
            <h2 className="text-3xl font-extrabold text-stone-800 dark:text-stone-100">Meu Perfil Profissional</h2>
            <p className="text-stone-500 dark:text-stone-400 mt-1">Atualize suas informações para que os donos encontrem você.</p>
          </div>
          <ThemeToggle />
        </header>

        {fetchLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary-500" size={40} /></div>
        ) : (
          <div className="bg-white dark:bg-stone-800 p-8 sm:p-10 rounded-[2rem] shadow-sm border border-stone-100 dark:border-stone-700">
            {message && (
              <div className="mb-6 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 p-4 rounded-xl font-bold border border-emerald-100 dark:border-emerald-900/30">
                {message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-stone-700 dark:text-stone-300">Sobre você (Bio)</label>
                <textarea 
                  className="border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 p-4 rounded-xl min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-stone-100 transition-all resize-y"
                  placeholder="Conte um pouco sobre sua experiência com pets..."
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">Preço por Hora (R$)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 font-bold">R$</span>
                    <input 
                      type="number" 
                      className="border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 p-3 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-stone-100 transition-all w-full"
                      placeholder="35.00"
                      value={pricePerHour}
                      onChange={e => setPricePerHour(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">Disponibilidade</label>
                  <input 
                    type="text" 
                    className="border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-stone-100 transition-all"
                    placeholder="Seg a Sex, tarde"
                    value={availability}
                    onChange={e => setAvailability(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold text-stone-700 dark:text-stone-300">Preferências de Pets</label>
                <input 
                  type="text" 
                  className="border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-stone-100 transition-all"
                  placeholder="Ex: Cães pequenos, Gatos, Pássaros"
                  value={petTypes}
                  onChange={e => setPetTypes(e.target.value)}
                />
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-700 mt-2">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-bold transition-colors disabled:opacity-70 flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  Salvar Perfil
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
