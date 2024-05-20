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

    fn send_passage(&mut self, message: &[u8]) -> Result<Vec<u8>, String> {
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
    clients: Vec<TcpClient>,
    status: ConnectionStatus,
}

#[command]
fn connect_to_server(state: tauri::State<Arc<Mutex<AppState>>>, address: String) -> Result<String, String> {
    let mut app_state = state.lock().unwrap();
    app_state.status = ConnectionStatus::Connecting;
    match TcpClient::connect(&address) {
        Ok(client) => {
            app_state.clients.push(client);
            app_state.status = ConnectionStatus::Connected;
            Ok("Connected successfully".into())
        }
        Err(e) => {
            app_state.status = ConnectionStatus::Disconnected;
            Err(e)
        }
    }
}

#[command]
fn connect_to_server_new(state: tauri::State<Arc<Mutex<AppState>>>, address: String) -> Result<usize, String> {
    let mut app_state = state.lock().unwrap();
    app_state.status = ConnectionStatus::Connecting;
    match TcpClient::connect(&address) {
        Ok(client) => {
            let index = app_state.clients.len();
            app_state.clients.push(client);
            app_state.status = ConnectionStatus::Connected;
            Ok(index)
        }
        Err(e) => {
            app_state.status = ConnectionStatus::Disconnected;
            Err(e)
        }
    }
}

#[command]
fn get_connected_server_addresses(state: tauri::State<Arc<Mutex<AppState>>>) -> Vec<String> {
    let app_state = state.lock().unwrap();
    let mut client_addresses = Vec::new();
    for (index, client) in app_state.clients.iter().enumerate() {
        let address = format!("{:?}", client as *const _);
        println!("Client {}: {:?}", index, address);
        client_addresses.push(address);
    }
    client_addresses
}

#[command]
fn check_client_existence(state: tauri::State<Arc<Mutex<AppState>>>, client_address: String) -> bool {
    let app_state = state.lock().unwrap();
    app_state.clients.iter().any(|client| {
        format!("{:p}", client) == client_address
    })
}


#[command]
fn close_connection(state: tauri::State<Arc<Mutex<AppState>>>, index: usize) -> Result<(), String> {
    let mut app_state = state.lock().unwrap();
    if index < app_state.clients.len() {
        app_state.clients.remove(index);
        if app_state.clients.is_empty() {
            app_state.status = ConnectionStatus::Disconnected;
        }
        Ok(())
    } else {
        Err("Index out of bounds".into())
    }
}

#[command]
fn send_packet_by_client_index(state: tauri::State<Arc<Mutex<AppState>>>, client_index: usize, packet: Vec<u8>) -> Result<Vec<u8>, String> {
    let mut app_state = state.lock().unwrap();
    if let Some(client) = app_state.clients.get_mut(client_index) {
        client.send_checkin(&packet)
    } else {
        Err("Client not found".into())
    }
}

#[command]
fn close_connection_by_client(state: tauri::State<Arc<Mutex<AppState>>>, client_address: String) -> Result<(), String> {
    let mut app_state = state.lock().unwrap();
    if let Some(index) = app_state.clients.iter().position(|client| {
        format!("{:p}", client) == client_address
    }) {
        app_state.clients.remove(index);
        if app_state.clients.is_empty() {
            app_state.status = ConnectionStatus::Disconnected;
        }
        Ok(())
    } else {
        Err("Client not found".into())
    }
}


#[command]
fn send_checkin_packet(state: tauri::State<Arc<Mutex<AppState>>>, message: Vec<u8>) -> Result<Vec<u8>, String> {
    let mut app_state = state.lock().unwrap();
    if let Some(client) = app_state.clients.last_mut() {
        client.send_checkin(&message)
    } else {
        Err("Not connected".into())
    }
}

#[command]
fn send_passage_packet(state: tauri::State<Arc<Mutex<AppState>>>, message: Vec<u8>) -> Result<Vec<u8>, String> {
    let mut app_state = state.lock().unwrap();
    if let Some(client) = app_state.clients.last_mut() {
        client.send_passage(&message)
    } else {
        Err("Not connected".into())
    }
}

#[command]
fn disconnect_from_server(state: tauri::State<Arc<Mutex<AppState>>>) -> Result<String, String> {
    let mut app_state = state.lock().unwrap();
    if !app_state.clients.is_empty() {
        app_state.clients.clear();
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
            clients: Vec::new(),
            status: ConnectionStatus::Disconnected,
        })))
        .invoke_handler(tauri::generate_handler![
            connect_to_server,
            send_checkin_packet,
            send_passage_packet,
            get_connection_status,
            disconnect_from_server,
            connect_to_server_new,
            get_connected_server_addresses,
            close_connection,
            check_client_existence,
            close_connection_by_client,
            send_packet_by_client_index
        ])
        .plugin(tauri_plugin_sql::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
