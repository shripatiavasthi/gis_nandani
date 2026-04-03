import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import { LazyImage } from '../components/LazyImage'
import { siteContent } from '../data/siteContent'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchProjectBySlug, setSelectedFallbackProject } from '../features/projects/projectsSlice'

export default function ProjectGalleryPage() {
  const dispatch = useAppDispatch()
  const { slug } = useParams()
  const location = useLocation()
  const { selectedProject, detailStatus } = useAppSelector((state) => state.projects)
  const [activeImage, setActiveImage] = useState(null)

  const fallbackProjects = useMemo(
    () =>
      siteContent.gallery.map((item, index) => ({
        slug: `sample-project-${index + 1}`,
        name: item.title,
        shortDescription: item.category,
        coverImage: { url: item.image },
        galleryImages: [],
      })),
    [],
  )

  useEffect(() => {
    const loadProject = async () => {
      try {
        await dispatch(fetchProjectBySlug(slug)).unwrap()
      } catch (error) {
        const routeProject =
          location.state?.project || fallbackProjects.find((item) => item.slug === slug) || null

        if (routeProject) {
          dispatch(
            setSelectedFallbackProject({
              ...routeProject,
              galleryImages: routeProject.galleryImages || [],
            }),
          )
        }
      }
    }

    loadProject()
  }, [dispatch, fallbackProjects, location.state, slug])

  useEffect(() => {
    if (!activeImage) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveImage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeImage])

  if (!selectedProject || selectedProject.slug !== slug) {
    return (
      <div className="project-page-shell">
        <div className="project-page container">
          <Link className="project-page__back" to="/">
            Back to Home
          </Link>
          <p>{detailStatus === 'loading' ? 'Loading project gallery...' : 'Project not found.'}</p>
        </div>
      </div>
    )
  }

  const getGalleryImageLabel = (image, index) => {
    return `${selectedProject.name} gallery image ${index + 1}`
  }

  const galleryCount = selectedProject.galleryImages?.length || 0
  const projectCategory = selectedProject.shortDescription || 'Turnkey Delivery'
  const projectStats = [
    { label: 'Project Type', value: projectCategory },
    { label: 'Gallery Images', value: galleryCount ? `${galleryCount}+` : 'Pending' },
    { label: 'Execution', value: 'End-to-end' },
  ]

  return (
    <div className="project-page-shell">
      <div className="project-page container">
        <div className="project-page__masthead">
          <Link className="project-page__back" to="/projects">
            Back to Projects
          </Link>
          <Link className="project-page__back project-page__back--ghost" to="/">
            Home
          </Link>
        </div>

        <section className="project-page__hero">
          <div className="project-page__hero-copy">
            <p className="project-page__eyebrow">Delivered Project</p>
            <h1>{selectedProject.name}</h1>
            <p className="project-page__lede">{selectedProject.shortDescription}</p>

            <div className="project-page__stat-row" aria-label="Project summary">
              {projectStats.map((stat) => (
                <div className="project-page__stat" key={stat.label}>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>

            <div className="project-page__hero-note">
              <p>
                A focused showcase of execution quality, finish detail, and on-site delivery standards for this GIS
                project.
              </p>
            </div>
          </div>

          <div className="project-page__hero-media">
            <LazyImage src={selectedProject.coverImage?.url} alt={selectedProject.name} eager />
            <div className="project-page__hero-badge">
              <span>GIS Showcase</span>
              <strong>{galleryCount ? `${galleryCount} captures` : 'Gallery updating soon'}</strong>
            </div>
          </div>
        </section>

        <div className="project-page__grid">
          {selectedProject.galleryImages?.length ? (
            selectedProject.galleryImages.map((image, index) => {
              const imageLabel = getGalleryImageLabel(image, index)

              return (
                <figure key={image.key} className="project-page__image">
                  <button
                    type="button"
                    className="project-page__image-button"
                    onClick={() => setActiveImage({ src: image.url, alt: imageLabel, index })}
                    aria-label={`Open ${imageLabel} in full screen`}
                  >
                    <LazyImage src={image.url} alt={imageLabel} />
                  </button>
                  <figcaption>
                    <span>Frame {String(index + 1).padStart(2, '0')}</span>
                    <strong>{image.caption}</strong>
                  </figcaption>
                </figure>
              )
            })
          ) : (
            <div className="project-page__empty">
              <p>No gallery images have been added for this project yet.</p>
              <span>Project visuals will appear here once the gallery is updated.</span>
            </div>
          )}
        </div>
      </div>

      {activeImage ? (
        <div className="project-lightbox" role="dialog" aria-modal="true" aria-label={activeImage.alt}>
          <button
            type="button"
            className="project-lightbox__backdrop"
            onClick={() => setActiveImage(null)}
            aria-label="Close full screen image"
          />
          <div className="project-lightbox__content">
            <button
              type="button"
              className="project-lightbox__close"
              onClick={() => setActiveImage(null)}
              aria-label="Close full screen image"
            >
              Close
            </button>
            <img src={activeImage.src} alt={activeImage.alt} className="project-lightbox__image" />
            <p className="project-lightbox__caption">
              Frame {String(activeImage.index + 1).padStart(2, '0')} · {activeImage.alt}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
