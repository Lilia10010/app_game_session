use utoipa::ToSchema;

#[derive(Clone, ToSchema)]
pub struct User {
    /// O identificador único do usuário
    pub id: u64,
    /// O nome do usuário
    pub name: String,
}
