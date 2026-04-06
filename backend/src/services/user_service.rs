use crate::domain::user::User;

pub struct UserService;

impl UserService {
    pub fn list_users() -> Vec<User> {
        vec![
            User {
                id: 1,
                name: "John".into(),
            },
            User {
                id: 2,
                name: "Jane".into(),
            },
        ]
    }
}
