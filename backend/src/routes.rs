use crate::docs::ApiDoc;
use crate::handlers::game_handler::{AppState, add_rule, create_game, draw_card, get_game};
use crate::handlers::user_handler::list_users;
use crate::handlers::debug_handler::get_all_sessions;

use axum::{
    Router,
    routing::{get, post},
};
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

pub fn create_routes(state: AppState) -> Router {
    Router::new()
        .merge(SwaggerUi::new("/swagger-ui").url("/api-docs/openapi.json", ApiDoc::openapi()))
        .route("/users", get(list_users))
        .route("/games", post(create_game))
        .route("/games/{id}", get(get_game))
        .route("/games/{id}/draw", post(draw_card))
        .route("/games/{id}/rule", post(add_rule))
        .route("/debug/sessions", get(get_all_sessions))
        .with_state(state)
}
