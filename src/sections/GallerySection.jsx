import { useRef } from 'react'
import { Link } from 'react-router-dom'

import { LazyImage } from '../components/LazyImage'
import { SectionHeader } from '../components/SectionHeader'

export function GallerySection({ gallery, onSelectProject, isLoading, errorMessage }) {
  const trackRef = useRef(null)

  const scrollTrack = (direction) => {
    if (!trackRef.current) {
      return
    }

    trackRef.current.scrollBy({
      left: direction * Math.min(trackRef.current.clientWidth * 0.92, 980),
      behavior: 'smooth',
    })
  }

  return (
    <section className="section" id="gallery">
      <div className="container">
        <div className="gallery-showcase__header">
          <SectionHeader eyebrow="Project Showcase" title="Gallery" />
          <div className="gallery-showcase__actions">
            <button className="gallery-nav" onClick={() => scrollTrack(-1)} type="button">
              Prev
            </button>
            <button className="gallery-nav" onClick={() => scrollTrack(1)} type="button">
              Next
            </button>
            <Link className="button button--secondary" to="/projects">
              See All
            </Link>
          </div>
        </div>
        {errorMessage ? <p className="gallery-state">{errorMessage}</p> : null}
        {isLoading ? <p className="gallery-state">Loading delivered projects...</p> : null}
        <div className="gallery-carousel" ref={trackRef}>
          {gallery.map((item) => (
            <article
              key={item.slug || item.title}
              className="gallery-card gallery-card--interactive gallery-card--carousel"
              onClick={() => onSelectProject(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onSelectProject(item)
                }
              }}
            >
              <LazyImage src={item.coverImage?.url || item.image} alt={item.name || item.title} />
              <div className="gallery-card__content">
                <span>{item.galleryCount ? `${item.galleryCount} photos` : item.category || 'Delivered Project'}</span>
                <h3>{item.name || item.title}</h3>
                <p>{item.shortDescription}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
