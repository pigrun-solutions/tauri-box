// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::io::{Read, Write};
use std::net::TcpStream;
use std::sync::{Arc, Mutex};
use tauri::command;

#[derive(Clone)]
enum ConnectionStatus {
    Disconnected,
    Connecting,
    Connected,
}

struct TcpClient {
    stream: TcpStream,
}

impl TcpClient {
    fn connect(address: &str) -> Result<Self, String> {
        match TcpStream::connect(address) {
            Ok(stream) => Ok(TcpClient { stream }),
            Err(e) => Err(format!("Failed to connect: {}", e)),
        }
    }

    fn send_checkin(&mut self, message: &[u8]) -> Result<Vec<u8>, String> {
        match self.stream.write(message) {
            Ok(_) => {
                let mut buffer = [0; 512];
                match self.stream.read(&mut buffer) {
                    Ok(bytes_read) => Ok(buffer[..bytes_read].to_vec()),
                    Err(e) => Err(format!("Failed to read from stream: {}", e)),
                }
            }
            Err(e) => Err(format!("Failed to write to stream: {}", e)),
        }
    }
}

struct AppState {
    client: Option<TcpClient>,
    status: ConnectionStatus,
}

#[command]
fn connect_to_server(state: tauri::State<Arc<Mutex<AppState>>>, address: String) -> Result<String, String> {
    {
        let mut app_state = state.lock().unwrap();
        app_state.status = ConnectionStatus::Connecting;
    }

    match TcpClient::connect(&address) {
        Ok(client) => {
            let mut app_state = state.lock().unwrap();
            app_state.client = Some(client);
            app_state.status = ConnectionStatus::Connected;
            Ok("Connected successfully".into())
        }
        Err(e) => {
            let mut app_state = state.lock().unwrap();
            app_state.status = ConnectionStatus::Disconnected;
            Err(e)
        }
    }
}

#[command]
fn send_checkin_packet(state: tauri::State<Arc<Mutex<AppState>>>, message: Vec<u8>) -> Result<Vec<u8>, String> {
    let mut app_state = state.lock().unwrap();
    if let Some(ref mut client) = app_state.client {
        client.send_checkin(&message)
    } else {
        Err("Not connected".into())
    }
}

#[command]
fn disconnect_from_server(state: tauri::State<Arc<Mutex<AppState>>>) -> Result<String, String> {
    let mut app_state = state.lock().unwrap();
    if app_state.client.is_some() {
        app_state.client = None;
        app_state.status = ConnectionStatus::Disconnected;
        Ok("Disconnected successfully".into())
    } else {
        Err("Not connected".into())
    }
}

#[command]
fn get_connection_status(state: tauri::State<Arc<Mutex<AppState>>>) -> String {
    let app_state = state.lock().unwrap();
    match app_state.status {
        ConnectionStatus::Disconnected => "Disconnected".into(),
        ConnectionStatus::Connecting => "Connecting".into(),
        ConnectionStatus::Connected => "Connected".into(),
    }
}

fn main() {
    tauri::Builder::default()
        .manage(Arc::new(Mutex::new(AppState {
            client: None,
            status: ConnectionStatus::Disconnected,
        })))
        .invoke_handler(tauri::generate_handler![
            connect_to_server,
            send_checkin_packet,
            disconnect_from_server,
            get_connection_status
        ])
        .plugin(tauri_plugin_sql::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
