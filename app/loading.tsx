// app/loading.tsx
//
// LOADING UI — Next.js automatically wraps app/page.tsx in a <Suspense>
// boundary using this file as the fallback. It's shown while the "/" route's
// Server Component is rendering (e.g. on the very first navigation to it
// during a client-side transition from another page in the nav).
export default function Loading() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-10 sm:px-8">
      <div className="animate-pulse">
        <div className="mb-2 h-7 w-40 rounded bg-black/10 dark:bg-white/10" />
        <div className="h-4 w-72 rounded bg-black/10 dark:bg-white/10" />
      </div>

      <div className="flex animate-pulse flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-10 rounded-md bg-black/10 dark:bg-white/10"
          />
        ))}
      </div>
    </main>
  );
}
