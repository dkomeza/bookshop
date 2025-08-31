import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";

// Database file path
const dbPath = path.join(__dirname, "../../data/books.db");

const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export const db = new sqlite3.Database(dbPath);

export function initDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        read BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    db.run(createTableSQL, (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
        reject(err);
      } else {
        console.log("Books table initialized successfully");
        resolve();
      }
    });
  });
}

export function closeDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        console.error("Error closing database:", err.message);
        reject(err);
      } else {
        console.log("Database connection closed");
        resolve();
      }
    });
  });
}
