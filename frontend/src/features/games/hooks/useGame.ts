import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { gameService } from '../services/gameService';
import type { CreateGameRequest } from '../types';

export const useGame = (id: string) => {
  return useQuery({
    queryKey: ['game', id],
    queryFn: () => gameService.getGame(id),
    enabled: !!id,
    refetchInterval: 3000, // Sync state every 3 seconds
  });
};

export const useCreateGame = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (payload: CreateGameRequest) => gameService.createGame(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(['game', data.id], data);
    },
  });
};

export const useDrawCard = (id: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => gameService.drawCard(id),
    onSuccess: (data) => {
      queryClient.setQueryData(['game', id], data);
    },
  });
};

export const useAddRule = (id: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (rule: string) => gameService.addRule(id, rule),
    onSuccess: (data) => {
      queryClient.setQueryData(['game', id], data);
    },
  });
};
