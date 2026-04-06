use crate::domain::game::{Card, GameSession, GameStatus, Gender, Player};
use crate::domain::user::User;
use crate::handlers::game_handler::{
    __path_add_rule, __path_create_game, __path_draw_card, __path_get_game, AddRuleRequest,
    CreateGameRequest, PlayerRegistration,
};
use crate::handlers::user_handler::__path_list_users;
use utoipa::OpenApi;

#[derive(OpenApi)]
#[openapi(
    paths(
        list_users,
        create_game,
        get_game,
        draw_card,
        add_rule
    ),
    components(
        schemas(
            User, Gender, Card, Player, GameStatus, GameSession,
            CreateGameRequest, PlayerRegistration, AddRuleRequest
        )
    ),
    tags(
        (name = "Sueca API", description = "Endpoints para gerenciamento de usuários e partidas de Sueca")
    )
)]
pub struct ApiDoc;
