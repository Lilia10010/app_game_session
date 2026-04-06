# Domain: regra de negócio pura
- Sem framework, sem Axum — só regra

```
#[derive(Clone)]
pub struct User {
    pub id: u64,
    pub name: String,
}
```

# Service: lógica
```
use crate::domain::user::User;

pub struct UserService;

impl UserService {
    pub fn list_users() -> Vec<User> {
        vec![
            User { id: 1, name: "John".into() },
            User { id: 2, name: "Jane".into() },
        ]
    }
}
```

# Handler (HTTP layer)

```
use axum::{Json};
use crate::services::user_service::UserService;

pub async fn list_users() -> Json<Vec<serde_json::Value>> {
    let users = UserService::list_users();

    let response = users
        .into_iter()
        .map(|u| serde_json::json!({
            "id": u.id,
            "name": u.name
        }))
        .collect();

    Json(response)
}
```


para ajudar no fmt
 rustfmt "/home/microbiana/Área de trabalho/my/rust/app_sueca_LP/app_sueca/backend/src/handlers/debug_handler.rs" --emit files
// ou para usar a edição 2024 (que no caso é o que esta funcionando)
 rustfmt --edition 2024 "/home/microbiana/Área de trabalho/my/rust/app_sueca_LP/app_sueca/backend/src/handlers/debug_handler.rs" --emit files

 # ⚠️ Importante: o State NÃO é um “banco de dados”

Ele deve guardar:

✅ conexões
✅ serviços
✅ caches leves

 ## Para o debug_handler.rs
 Ou usar WebSocket (mais avançado)

Se quiser tempo real mesmo:

backend envia updates
frontend escuta

no momento estamos expondo tudo isto torna pesado
Melhor abordagem: DTO (Data Transfer Object)

Crie uma versão resumida: ex => pub struct GameSessionSummary {

# TODO
[ ] como substituir Mutex por RwLock (melhor para leitura pesada)
[ ] como dividir o HashMap em shards (escala real)
[ ] como usar uma estrutura de dados mais eficiente (ex: DashMap)

[ ] como implementar expiração de sessões inativas
[ ] como lidar com falhas de lock (ex: deadlocks)
[ ] como monitorar o desempenho e identificar gargalos
[ ] como testar a concorrência e garantir a consistência dos dados
[ ] como integrar isso com Redis sem reescrever tudo