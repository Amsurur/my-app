// lib/db.ts
//
// Server-only data layer. Import this file ONLY from Server Components,
// Server Actions, or Route Handlers — never from a Client Component.
// `server-only` throws a build error if it ever ends up in a client bundle,
// and better-sqlite3 uses native Node bindings that can't run in the browser
// anyway.
import "server-only";

import Database from "better-sqlite3";
import path from "node:path";

const dbPath = path.join(process.cwd(), "todos.db");
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

// Seed the database with 3 example todos on first run only.
const { count } = db
  .prepare("SELECT COUNT(*) as count FROM todos")
  .get() as { count: number };

if (count === 0) {
  const seed = db.prepare(
    "INSERT INTO todos (title, completed) VALUES (?, ?)"
  );
  seed.run("Learn Server Components", 1);
  seed.run("Try out Server Actions", 0);
  seed.run("Ship this Todo app", 0);
}

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
};

type TodoRow = {
  id: number;
  title: string;
  completed: number;
  createdAt: string;
};

function rowToTodo(row: TodoRow): Todo {
  return { ...row, completed: Boolean(row.completed) };
}

// better-sqlite3 is a synchronous driver by design (no async/await needed) —
// these reads/writes are fast, in-process file I/O, not network calls.
export function getTodos(): Todo[] {
  const rows = db
    .prepare("SELECT * FROM todos ORDER BY id DESC")
    .all() as TodoRow[];
  return rows.map(rowToTodo);
}

export function addTodo(title: string): Todo {
  const result = db
    .prepare("INSERT INTO todos (title, completed) VALUES (?, 0)")
    .run(title);
  const row = db
    .prepare("SELECT * FROM todos WHERE id = ?")
    .get(result.lastInsertRowid) as TodoRow;
  return rowToTodo(row);
}

export function toggleTodo(id: number): void {
  db.prepare("UPDATE todos SET completed = NOT completed WHERE id = ?").run(
    id
  );
}

export function deleteTodo(id: number): void {
  db.prepare("DELETE FROM todos WHERE id = ?").run(id);
}
