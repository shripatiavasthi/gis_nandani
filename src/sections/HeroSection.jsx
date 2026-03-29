import { LazyImage } from '../components/LazyImage'

export function HeroSection({ hero }) {
  return (
    <section className="hero" id="home">
      <div className="container hero__grid">
        <div className="hero__content">
          <span className="hero__eyebrow">{hero.eyebrow}</span>
          <h1>{hero.title}</h1>
          <p>{hero.description}</p>
          <div className="hero__actions">
            <a className="button button--primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </a>
            <a className="button button--secondary" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </a>
          </div>
          <div className="hero__metrics">
            {hero.metrics.map((metric) => (
              <article key={metric.label} className="metric-card">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </article>
            ))}
          </div>
        </div>
        <div className="hero__visual">
          <LazyImage
            src={hero.heroImage}
            alt="Global Infra Solutions project showcase"
            eager
          />
        </div>
      </div>
    </section>
  )
}
