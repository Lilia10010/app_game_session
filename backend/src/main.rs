mod app;
mod docs;
mod domain;
mod handlers;
mod routes;
mod services;

use tokio::net::TcpListener;

#[tokio::main]
async fn main() {
    let app = app::create_app();

    let listener = TcpListener::bind("127.0.0.1:3000").await.unwrap();

    println!("Server running on http://localhost:3000");
    println!("Swagger UI available at http://localhost:3000/swagger-ui");

    axum::serve(listener, app).await.unwrap();
}
