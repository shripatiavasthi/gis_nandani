import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import {
  PublicSiteFooter,
  PublicSiteHeader,
  WhatsAppBubble,
} from '../components/PublicSiteChrome'
import { LazyImage } from '../components/LazyImage'
import { siteContent } from '../data/siteContent'
import { fetchProjectBySlug, setSelectedFallbackProject } from '../features/projects/projectsSlice'
import { useAppDispatch, useAppSelector } from '../hooks/redux'

export default function ProjectGalleryPage() {
  const dispatch = useAppDispatch()
  const { slug } = useParams()
  const location = useLocation()
  const { selectedProject, detailStatus } = useAppSelector((state) => state.projects)
  const [activeImageIndex, setActiveImageIndex] = useState(null)

  const fallbackProjects = useMemo(
    () =>
      siteContent.gallery.map((item, index) => ({
        slug: `sample-project-${index + 1}`,
        name: item.title,
        shortDescription: item.category,
        coverImage: { url: item.image },
        galleryImages: [
          {
            key: `${item.title}-${index + 1}`,
            url: item.image,
            caption: item.category,
          },
        ],
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
    setActiveImageIndex(null)
  }, [slug])

  useEffect(() => {
    if (activeImageIndex === null) {
      return undefined
    }

    const handleKeyDown = (event) => {
      const galleryLength = selectedProject?.galleryImages?.length || 0

      if (!galleryLength) {
        return
      }

      if (event.key === 'Escape') {
        setActiveImageIndex(null)
      }

      if (event.key === 'ArrowRight') {
        setActiveImageIndex((current) => ((current ?? 0) + 1) % galleryLength)
      }

      if (event.key === 'ArrowLeft') {
        setActiveImageIndex((current) => ((current ?? 0) - 1 + galleryLength) % galleryLength)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeImageIndex, selectedProject])

  if (!selectedProject || selectedProject.slug !== slug) {
    return (
      <div className="site-shell">
        <PublicSiteHeader />
        <main className="section">
          <div className="container project-page project-page--empty">
            <Link className="project-page__back" to="/">
              Back to Home
            </Link>
            <p>{detailStatus === 'loading' ? 'Loading project gallery...' : 'Project not found.'}</p>
          </div>
        </main>
        <PublicSiteFooter />
        <WhatsAppBubble />
      </div>
    )
  }

  const galleryImages = selectedProject.galleryImages || []
  const activeImage = activeImageIndex !== null ? galleryImages[activeImageIndex] : null

  const handleOpenImage = (index) => {
    setActiveImageIndex(index)
  }

  const handleCloseLightbox = () => {
    setActiveImageIndex(null)
  }

  const handlePreviousImage = () => {
    setActiveImageIndex((current) => (current - 1 + galleryImages.length) % galleryImages.length)
  }

  const handleNextImage = () => {
    setActiveImageIndex((current) => (current + 1) % galleryImages.length)
  }

  return (
    <div className="site-shell">
      <PublicSiteHeader />

      <main>
        <section className="section">
          <div className="container project-page">
            <section className="project-page__intro">
              <div className="project-page__intro-copy">
                <Link className="project-page__back" to="/projects">
                  Back to Projects
                </Link>
                <h1>{selectedProject.name}</h1>
                <p className="project-page__summary">{selectedProject.shortDescription}</p>
              </div>

              <div className="project-page__hero-meta">
                <span>Curated project gallery</span>
                <span>{selectedProject.galleryImages?.length || 0} visual assets</span>
              </div>
            </section>

            <section className="project-page__hero">
              <div className="project-page__hero-media">
                <LazyImage src={selectedProject.coverImage?.url} alt={selectedProject.name} eager />
              </div>

              <div className="project-page__hero-copy">
                <p className="eyebrow project-page__eyebrow">Delivered Project</p>
                <h2>Project Snapshot</h2>
                <p>
                  A focused preview of the delivered site before you move through the full visual
                  gallery.
                </p>
              </div>
            </section>

            <section className="project-page__gallery">
              {galleryImages.length ? (
                galleryImages.map((image, index) => {
                  const imageLabel =
                    image.caption || `${selectedProject.name} gallery image ${index + 1}`

                  return (
                    <figure
                      key={image.key || `${selectedProject.slug}-${index + 1}`}
                      className="project-page__image"
                      onClick={() => handleOpenImage(index)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          handleOpenImage(index)
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <LazyImage src={image.url} alt={imageLabel} />
                      <figcaption>{imageLabel}</figcaption>
                    </figure>
                  )
                })
              ) : (
                <p className="project-page__empty-copy">
                  No gallery images have been added for this project yet.
                </p>
              )}
            </section>
          </div>
        </section>
      </main>

      {activeImage ? (
        <div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.caption || `${selectedProject.name} image viewer`}
          onClick={handleCloseLightbox}
        >
          <button
            type="button"
            className="project-lightbox__close"
            aria-label="Close image viewer"
            onClick={handleCloseLightbox}
          >
            Close
          </button>

          {galleryImages.length > 1 ? (
            <>
              <button
                type="button"
                className="project-lightbox__nav project-lightbox__nav--prev"
                aria-label="Previous image"
                onClick={(event) => {
                  event.stopPropagation()
                  handlePreviousImage()
                }}
              >
                Prev
              </button>
              <button
                type="button"
                className="project-lightbox__nav project-lightbox__nav--next"
                aria-label="Next image"
                onClick={(event) => {
                  event.stopPropagation()
                  handleNextImage()
                }}
              >
                Next
              </button>
            </>
          ) : null}

          <figure
            className="project-lightbox__figure"
            onClick={(event) => event.stopPropagation()}
          >
            <LazyImage
              src={activeImage.url}
              alt={activeImage.caption || `${selectedProject.name} image ${activeImageIndex + 1}`}
              eager
            />
            <figcaption>
              <strong>{activeImage.caption || `${selectedProject.name} image ${activeImageIndex + 1}`}</strong>
              <span>
                {activeImageIndex + 1} / {galleryImages.length}
              </span>
            </figcaption>
          </figure>
        </div>
      ) : null}

      <PublicSiteFooter />
      <WhatsAppBubble />
    </div>
  )
}
