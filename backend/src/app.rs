use axum::Router;
use axum::http::Method;
use tower_http::cors::{Any, CorsLayer};

use crate::routes::create_routes;

use crate::handlers::game_handler::AppState;
use std::collections::HashMap;
use std::sync::{Arc, Mutex};

pub fn create_app() -> Router {
    let state: AppState = Arc::new(Mutex::new(HashMap::new()));

    let cors = CorsLayer::new()
        .allow_origin([
            "http://localhost:5173".parse().unwrap(),
            "https://meusite.com".parse().unwrap(),
        ])
        // Allow the OPTIONS method so browsers can perform CORS preflight requests.
        .allow_methods([Method::GET, Method::POST, Method::OPTIONS])
        .allow_headers([
            axum::http::header::CONTENT_TYPE,
            axum::http::header::AUTHORIZATION,
            axum::http::header::ACCEPT,
        ])
        // If your frontend sends cookies or uses `fetch(..., { credentials: 'include' })`,
        // enable credentials and make sure the allowed origin is not a wildcard.
        .allow_credentials(true);

    create_routes(state).layer(cors)
}
