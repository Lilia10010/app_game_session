use crate::domain::game::{Card, GameSession, GameStatus, Gender, Player};
use rand::seq::SliceRandom;
use rand::thread_rng;
use uuid::Uuid;

pub struct GameService;

impl GameService {
    pub fn create_game(host_id: Uuid, player_data: Vec<(String, Gender)>) -> GameSession {
        // Criar baralho de 52 cartas
        let mut deck = Vec::with_capacity(52);
        let cards = vec![
            Card::Ace,
            Card::Two,
            Card::Three,
            Card::Four,
            Card::Five,
            Card::Six,
            Card::Seven,
            Card::Eight,
            Card::Nine,
            Card::Ten,
            Card::Jack,
            Card::Queen,
            Card::King,
        ];

        for _ in 0..4 {
            deck.extend(cards.clone());
        }

        // Embaralhar
        let mut rng = thread_rng();
        deck.shuffle(&mut rng);

        // Criar jogadores com a ordem definida pelo Host
        let players = player_data
            .into_iter()
            .enumerate()
            .map(|(i, (name, gender))| Player {
                id: Uuid::new_v4(),
                name,
                gender,
                turn_order: (i + 1) as u8,
                hand: Vec::new(),
                has_license: false,
                has_salute: false,
            })
            .collect();

        GameSession {
            id: Uuid::new_v4(),
            host_id,
            players,
            deck,
            drawn_card: None,
            current_turn: 0,
            status: GameStatus::InProgress,
            active_rules: Vec::new(),
        }
    }

    pub fn draw_card(session: &mut GameSession) -> Option<Card> {
        if session.deck.is_empty() {
            session.status = GameStatus::Finished;
            return None;
        }

        let card = session.deck.pop().unwrap();
        session.drawn_card = Some(card.clone());

        // Lógica para cartas que ficam na mão (4 e 6)
        // Note: O turno avança após a carta ser tirada
        let current_player_id = session.current_turn;
        {
            let player = &mut session.players[current_player_id];
            match card {
                Card::Four => {
                    player.hand.push(Card::Four);
                    player.has_license = true;
                }
                Card::Six => {
                    player.hand.push(Card::Six);
                    player.has_salute = true;
                }
                _ => {}
            }
        }

        // Avançar turno
        session.current_turn = (session.current_turn + 1) % session.players.len();

        Some(card)
    }

    pub fn add_rule(session: &mut GameSession, rule: String) {
        session.active_rules.push(rule);
    }
}
