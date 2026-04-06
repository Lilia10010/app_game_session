import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useCreateGame } from '../features/games/hooks/useGame';
import { Gender } from '../features/games/types';
import { UserPlus, Trash2, Play } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export const CreateGame: React.FC = () => {
  const navigate = useNavigate();
  const createGameMutation = useCreateGame();
  
  const [players, setPlayers] = useState([
    { name: '', gender: Gender.Male },
    { name: '', gender: Gender.Male },
  ]);

  const addPlayer = () => {
    setPlayers([...players, { name: '', gender: Gender.Male }]);
  };

  const removePlayer = (index: number) => {
    if (players.length > 2) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  const updatePlayer = (index: number, field: string, value: any) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], [field]: value };
    setPlayers(newPlayers);
  };

  const handleCreate = async () => {
    try {
      const payload = {
        host_id: uuidv4(),
        players: players.map(p => ({
          name: p.name || 'Jogador Anônimo',
          gender: p.gender
        })),
      };
      
      const game = await createGameMutation.mutateAsync(payload);
      navigate(`/games/${game.id}`);
    } catch (error) {
      console.error(error);
      alert('Erro ao criar jogo');
    }
  };

  return (
    <div className="w-full max-w-220 mx-auto py-8 px-4">
      <Card title="Nova Sessão de Sueca">
        <p className="text-sm text-white/60 mb-8 italic">
          O anfitrião define a ordem dos jogadores. A diversão começa agora.
        </p>

        <div className="space-y-6">
          {players.map((player, index) => (
            <div key={index} className="flex gap-4 items-end animate-in fade-in slide-in-from-left duration-300">
              <div className="flex-1">
                <Input
                  label={`Jogador ${index + 1}`}
                  placeholder="Nome do Jogador"
                  value={player.name}
                  onChange={(e) => updatePlayer(index, 'name', e.target.value)}
                />
              </div>
              
              <div className="w-32">
                <select
                  className="w-full bg-white/5 border border-white/20 px-3 py-2 text-sm text-white focus:border-neon-cyan focus:outline-none transition-all"
                  value={player.gender}
                  onChange={(e) => updatePlayer(index, 'gender', e.target.value)}
                >
                  <option value={Gender.Male} className="bg-black-soft">Masculino</option>
                  <option value={Gender.Female} className="bg-black-soft">Feminino</option>
                </select>
              </div>

              <button
                onClick={() => removePlayer(index)}
                className="p-2 text-white/30 hover:text-neon-pink transition-colors mb-1"
                disabled={players.length <= 2}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          <div className="flex flex-col gap-4 pt-4">
            <Button
              variant="outline"
              onClick={addPlayer}
              className="flex gap-2"
            >
              <UserPlus size={18} /> Adicionar Jogador
            </Button>

            <Button
              variant="primary"
              onClick={handleCreate}
              className="flex gap-2"
              fullWidth
              disabled={createGameMutation.isPending}
            >
              <Play size={18} fill="currentColor" /> {createGameMutation.isPending ? 'Iniciando...' : 'Iniciar Jogo'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
