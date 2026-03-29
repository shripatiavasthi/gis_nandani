import { useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { LazyImage } from '../components/LazyImage'
import { siteContent } from '../data/siteContent'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchProjects } from '../features/projects/projectsSlice'

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
    <div className="project-page-shell">
      <div className="project-page container">
        <div className="project-page__topbar">
          <Link className="project-page__back" to="/">
            Back to Home
          </Link>
          <div>
            <p className="project-page__eyebrow">Project Showcase</p>
            <h1>All Projects</h1>
            <p>{status === 'loading' ? 'Loading projects...' : 'Browse every delivered project card in one place.'}</p>
          </div>
        </div>

        <div className="projects-index-grid">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="gallery-card gallery-card--interactive gallery-card--grid"
              onClick={() => navigate(`/projects/${project.slug}`, { state: { project } })}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  navigate(`/projects/${project.slug}`, { state: { project } })
                }
              }}
            >
              <LazyImage src={project.coverImage?.url || project.image} alt={project.name || project.title} />
              <div className="gallery-card__content">
                <span>{project.galleryCount ? `${project.galleryCount} photos` : 'Delivered Project'}</span>
                <h3>{project.name || project.title}</h3>
                <p>{project.shortDescription}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
