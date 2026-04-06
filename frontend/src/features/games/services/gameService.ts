import { fetchClient } from '../../../api/fetch-client';
import type { CreateGameRequest, GameSession } from '../types';

export const gameService = {
  /**
   * Cria uma nova sessão de jogo no backend
   */
  async createGame(payload: CreateGameRequest): Promise<GameSession> {
    return fetchClient<GameSession>('/games', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Obtém o estado atual de uma sessão
   */
  async getGame(id: string): Promise<GameSession> {
    return fetchClient<GameSession>(`/games/${id}`);
  },

  /**
   * Sorteia uma carta para o jogador da vez
   */
  async drawCard(id: string): Promise<GameSession> {
    return fetchClient<GameSession>(`/games/${id}/draw`, {
      method: 'POST',
    });
  },

  /**
   * Adiciona uma nova regra customizada (Carta 3)
   */
  async addRule(id: string, rule: string): Promise<GameSession> {
    return fetchClient<GameSession>(`/games/${id}/rule`, {
      method: 'POST',
      body: JSON.stringify({ rule }),
    });
  },
};
