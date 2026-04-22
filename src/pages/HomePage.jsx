import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  PublicSiteFooter,
  PublicSiteHeader,
  WhatsAppBubble,
} from '../components/PublicSiteChrome'
import { LazyImage } from '../components/LazyImage'
import { siteContent } from '../data/siteContent'
import { fetchProjects } from '../features/projects/projectsSlice'
import { useAppDispatch, useAppSelector } from '../hooks/redux'

const heroVideo =
  'https://globalinfraa.s3.eu-north-1.amazonaws.com/branding/videos/gis-hero-video.mp4'
const heroPoster =
  'https://images.pexels.com/videos/7646443/adult-banking-blur-book-series-7646443.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200'

const normalizeSeries = (project) => {
  const source = `${project.shortDescription || ''} ${project.name || ''}`.toLowerCase()

  if (
    source.includes('police') ||
    source.includes('library') ||
    source.includes('government') ||
    source.includes('institutional')
  ) {
    return 'The Heritage Series'
  }

  if (
    source.includes('tissot') ||
    source.includes('citizen') ||
    source.includes('seiko') ||
    source.includes('luxury') ||
    source.includes('retail')
  ) {
    return 'The Luxury Series'
  }

  return 'The Corporate Series'
}

export default function HomePage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { items, status, error } = useAppSelector((state) => state.projects)
  const [selectedSeries, setSelectedSeries] = useState('All Projects')

  const fallbackProjects = useMemo(
    () =>
      siteContent.gallery.map((item, index) => ({
        slug: `sample-project-${index + 1}`,
        name: item.title,
        shortDescription: item.category,
        coverImage: { url: item.image },
        galleryCount: 0,
        series: item.category,
      })),
    [],
  )

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const handleSelectProject = (project) => {
    navigate(`/projects/${project.slug}`, {
      state: { project },
    })
  }

  const galleryItems = (items.length ? items : fallbackProjects).map((project) => ({
    ...project,
    series: project.series || normalizeSeries(project),
  }))

  const availableSeries = ['All Projects', ...siteContent.projectSeries.map((item) => item.title)]
  const filteredProjects =
    selectedSeries === 'All Projects'
      ? galleryItems
      : galleryItems.filter((project) => project.series === selectedSeries)

  const galleryError =
    status === 'failed' ? 'Project API is not reachable yet. Showing sample cards for now.' : ''
  const emptyStateMessage =
    !items.length && !error && status !== 'loading'
      ? 'No delivered projects have been added yet. Showing sample cards for now.'
      : ''

  return (
    <div className="site-shell">
      <PublicSiteHeader />

      <main>
        <section className="hero-section">
          <video autoPlay muted loop playsInline poster={heroPoster}>
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="hero-overlay" />
          <div className="container hero-content">
            <p className="eyebrow">GLOBAL INFRA SOLUTIONS</p>
            <p className="eyebrow subtitle">{siteContent.hero.eyebrow}</p>
            <h1>{siteContent.hero.title}</h1>
            <p className="hero-copy">{siteContent.hero.subHeadline}</p>
          </div>
        </section>

        <section className="section">
          <div className="container split-section">
            <div className="split-visual">
              <LazyImage src={siteContent.intro.image} alt={siteContent.intro.title} eager />
            </div>
            <div className="split-copy">
              <h2>{siteContent.intro.title}</h2>
              <blockquote className="intro-quote">{siteContent.intro.body[0]}</blockquote>
              <p className="intro-support">{siteContent.intro.body[1]}</p>
              <div id="services" className="section-anchor" />
              <h3>The GIS Edge</h3>
              <ul className="value-pillar-list">
                {siteContent.intro.pillars.map((pillar) => (
                  <li key={pillar.title}>
                    <strong>{pillar.title}:</strong> {pillar.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section soft-section">
          <div className="container">
            <div className="section-heading">
              <h2>{siteContent.solutions.eyebrow}</h2>
              <p>{siteContent.solutions.title}</p>
            </div>
            <div className="service-grid">
              {siteContent.solutions.items.map((solution, index) => (
                <article key={solution.id} className="service-card">
                  <LazyImage
                    src={siteContent.showcase[index % siteContent.showcase.length].image}
                    alt={solution.title}
                  />
                  <div className="service-card-body">
                    <h4>{solution.title}</h4>
                    <p>{solution.description}</p>
                    <p className="service-meta">{solution.competencies.join(' | ')}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="container">
            <div className="section-heading centered">
              <h2>Project Series</h2>
              <p>Selected sectors and project categories delivered through one accountable GIS team.</p>
            </div>
            <div className="project-category-grid">
              {siteContent.projectSeries.map((series, index) => (
                <article key={series.title} className="project-category-card">
                  <LazyImage
                    src={siteContent.gallery[index % siteContent.gallery.length].image}
                    alt={series.title}
                  />
                  <div className="project-category-copy">
                    <h3>{series.title}</h3>
                    <p>{series.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section soft-section">
          <div className="container">
            <div className="section-heading centered">
              <h2>Gallery</h2>
              <p>Designs that define spaces.</p>
            </div>

            <div className="filter-bar">
              <label className="filter-select">
                <span className="sr-only">Select project series</span>
                <select value={selectedSeries} onChange={(event) => setSelectedSeries(event.target.value)}>
                  {availableSeries.map((series) => (
                    <option key={series} value={series}>
                      {series}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="gallery-grid gallery-grid--projects">
              {filteredProjects.map((project, index) => (
                <button
                  key={project.slug}
                  className="gallery-card-button"
                  onClick={() => handleSelectProject(project)}
                  type="button"
                >
                  <LazyImage
                    src={project.coverImage?.url || project.image}
                    alt={project.name || project.title}
                    eager={index < 2}
                  />
                  <span className="gallery-card-overlay">
                    <strong>{project.name || project.title}</strong>
                    <small>{project.shortDescription || project.category || 'Delivered Project'}</small>
                  </span>
                </button>
              ))}
            </div>

            {galleryError || emptyStateMessage ? (
              <p className="section-note">{galleryError || emptyStateMessage}</p>
            ) : null}
          </div>
        </section>

        <section className="section testimonial-section" id="feedback">
          <div className="container">
            <div className="section-heading centered">
              <h2>Trusted Across Sectors</h2>
              <p>Selected brands, institutions, and workplace environments across our project portfolio.</p>
            </div>

            <div className="testimonial-grid">
              {siteContent.testimonials.map((item) => (
                <article key={item.author} className="testimonial-card">
                  <LazyImage src={item.image} alt={item.company} />
                  <div className="testimonial-card__body">
                    <div className="stars">★★★★★</div>
                    <p>{item.quote}</p>
                    <strong>{item.author}</strong>
                    <span>
                      {item.company} | {item.location}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <div className="logo-strip">
              {siteContent.clients.slice(0, 8).map((client) => (
                <article key={client.name} className="logo-chip">
                  <img src={client.logo} alt={client.name} />
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PublicSiteFooter />
      <WhatsAppBubble />
    </div>
  )
}
