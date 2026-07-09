// app/api/todos/route.ts
//
// ROUTE HANDLER — the classic "API endpoint" pattern. Unlike app/page.tsx,
// which reads the database directly inside a Server Component, this file
// exposes an HTTP GET/POST interface that any client (browser fetch, curl,
// a mobile app) can call. The StatsWidget Client Component below calls this
// endpoint with SWR, side by side with the direct Server Component fetch,
// so both patterns are visible in the same app.
import { NextResponse } from "next/server";
import { getTodos, addTodo } from "@/lib/db";

export async function GET() {
  const todos = getTodos();
  const completed = todos.filter((todo) => todo.completed).length;

  return NextResponse.json({
    todos,
    stats: {
      total: todos.length,
      completed,
      remaining: todos.length - completed,
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const title = typeof body.title === "string" ? body.title.trim() : "";

  if (!title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const todo = addTodo(title);
  return NextResponse.json(todo, { status: 201 });
}
