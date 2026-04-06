use crate::domain::game::{GameSession, Gender};
use crate::services::game_service::GameService;
use axum::{
    Json,
    extract::{Path, State},
    http::StatusCode,
};
use serde::Deserialize;
use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use uuid::Uuid;

use utoipa::ToSchema;

// Estado compartilhado para os jogos em memória
pub type AppState = Arc<Mutex<HashMap<Uuid, GameSession>>>;

#[derive(Deserialize, ToSchema)]
pub struct CreateGameRequest {
    /// ID do Host (quem criou a sala)
    #[schema(example = "550e8400-e29b-41d4-a716-446655440000")]
    pub host_id: Uuid,
    /// Lista de jogadores na ordem que o Host definiu
    pub players: Vec<PlayerRegistration>,
}

#[derive(Deserialize, ToSchema)]
pub struct PlayerRegistration {
    /// Nome do jogador
    #[schema(example = "Maria")]
    pub name: String,
    /// Gênero (Male/Female)
    pub gender: Gender,
}

#[derive(Deserialize, ToSchema)]
pub struct AddRuleRequest {
    /// Texto da nova regra definida pelo jogador
    #[schema(example = "Beber com a mão esquerda")]
    pub rule: String,
}

/// Cria uma nova sessão de jogo com baralho embaralhado
#[utoipa::path(
    post,
    path = "/games",
    request_body = CreateGameRequest,
    responses(
        (status = 200, description = "Jogo criado com sucesso", body = GameSession)
    )
)]
pub async fn create_game(
    State(state): State<AppState>,
    Json(payload): Json<CreateGameRequest>,
) -> Json<GameSession> {
    let player_data = payload
        .players
        .into_iter()
        .map(|p| (p.name, p.gender))
        .collect();

    let session = GameService::create_game(payload.host_id, player_data);
    let id = session.id;

    state.lock().unwrap().insert(id, session.clone());

    Json(session)
}

/// Obtém o estado atual de uma sessão de jogo
#[utoipa::path(
    get,
    path = "/games/{id}",
    params(
        ("id" = Uuid, Path, description = "ID da sessão de jogo")
    ),
    responses(
        (status = 200, description = "Estado do jogo retornado", body = GameSession),
        (status = 404, description = "Jogo não encontrado")
    )
)]
pub async fn get_game(
    Path(id): Path<Uuid>,
    State(state): State<AppState>,
) -> Result<Json<GameSession>, StatusCode> {
    let games = state.lock().unwrap();
    if let Some(game) = games.get(&id) {
        Ok(Json(game.clone()))
    } else {
        Err(StatusCode::NOT_FOUND)
    }
}

/// Sorteia uma carta do baralho para o jogador da vez
#[utoipa::path(
    post,
    path = "/games/{id}/draw",
    params(
        ("id" = Uuid, Path, description = "ID da sessão de jogo")
    ),
    responses(
        (status = 200, description = "Carta sorteada com sucesso", body = GameSession),
        (status = 404, description = "Jogo não encontrado")
    )
)]
pub async fn draw_card(
    Path(id): Path<Uuid>,
    State(state): State<AppState>,
) -> Result<Json<GameSession>, StatusCode> {
    let mut games = state.lock().unwrap();
    if let Some(game) = games.get_mut(&id) {
        GameService::draw_card(game);
        Ok(Json(game.clone()))
    } else {
        Err(StatusCode::NOT_FOUND)
    }
}

/// Adiciona uma nova regra customizada à sessão (Efeito da Carta 3)
#[utoipa::path(
    post,
    path = "/games/{id}/rule",
    params(
        ("id" = Uuid, Path, description = "ID da sessão de jogo")
    ),
    request_body = AddRuleRequest,
    responses(
        (status = 200, description = "Regra adicionada com sucesso", body = GameSession),
        (status = 404, description = "Jogo não encontrado")
    )
)]
pub async fn add_rule(
    Path(id): Path<Uuid>,
    State(state): State<AppState>,
    Json(payload): Json<AddRuleRequest>,
) -> Result<Json<GameSession>, StatusCode> {
    let mut games = state.lock().unwrap();
    if let Some(game) = games.get_mut(&id) {
        GameService::add_rule(game, payload.rule);
        Ok(Json(game.clone()))
    } else {
        Err(StatusCode::NOT_FOUND)
    }
}
