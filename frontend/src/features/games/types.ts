export type Gender = 'Male' | 'Female';

export const Gender = {
  Male: 'Male',
  Female: 'Female',
} as const;

export type Card = 
  | 'Ace' | 'Two' | 'Three' | 'Four' | 'Five' | 'Six' | 'Seven'
  | 'Eight' | 'Nine' | 'Ten' | 'Jack' | 'Queen' | 'King';

export const Card = {
  Ace: 'Ace',
  Two: 'Two',
  Three: 'Three',
  Four: 'Four',
  Five: 'Five',
  Six: 'Six',
  Seven: 'Seven',
  Eight: 'Eight',
  Nine: 'Nine',
  Ten: 'Ten',
  Jack: 'Jack',
  Queen: 'Queen',
  King: 'King',
} as const;

export interface Player {
  id: string;
  name: string;
  gender: Gender;
  turn_order: number;
  hand: Card[];
  has_license: boolean;
  has_salute: boolean;
}

export type GameStatus = 'WaitingToStart' | 'InProgress' | 'Finished';

export const GameStatus = {
  WaitingToStart: 'WaitingToStart',
  InProgress: 'InProgress',
  Finished: 'Finished',
} as const;

export interface GameSession {
  id: string;
  host_id: string;
  players: Player[];
  deck: Card[];
  drawn_card?: Card;
  current_turn: number;
  status: GameStatus;
  active_rules: string[];
}

export interface CreateGameRequest {
  host_id: string;
  players: {
    name: string;
    gender: Gender;
  }[];
}
