import { SectionHeader } from '../components/SectionHeader'

export function GallerySection({ gallery }) {
  return (
    <section className="section" id="gallery">
      <div className="container">
        <SectionHeader eyebrow="Project Showcase" title="Gallery" centered />
        <div className="gallery-grid">
          {gallery.map((item) => (
            <article key={item.title} className="gallery-card">
              <img src={item.image} alt={item.title} />
              <div className="gallery-card__content">
                <span>{item.category}</span>
                <h3>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
