// app/actions.ts
//
// SERVER ACTIONS — all mutations for the Todo app live here, marked with the
// top-of-file "use server" directive. Because they're defined in a Server
// Function file, they can be imported and invoked directly from Client
// Components too, but here they're wired up to plain <form action={...}>
// elements in Server Components, so they work even before JS hydrates.
"use server";

import { revalidatePath } from "next/cache";
import {
  addTodo as dbAddTodo,
  toggleTodo as dbToggleTodo,
  deleteTodo as dbDeleteTodo,
} from "@/lib/db";

export async function addTodoAction(formData: FormData) {
  const title = formData.get("title");
  if (typeof title !== "string" || title.trim() === "") return;

  dbAddTodo(title.trim());

  // CACHE REVALIDATION: the home page Server Component (app/page.tsx) reads
  // todos straight from SQLite, but Next.js still caches the rendered result
  // of that route. revalidatePath('/') purges that cache entry so the very
  // next request/navigation to "/" re-runs the Server Component and reflects
  // this mutation instead of serving a stale copy.
  revalidatePath("/");
}

export async function toggleTodoAction(id: number) {
  dbToggleTodo(id);
  revalidatePath("/");
}

export async function deleteTodoAction(id: number) {
  dbDeleteTodo(id);
  revalidatePath("/");
}
