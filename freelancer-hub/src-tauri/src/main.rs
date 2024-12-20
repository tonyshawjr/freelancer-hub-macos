#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::State;
use std::sync::Mutex;
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
struct UserSettings {
    first_name: String,
    last_name: String,
    email: String,
}

struct AppState {
    user_settings: Mutex<UserSettings>,
}

#[tauri::command]
fn get_user_settings(state: State<AppState>) -> Result<UserSettings, String> {
    let settings = state.user_settings.lock().map_err(|e| e.to_string())?;
    Ok(settings.clone())
}

#[tauri::command]
fn update_user_settings(
    state: State<AppState>,
    settings: UserSettings,
) -> Result<(), String> {
    let mut current_settings = state.user_settings.lock().map_err(|e| e.to_string())?;
    *current_settings = settings;
    Ok(())
}

fn main() {
    let app_state = AppState {
        user_settings: Mutex::new(UserSettings {
            first_name: String::new(),
            last_name: String::new(),
            email: String::new(),
        }),
    };

    tauri::Builder::default()
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![
            get_user_settings,
            update_user_settings,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
