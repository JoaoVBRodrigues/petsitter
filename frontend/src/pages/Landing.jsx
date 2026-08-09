import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PawPrint, ShieldCheck, Heart, Search, Calendar, Star } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';

export function Landing() {
  const { signed, user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 transition-colors duration-300 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-500/20 blur-[100px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <PawPrint className="text-primary-500 w-8 h-8" />
          <span className="font-heading font-bold text-2xl text-stone-800 dark:text-stone-100">
            PetSitters Connect
          </span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {signed ? (
            <Link 
              to="/dashboard" 
              className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2 rounded-full font-semibold transition-transform hover:-translate-y-0.5"
            >
              Ir para o Painel
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-stone-600 dark:text-stone-300 font-semibold hover:text-primary-500 transition-colors">
                Entrar
              </Link>
              <Link 
                to="/register" 
                className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2 rounded-full font-semibold transition-transform hover:-translate-y-0.5 shadow-lg shadow-primary-500/30"
              >
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 pt-16 pb-24 text-center">
        <h1 className="text-5xl md:text-7xl font-heading font-bold text-stone-900 dark:text-white leading-tight mb-6 max-w-4xl mx-auto">
          Cuidado e <span className="text-primary-500">carinho</span> para o seu melhor amigo, em qualquer lugar.
        </h1>
        <p className="text-lg md:text-xl text-stone-600 dark:text-stone-300 mb-10 max-w-2xl mx-auto">
          Encontre cuidadores apaixonados e verificados perto de você. Viaje tranquilo sabendo que o seu pet está em ótimas mãos.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link 
            to={signed ? "/dashboard" : "/register"} 
            className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-xl hover:shadow-primary-500/40 flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" /> Encontrar um Sitter
          </Link>
          <Link 
            to={signed ? "/dashboard" : "/register"} 
            className="w-full sm:w-auto glass-panel text-stone-800 dark:text-stone-200 px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-white/90 dark:hover:bg-stone-800/90 flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5 text-rose-500" /> Quero ser Sitter
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-3xl text-center transform transition-transform hover:-translate-y-2">
            <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-stone-800 dark:text-stone-100">Perfis Verificados</h3>
            <p className="text-stone-600 dark:text-stone-400">Todos os cuidadores passam por um rigoroso processo de verificação de identidade e avaliações.</p>
          </div>
          
          <div className="glass-panel p-8 rounded-3xl text-center transform transition-transform hover:-translate-y-2">
            <div className="w-16 h-16 mx-auto bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center mb-6">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-stone-800 dark:text-stone-100">Agendamento Fácil</h3>
            <p className="text-stone-600 dark:text-stone-400">Reserve as datas que você precisa com apenas alguns cliques. Sem burocracia e com total transparência.</p>
          </div>

          <div className="glass-panel p-8 rounded-3xl text-center transform transition-transform hover:-translate-y-2">
            <div className="w-16 h-16 mx-auto bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center mb-6">
              <Star className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-stone-800 dark:text-stone-100">Avaliações Reais</h3>
            <p className="text-stone-600 dark:text-stone-400">Leia a experiência de outros donos para escolher o melhor match para o seu animalzinho.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
