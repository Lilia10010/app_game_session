import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CreateGame } from './pages/CreateGame';
import { GameSession } from './pages/GameSession';
import { UserList } from './pages/UserList';
import { ComponentShowcase } from './pages/ComponentShowcase';
import { User, Gamepad2, Info, Layout } from 'lucide-react';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen">
        {/* Navigation Bar */}
        <nav className="border-b border-white/5 bg-black-deep/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="font-primary text-xl tracking-tighter hover:text-neon-cyan transition-colors">
              SUECA<span className="text-xs  text-neon-cyan">.DG</span>
            </Link>
            
            <div className="flex gap-8">
              <Link to="/games" className="flex items-center gap-2 text-xs font-primary uppercase tracking-widest hover:text-neon-cyan transition-colors">
                <Gamepad2 size={16} /> Jogar
              </Link>
              <Link to="/users" className="flex items-center gap-2 text-xs font-primary uppercase tracking-widest hover:text-neon-cyan transition-colors">
                <User size={16} /> Jogadores
              </Link>
              <Link to="/components" className="flex items-center gap-2 text-xs font-primary uppercase tracking-widest hover:text-neon-cyan transition-colors">
                <Layout size={16} /> Style Guide
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-10">
          <Routes>
            <Route path="/" element={<HomeOverview />} />
            <Route path="/games" element={<CreateGame />} />
            <Route path="/games/:id" element={<GameSession />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/components" element={<ComponentShowcase />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const HomeOverview: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
    <h1 className="text-6xl font-primary">
      SUECA
    </h1>
      <h4 className="text-neon-cyan "> Drink Game Imersivo</h4> <br />
     
    <p className="text-lg text-white/50 font-secondary max-w-[34rem] mx-auto">
      Prepare-se para um jogo onde a regra é clara: ninguém sai, ninguém para. 
      A imersão é total e a sorte está no baralho.
    </p>
    
    <div className="pt-8 flex justify-center gap-6">
      <Link to="/games">
        <button className="bg-neon-cyan text-black-deep font-primary px-10 py-4 uppercase tracking-widest hover:bg-white hover:shadow-[0_0_30px_white] transition-all">
          Iniciar Partida
        </button>
      </Link>
      
      <div className="flex items-center gap-2 text-white/30 text-xs uppercase tracking-widest">
         <Info size={14} /> Siga as regras do Host
      </div>
    </div>
  </div>
);

export default App;