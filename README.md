This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Todo app — data-fetching pattern map

The home page (`/`) is a Todo app built as a reference for every major App
Router data-fetching pattern. Run `npm install && npm run dev` and open
`http://localhost:3000`. Data persists in a local `todos.db` SQLite file
(gitignored, created and seeded automatically on first run).

| File | Concept it demonstrates |
| --- | --- |
| `lib/db.ts` | Server-only data layer (better-sqlite3), seeded on first run. Imported only by Server Components/Actions/Route Handlers. |
| `app/page.tsx` | **Server Component fetching data on the server** — `getTodos()` is awaited directly in an async Server Component, no API round-trip. |
| `app/actions.ts` | **Server Actions** (`'use server'`) for add/toggle/delete mutations, each calling `revalidatePath('/')` to bust the route cache. |
| `app/api/todos/route.ts` | **Route Handler** — GET/POST JSON API, the classic client-fetches-an-endpoint pattern. |
| `app/components/StatsWidget.tsx` | **Client Component** fetching `app/api/todos` with SWR — shown side by side with the Server Component fetch above. |
| `app/components/SlowStats.tsx` + `<Suspense>` in `app/page.tsx` | **Streaming / Suspense** — an artificial 2s delay streams in separately from the rest of the page. |
| `app/loading.tsx` | Route-level loading UI, automatically wraps `page.tsx` in a Suspense boundary. |
| `app/error.tsx` | Error boundary for graceful error handling. |
| `app/components/QuoteOfDay.tsx` | **Caching strategies** — `cache: 'force-cache'` (static), `cache: 'no-store'` (dynamic), and `next: { revalidate: 30 }` (ISR) side by side. |
| `app/components/AddTodoForm.tsx`, `app/components/TodoList.tsx` | Forms wired to Server Actions, including `.bind()` for passing an id to a per-row action. |

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
