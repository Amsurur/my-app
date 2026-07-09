// app/components/QuoteOfDay.tsx
//
// CACHING & REVALIDATION DEMO — three Server Components hit the same public
// API with three different `fetch` cache strategies. Reload the page a few
// times (and wait 30s+ for the third one) to see how each behaves
// differently even though the code is nearly identical.
import { Suspense } from "react";

type Quote = { quote: string; author: string };

async function fetchQuote(init?: RequestInit): Promise<Quote> {
  const res = await fetch("https://dummyjson.com/quotes/random", init);
  if (!res.ok) throw new Error("Failed to fetch quote");
  return res.json();
}

function QuoteCard({ label, quote }: { label: string; quote: Quote }) {
  return (
    <div className="rounded-md border border-black/10 p-3 text-sm dark:border-white/10">
      <p className="mb-1 font-mono text-xs text-zinc-500">{label}</p>
      <p className="italic">&ldquo;{quote.quote}&rdquo;</p>
      <p className="text-zinc-500">— {quote.author}</p>
    </div>
  );
}

function QuoteError({ label }: { label: string }) {
  return (
    <div className="rounded-md border border-black/10 p-3 text-sm dark:border-white/10">
      <p className="mb-1 font-mono text-xs text-zinc-500">{label}</p>
      <p className="text-zinc-500">Couldn&apos;t reach the quote API.</p>
    </div>
  );
}

// `cache: 'force-cache'` — STATIC. Next.js looks for a matching entry in its
// server-side cache first; once fetched, this same quote is reused
// indefinitely (until something explicitly revalidates it).
async function StaticQuote() {
  try {
    const quote = await fetchQuote({ cache: "force-cache" });
    return <QuoteCard label="cache: 'force-cache' (static)" quote={quote} />;
  } catch {
    return <QuoteError label="cache: 'force-cache' (static)" />;
  }
}

// `cache: 'no-store'` — DYNAMIC. Refetched from the network on every single
// request, so a fresh quote shows up on every reload.
async function FreshQuote() {
  try {
    const quote = await fetchQuote({ cache: "no-store" });
    return <QuoteCard label="cache: 'no-store' (dynamic)" quote={quote} />;
  } catch {
    return <QuoteError label="cache: 'no-store' (dynamic)" />;
  }
}

// `next: { revalidate: 30 }` — TIME-BASED ISR. The response is cached for up
// to 30 seconds; requests within that window reuse it, and the first
// request after it expires triggers a background refetch.
async function RevalidatedQuote() {
  try {
    const quote = await fetchQuote({ next: { revalidate: 30 } });
    return <QuoteCard label="next: { revalidate: 30 } (ISR)" quote={quote} />;
  } catch {
    return <QuoteError label="next: { revalidate: 30 } (ISR)" />;
  }
}

export default function QuoteOfDay() {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
        Quote of the Day — Caching Strategies
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        <Suspense fallback={<p className="text-sm text-zinc-500">Loading…</p>}>
          <StaticQuote />
        </Suspense>
        <Suspense fallback={<p className="text-sm text-zinc-500">Loading…</p>}>
          <FreshQuote />
        </Suspense>
        <Suspense fallback={<p className="text-sm text-zinc-500">Loading…</p>}>
          <RevalidatedQuote />
        </Suspense>
      </div>
    </div>
  );
}
