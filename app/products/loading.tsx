import "../style.css"
export default function Loading() {
    return (
      <div className="grid">
       <p className="text-[red] text-4xl"> 
          Loading....
        </p>
      
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card">
            <div className="skeleton skeleton-label" />
            <div className="skeleton skeleton-value" />
          </div>
        ))}
      </div>
    )
  }