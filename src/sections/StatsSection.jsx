import { StatCounter } from '../components/StatCounter'

export function StatsSection({ stats }) {
  return (
    <section className="section stats-section">
      <div className="container stats-grid">
        {stats.map((item) => (
          <StatCounter key={item.label} value={item.value} label={item.label} />
        ))}
      </div>
    </section>
  )
}
