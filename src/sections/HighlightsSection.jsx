export function HighlightsSection({ highlights }) {
  return (
    <section className="section">
      <div className="container card-grid card-grid--three">
        {highlights.map((item) => (
          <article key={item.title} className="info-card">
            <span className="info-card__index">{item.title.split(' ')[1] || item.title}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
