// app/components/SlowStats.tsx
//
// STREAMING / SUSPENSE — this Server Component intentionally awaits an
// artificial 2s delay before rendering, simulating a slow computation or a
// slow downstream query. In app/page.tsx it's wrapped in <Suspense>, so the
// rest of the page (header, add-todo form, todo list, live stats) reaches
// the browser immediately, and this section streams in once it resolves —
// the fallback UI is what the user sees in the meantime.
import type { Todo } from "@/lib/db";

export default async function SlowStats({ todos }: { todos: Todo[] }) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const completed = todos.filter((todo) => todo.completed).length;
  const completionRate = todos.length
    ? Math.round((completed / todos.length) * 100)
    : 0;

  const oldest = [...todos].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )[0];

  return (
    <div className="rounded-md border border-black/10 p-4 dark:border-white/10">
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
        Detailed Stats (streamed in after ~2s)
      </h2>
      <p className="text-sm">Completion rate: {completionRate}%</p>
      <p className="text-sm">
        Oldest todo: {oldest ? oldest.title : "None yet"}
      </p>
    </div>
  );
}
