// app/components/TodoList.tsx
//
// Server Component that renders todos passed down from app/page.tsx (which
// fetched them directly from SQLite). Each row's toggle/delete button is its
// own <form> bound to a Server Action via `.bind(null, todo.id)` — the
// standard way to pass extra arguments to a Server Action beyond the
// automatic FormData.
import type { Todo } from "@/lib/db";
import { toggleTodoAction, deleteTodoAction } from "../actions";

export default function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => {
        const toggle = toggleTodoAction.bind(null, todo.id);
        const del = deleteTodoAction.bind(null, todo.id);

        return (
          <li
            key={todo.id}
            className="flex items-center gap-3 rounded-md border border-black/10 px-3 py-2 dark:border-white/10"
          >
            <form action={toggle}>
              <button
                type="submit"
                aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
                className="text-lg leading-none"
              >
                {todo.completed ? "✅" : "⬜️"}
              </button>
            </form>

            <span
              className={
                todo.completed
                  ? "flex-1 text-sm text-zinc-500 line-through"
                  : "flex-1 text-sm"
              }
            >
              {todo.title}
            </span>

            <form action={del}>
              <button
                type="submit"
                aria-label="Delete todo"
                className="text-sm text-zinc-400 hover:text-red-600"
              >
                Delete
              </button>
            </form>
          </li>
        );
      })}
    </ul>
  );
}
