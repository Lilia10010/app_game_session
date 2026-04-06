use crate::domain::game::GameSession;
use crate::handlers::game_handler::AppState;
use axum::{extract::State, response::Json};
use std::collections::HashMap;
use uuid::Uuid;

//usar tokio obs: vai precisar de ajustes em vários locais
//use tokio::sync::Mutex;

pub async fn get_all_sessions(State(state): State<AppState>) -> Json<HashMap<Uuid, GameSession>> {
    let sessions = state.lock().unwrap();
    let snapshot = sessions.clone();
    Json(snapshot)
} //o Rust chama drop() → libera o Mutex
