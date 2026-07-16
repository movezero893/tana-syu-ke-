// Tauri v2 デフォルトランタイム
// カスタムロジックは一切追加しない。HTMLファイル内のJS処理をそのまま実行。

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
