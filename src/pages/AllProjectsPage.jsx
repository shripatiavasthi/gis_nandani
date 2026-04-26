import { useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  PublicSiteFooter,
  PublicSiteHeader,
  WhatsAppBubble,
} from '../components/PublicSiteChrome'
import { LazyImage } from '../components/LazyImage'
import { siteContent } from '../data/siteContent'
import { fetchProjects } from '../features/projects/projectsSlice'
import { useAppDispatch, useAppSelector } from '../hooks/redux'

export default function AllProjectsPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { items, status } = useAppSelector((state) => state.projects)

  const fallbackProjects = useMemo(
    () =>
      siteContent.gallery.map((item, index) => ({
        slug: `sample-project-${index + 1}`,
        name: item.title,
        shortDescription: item.category,
        coverImage: { url: item.image },
        galleryCount: 0,
      })),
    [],
  )

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const projects = items.length ? items : fallbackProjects

  return (
    <div className="site-shell">
      <PublicSiteHeader />

      <main>
        <section className="projects-hero">
          <div className="container">
            {/* <p className="eyebrow">GLOBAL INFRA SOLUTIONS</p> */}
            <h1>Our Projects</h1>
            <p className="hero-copy narrow">
              {status === 'loading'
                ? 'Loading projects...'
                : 'Browse every delivered project card and move into each project gallery.'}
            </p>
          </div>
        </section>

        {/* <section className="section">
          <div className="container">
            <div className="project-page__topbar">
              <Link className="project-page__back" to="/">
                Back to Home
              </Link>
            </div>

            <div className="project-category-grid">
              {siteContent.projectSeries.map((category) => (
                <article key={category.title} className="project-category-card">
                  <LazyImage src={category.image} alt={category.title} />
                  <div className="project-category-copy">
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section> */}

        <section className="section">
          <div className="container">
            {/* <div className="section-heading centered">
              <h2>Gallery</h2>
              <p>Designs that define spaces.</p>
            </div> */}

            <div className="project-gallery-grid">
              {projects.map((project) => (
                <article
                  key={project.slug}
                  className="project-gallery-card"
                  onClick={() => navigate(`/projects/${project.slug}`, { state: { project } })}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      navigate(`/projects/${project.slug}`, { state: { project } })
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <LazyImage src={project.coverImage?.url || project.image} alt={project.name || project.title} />
                  <div className="project-gallery-card__body">
                    <h3>{project.name || project.title}</h3>
                    <p>{project.shortDescription}</p>
                  </div>
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
