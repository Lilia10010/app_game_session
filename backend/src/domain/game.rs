use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, ToSchema)]
pub enum Gender {
    /// Masculino
    Male,
    /// Feminino
    Female,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, ToSchema)]
pub enum Card {
    Ace,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Default, ToSchema)]
pub struct Player {
    /// ID único do jogador
    pub id: Uuid,
    /// Nome do jogador
    pub name: String,
    /// Gênero do jogador (usado para regras específicas de cartas como Q e K)
    pub gender: Gender,
    /// Ordem de turno (definida pelo Host)
    pub turn_order: u8,
    /// Cartas guardadas na mão (Ex: 4 - Licença e 6 - Continência)
    pub hand: Vec<Card>,
    /// Indica se o jogador possui uma licença ativa para sair/celular
    pub has_license: bool,
    /// Indica se o jogador possui uma continência ativa (6)
    pub has_salute: bool,
}

impl Default for Gender {
    fn default() -> Self {
        Gender::Male
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, ToSchema)]
pub enum GameStatus {
    /// O jogo ainda não começou
    WaitingToStart,
    /// O jogo está em andamento
    InProgress,
    /// O baralho acabou e o jogo foi finalizado
    Finished,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, ToSchema)]
pub struct GameSession {
    /// ID único da sessão de jogo
    pub id: Uuid,
    /// ID do anfitrião (Host) que iniciou o jogo
    pub host_id: Uuid,
    /// Lista de jogadores na partida
    pub players: Vec<Player>,
    /// O baralho atual (cartas restantes)
    pub deck: Vec<Card>,
    /// A última carta sorteada
    pub drawn_card: Option<Card>,
    /// Índice do jogador cujo turno é o atual
    pub current_turn: usize,
    /// Status atual da partida
    pub status: GameStatus,
    /// Lista de regras ativas criadas pelo sorteio da carta 3
    pub active_rules: Vec<String>,
}
