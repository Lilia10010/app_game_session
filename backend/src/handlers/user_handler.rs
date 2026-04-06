use crate::domain::user::User;
use crate::services::user_service::UserService;
use axum::Json;

/// Lista todos os usuários (Exemplo estático)
#[utoipa::path(
    get,
    path = "/users",
    responses(
        (status = 200, description = "Lista de usuários retornada com sucesso", body = [User])
    )
)]
pub async fn list_users() -> Json<Vec<serde_json::Value>> {
    let users = UserService::list_users();

    let response = users
        .into_iter()
        .map(|user| {
            serde_json::json!({
                "id": user.id,
                "name": user.name
            })
        })
        .collect();

    Json(response)
}
