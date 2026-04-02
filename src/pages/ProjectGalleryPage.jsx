import { useEffect, useMemo } from 'react'
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

  return (
    <div className="project-page-shell">
      <div className="project-page container">
        <Link className="project-page__back" to="/">
          Back to Home
        </Link>

        <div className="project-page__hero">
          <LazyImage src={selectedProject.coverImage?.url} alt={selectedProject.name} eager />
          <div>
            <p className="project-page__eyebrow">Delivered Project</p>
            <h1>{selectedProject.name}</h1>
            <p>{selectedProject.shortDescription}</p>
          </div>
        </div>

        <div className="project-page__grid">
          {selectedProject.galleryImages?.length ? (
            selectedProject.galleryImages.map((image, index) => {
   
              const imageLabel = getGalleryImageLabel(image, index)

              return (
                <figure key={image.key} className="project-page__image">
                  <LazyImage src={image.url} alt={imageLabel} />
                  <figcaption>{imageLabel}</figcaption>
                </figure>
              )
            })
          ) : (
            <p className="project-page__empty">No gallery images have been added for this project yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
