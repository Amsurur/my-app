// app/template.tsx


export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* This probe lives in the TEMPLATE */}
      {children}
    </div>
  )
}