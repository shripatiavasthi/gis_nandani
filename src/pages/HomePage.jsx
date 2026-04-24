import { useEffect, useMemo } from 'react'
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

const getProjectImage = (project) => project?.coverImage?.url || project?.image || ''

export default function HomePage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { items, status, error } = useAppSelector((state) => state.projects)

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

  const featuredGalleryProjects = galleryItems.slice(0, 6)
  const marqueeClients = [...siteContent.clients, ...siteContent.clients]

  const solutionImages = useMemo(() => {
    const apiImages = galleryItems.map(getProjectImage).filter(Boolean)
    const fallbackImages = siteContent.showcase.map((item) => item.image)
    const imagePool = apiImages.length ? apiImages : fallbackImages

    return siteContent.solutions.items.map((_, index) => imagePool[index % imagePool.length])
  }, [galleryItems])

  const projectSeriesImages = useMemo(
    () =>
      siteContent.projectSeries.map((series, index) => {
        const matchingProject = galleryItems.find((project) => project.series === series.title)
        return (
          getProjectImage(matchingProject) ||
          getProjectImage(galleryItems[index]) ||
          siteContent.gallery[index % siteContent.gallery.length].image
        )
      }),
    [galleryItems],
  )

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
            <a className="hero-cta" href={siteContent.hero.primaryCta.href}>
              {siteContent.hero.primaryCta.label}
            </a>
          </div>
        </section>

        <section className="section">
          <div className="container split-section">
            <div className="split-visual">
              <LazyImage src={siteContent.intro.image} alt={siteContent.intro.title} eager />
            </div>
            <div className="split-copy">
              <h2>{siteContent.intro.title}</h2>
              <p className="intro-support">{siteContent.intro.body[0]}</p>
              <div className="intro-stats">
                {siteContent.featureStats.map((item) => (
                  <div key={item.label} className="intro-stat">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
              <div id="services" className="section-anchor" />
            </div>
          </div>
        </section>

        <section className="section soft-section">
          <div className="container">
            <div className="section-heading centered">
              <h2>Our Services</h2>
              <p>{siteContent.solutions.title}</p>
            </div>
            <div className="service-grid">
              {siteContent.solutions.items.map((solution, index) => (
                <article key={solution.id} className="service-card">
                  <LazyImage src={solutionImages[index]} alt={solution.title} />
                  <div className="service-card-body">
                    <h4>{solution.title}</h4>
                    <p>{solution.description}</p>
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
                  <LazyImage src={projectSeriesImages[index]} alt={series.title} />
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
              <h2>{siteContent.gallerySection.title}</h2>
              <p>{siteContent.gallerySection.description}</p>
            </div>

            <div className="gallery-grid gallery-grid--feature">
              {featuredGalleryProjects.map((project, index) => (
                <button
                  key={project.slug}
                  className="gallery-card-button gallery-card-button--feature"
                  onClick={() => handleSelectProject(project)}
                  type="button"
                  aria-label={`Open ${project.name || project.title}`}
                >
                  <LazyImage
                    src={project.coverImage?.url || project.image}
                    alt={project.name || project.title}
                    eager={index < 2}
                  />
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
              <h2>{siteContent.logoMarquee.title}</h2>
              <p>{siteContent.logoMarquee.description}</p>
            </div>

            <div className="logo-marquee" aria-label="Client logos moving left to right">
              <div className="logo-marquee__track">
                {marqueeClients.map((client, index) => (
                  <article key={`${client.name}-${index}`} className="logo-chip">
                    <img src={client.logo} alt={client.name} />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicSiteFooter />
      <WhatsAppBubble />
    </div>
  )
}
