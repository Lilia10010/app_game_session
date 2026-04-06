import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '../api/fetch-client';
import { Card } from '../components/ui/Card';
import { User, Users } from 'lucide-react';

interface UserData {
  id: number;
  name: string;
}

export const UserList: React.FC = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchClient<UserData[]>('/users'),
  });

  return (
    <div className="max-w-220 mx-auto py-8 px-4">
      <Card title="Comunidade Sueca">
        <div className="flex items-center gap-2 mb-8 text-white/40">
          <Users size={18} />
          <span className="text-xs uppercase tracking-widest">Jogadores Cadastrados</span>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-10 text-white/20 animate-pulse">Consultando base de dados...</div>
          ) : users?.length ? (
            users.map((user) => (
              <div 
                key={user.id} 
                className="flex items-center gap-4 p-4 border border-white/5 bg-white/2 hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center text-neon-purple">
                   <User size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-primary uppercase tracking-tight">{user.name}</span>
                  <span className="text-[10px] text-white/30">ID: {user.id}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-white/30 italic">Nenhum jogador encontrado.</div>
          )}
        </div>
      </Card>
    </div>
  );
};
