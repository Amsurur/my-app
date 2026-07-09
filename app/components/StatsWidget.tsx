"use client";

// app/components/StatsWidget.tsx
//
// CLIENT COMPONENT fetching from our own Route Handler (app/api/todos)
// using SWR — shown side by side with the Server Component data fetching in
// app/page.tsx. This component ships JS to the browser and re-fetches on an
// interval, unlike the server-rendered todo list above it.
import useSWR from "swr";

type TodosResponse = {
  todos: { id: number; title: string; completed: boolean }[];
  stats: { total: number; completed: number; remaining: number };
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function StatsWidget() {
  const { data, error, isLoading } = useSWR<TodosResponse>(
    "/api/todos",
    fetcher,
    { refreshInterval: 5000 }
  );

  return (
    <div className="rounded-md border border-dashed border-black/20 p-4 dark:border-white/20">
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
        Live Stats — Client Component + SWR
      </h2>

      {error && <p className="text-sm text-red-600">Failed to load stats.</p>}
      {isLoading && <p className="text-sm text-zinc-500">Loading stats…</p>}

      {data && (
        <div className="flex gap-6 text-sm">
          <span>Total: {data.stats.total}</span>
          <span>Completed: {data.stats.completed}</span>
          <span>Remaining: {data.stats.remaining}</span>
        </div>
      )}
    </div>
  );
}
