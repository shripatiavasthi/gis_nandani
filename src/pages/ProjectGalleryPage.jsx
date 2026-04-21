import { useEffect, useMemo } from 'react'
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

  return (
    <div className="site-shell">
      <PublicSiteHeader />

      <main>
        <section className="projects-hero">
          <div className="container">
            <p className="eyebrow">GLOBAL INFRA SOLUTIONS</p>
            <h1>{selectedProject.name}</h1>
            <p className="hero-copy narrow">{selectedProject.shortDescription}</p>
          </div>
        </section>

        <section className="section">
          <div className="container project-page">
            <Link className="project-page__back" to="/projects">
              Back to Projects
            </Link>

            <section className="project-page__hero">
              <div className="project-page__hero-media">
                <LazyImage src={selectedProject.coverImage?.url} alt={selectedProject.name} eager />
              </div>

              <div className="project-page__hero-copy">
                <p className="eyebrow project-page__eyebrow">Delivered Project</p>
                <h2>{selectedProject.name}</h2>
                <p>{selectedProject.shortDescription}</p>
                <div className="project-page__hero-meta">
                  <span>Curated project gallery</span>
                  <span>{selectedProject.galleryImages?.length || 0} visual assets</span>
                </div>
              </div>
            </section>

            <section className="project-page__gallery">
              {selectedProject.galleryImages?.length ? (
                selectedProject.galleryImages.map((image, index) => {
                  const imageLabel =
                    image.caption || `${selectedProject.name} gallery image ${index + 1}`

                  return (
                    <figure
                      key={image.key || `${selectedProject.slug}-${index + 1}`}
                      className="project-page__image"
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

      <PublicSiteFooter />
      <WhatsAppBubble />
    </div>
  )
}
