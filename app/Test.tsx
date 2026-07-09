// app/Panels.tsx
'use client'
import { useEffect, useState } from 'react'

export function StateProbe({ label }: { label: string }) {
  const [count, setCount] = useState(0)
  const [mountedAt] = useState(() => new Date().toLocaleTimeString())

  useEffect(() => {
    console.log(`[${label}] mounted at ${mountedAt}`)
    return () => console.log(`[${label}] unmounted`)
  }, [label, mountedAt])

  return (
    <div style={{ padding: 12, border: '1px solid #ccc' }}>
      <strong>{label}</strong>
      <div>count: {count} · mounted: {mountedAt}</div>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
    </div>
  )
}