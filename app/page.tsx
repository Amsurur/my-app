import { Suspense } from "react";
import { getTodos } from "@/lib/db";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import StatsWidget from "./components/StatsWidget";
import SlowStats from "./components/SlowStats";
import QuoteOfDay from "./components/QuoteOfDay";

// ─────────────────────────────────────────────────────────────────────────
// SERVER COMPONENT FETCHING DATA ON THE SERVER (the main pattern)
//
// `Home` is an `async` Server Component. It calls `getTodos()` — a direct
// SQLite query in lib/db.ts — with a plain `await`, no fetch(), no API
// round-trip. By the time this component's HTML reaches the browser, the
// todos are already in it. Compare this to StatsWidget below, which fetches
// the *same kind* of data from a Route Handler on the client instead.
// ─────────────────────────────────────────────────────────────────────────
export default async function Home() {
  const todos = getTodos();

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-10 sm:px-8">
      <header>
        <h1 className="text-2xl font-semibold">Todo App</h1>
        <p className="text-sm text-zinc-500">
          A tour of every major Next.js App Router data-fetching pattern.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <AddTodoForm />

        {todos.length === 0 ? (
          <p className="rounded-md border border-dashed border-black/20 p-4 text-center text-sm text-zinc-500 dark:border-white/20">
            No todos yet — add your first one above.
          </p>
        ) : (
          <TodoList todos={todos} />
        )}
      </section>

      {/* ROUTE HANDLER + SWR — client-side fetch against app/api/todos/route.ts */}
      <section>
        <StatsWidget />
      </section>

      {/*
        STREAMING WITH SUSPENSE — SlowStats artificially waits ~2s before
        resolving. Wrapping it here means the rest of this page (everything
        above) streams to the browser immediately, and this section pops in
        once its data is ready, showing the fallback in the meantime.
      */}
      <section>
        <Suspense fallback={<StatsSkeleton />}>
          <SlowStats todos={todos} />
        </Suspense>
      </section>

      {/* CACHING & REVALIDATION DEMO — force-cache / no-store / ISR side by side */}
      <section>
        <QuoteOfDay />
      </section>
    </main>
  );
}

function StatsSkeleton() {
  return (
    <div className="animate-pulse rounded-md border border-black/10 p-4 dark:border-white/10">
      <div className="mb-2 h-4 w-1/3 rounded bg-black/10 dark:bg-white/10" />
      <div className="mb-1 h-3 w-1/2 rounded bg-black/10 dark:bg-white/10" />
      <div className="h-3 w-2/3 rounded bg-black/10 dark:bg-white/10" />
    </div>
  );
}
