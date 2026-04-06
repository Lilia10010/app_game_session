import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card as CardUI } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useGame, useDrawCard, useAddRule } from '../features/games/hooks/useGame';
import { Card as CardType, GameStatus } from '../features/games/types';
import { PlusCircle, AlertTriangle } from 'lucide-react';

export const GameSession: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: game, isLoading, error } = useGame(id!);
  const drawCardMutation = useDrawCard(id!);
  const addRuleMutation = useAddRule(id!);
  
  const [newRule, setNewRule] = useState('');
  const [showRuleInput, setShowRuleInput] = useState(false);

  if (isLoading) return <div className="text-center py-20 text-neon-cyan animate-pulse">Sincronizando com o servidor...</div>;
  if (error || !game) return <div className="text-center py-20 text-neon-pink">Erro ao carregar sessão. Verifique o ID.</div>;

  const currentPlayer = game.players[game.current_turn];
  const isGameOver = game.status === GameStatus.Finished;

  const handleDraw = async () => {
    try {
      await drawCardMutation.mutateAsync();
      setNewRule('');
      setShowRuleInput(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddRule = async () => {
    if (!newRule.trim()) return;
    try {
      await addRuleMutation.mutateAsync(newRule);
      setNewRule('');
      setShowRuleInput(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Coluna Central - Jogo */}
      <div className="md:col-span-2 space-y-6">
        <CardUI title={isGameOver ? "Fim de Jogo" : "Vez de " + currentPlayer.name}>
          {!isGameOver ? (
            <div className="flex flex-col items-center gap-8 py-10">
              <div className="w-48 h-72 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center relative group">
                {game.drawn_card ? (
                  <div className="text-center animate-in zoom-in duration-500">
                    <span className="text-6xl font-primary text-neon-cyan drop-shadow-[0_0_15px_rgba(0,243,255,1)]">
                      {game.drawn_card}
                    </span>
                    <p className="mt-4 text-xs tracking-widest text-white/50 uppercase">Carta Sorteada</p>
                  </div>
                ) : (
                  <span className="text-white/10 group-hover:text-white/30 transition-colors">Baralho Pronto</span>
                )}
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleDraw}
                disabled={drawCardMutation.isPending}
                className="w-full max-w-xs"
              >
                {drawCardMutation.isPending ? 'Sorteando...' : 'Puxar Carta'}
              </Button>

              {game.drawn_card === CardType.Three && !showRuleInput && (
                <Button variant="outline" onClick={() => setShowRuleInput(true)} className="flex gap-2">
                  <PlusCircle size={18} /> Criar Regra
                </Button>
              )}

              {showRuleInput && (
                <div className="w-full space-y-4 animate-in slide-in-from-bottom duration-300">
                  <Input
                    label="Nova Regra do Jogo"
                    placeholder="Ex: Não falar nomes próprios"
                    value={newRule}
                    onChange={(e) => setNewRule(e.target.value)}
                  />
                  <Button variant="secondary" onClick={handleAddRule} fullWidth disabled={addRuleMutation.isPending}>
                    {addRuleMutation.isPending ? 'Salvando...' : 'Aplicar Regra'}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20 space-y-6">
               <AlertTriangle className="mx-auto text-neon-pink w-16 h-16" />
               <h2 className="text-2xl text-white">O baralho acabou!</h2>
               <Button variant="outline" onClick={() => navigate('/games')}>Iniciar Novo Jogo</Button>
            </div>
          )}
        </CardUI>

        {/* Regras Ativas */}
        <CardUI title="Regras em Vigor">
          <ul className="space-y-3">
            {game.active_rules.length > 0 ? (
              game.active_rules.map((rule, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-white/80 animate-in fade-in slide-in-from-right duration-500">
                  <span className="text-neon-cyan font-mono">#{idx + 1}</span> 
                  {rule}
                </li>
              ))
            ) : (
              <p className="text-xs text-white/30 italic">Nenhuma regra customizada ativa ainda.</p>
            )}
          </ul>
        </CardUI>
      </div>

      {/* Coluna Lateral - Jogadores e Status */}
      <div className="space-y-6">
        <CardUI title="Ordem dos Jogadores">
          <div className="space-y-4">
            {game.players.map((player, idx) => (
              <div 
                key={player.id}
                className={`flex justify-between items-center p-3 border-l-2 transition-all duration-500 ${
                  idx === game.current_turn ? 'border-neon-cyan bg-neon-cyan/5' : 'border-white/10'
                }`}
              >
                <div className="flex flex-col">
                  <span className={`text-sm ${idx === game.current_turn ? 'text-neon-cyan font-bold' : 'text-white/60'}`}>
                    {player.name}
                  </span>
                  <span className="text-[10px] text-white/30 uppercase tracking-tighter">
                    {player.gender === 'Male' ? 'Masculino' : 'Feminino'}
                  </span>
                </div>
                
                <div className="flex gap-1">
                   {player.has_license && <div className="w-2 h-2 rounded-full bg-neon-green shadow-[0_0_5px_rgba(57,255,20,0.8)]" title="Tem Licença"></div>}
                   {player.has_salute && <div className="w-2 h-2 rounded-full bg-neon-purple shadow-[0_0_5px_rgba(157,0,255,0.8)]" title="Tem Continência"></div>}
                </div>
              </div>
            ))}
          </div>
        </CardUI>

        <div className="p-4 border border-white/5 bg-white/2 rounded-lg text-center font-mono">
           <span className="text-xs text-white/40 block mb-1 uppercase">Sessão ID</span>
           <span className="text-[10px] text-neon-cyan/60 break-all">{game.id}</span>
        </div>
      </div>
    </div>
  );
};
