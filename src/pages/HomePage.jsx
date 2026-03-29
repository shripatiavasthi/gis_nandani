import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { siteContent } from '../data/siteContent'
import { TopBar } from '../components/TopBar'
import { Header } from '../components/Header'
import { HeroSection } from '../sections/HeroSection'
import { AboutSection } from '../sections/AboutSection'
import { HighlightsSection } from '../sections/HighlightsSection'
import { ServicesSection } from '../sections/ServicesSection'
import { GallerySection } from '../sections/GallerySection'
import { StatsSection } from '../sections/StatsSection'
import { WhyChooseUsSection } from '../sections/WhyChooseUsSection'
import { ClientsSection } from '../sections/ClientsSection'
import { Footer } from '../components/Footer'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import {
  fetchProjects,
} from '../features/projects/projectsSlice'

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

  const galleryItems = items.length ? items : fallbackProjects
  const galleryError = status === 'failed' ? 'Project API is not reachable yet. Showing sample cards for now.' : ''
  const emptyStateMessage =
    !items.length && !error && status !== 'loading'
      ? 'No delivered projects have been added yet. Showing sample cards for now.'
      : ''

  return (
    <div className="page-shell">
      <TopBar contact={siteContent.contact} socialLinks={siteContent.socialLinks} />
      <Header company={siteContent.company} navigation={siteContent.navigation} />
      <main>
        <HeroSection hero={siteContent.hero} />
        <AboutSection about={siteContent.about} />
        <HighlightsSection highlights={siteContent.highlights} />
        <ServicesSection services={siteContent.services} />
        <GallerySection
          gallery={galleryItems}
          onSelectProject={handleSelectProject}
          isLoading={status === 'loading'}
          errorMessage={galleryError || emptyStateMessage}
        />
        <StatsSection stats={siteContent.stats} />
        <WhyChooseUsSection items={siteContent.whyChooseUs} />
        <ClientsSection clients={siteContent.clients} />
      </main>
      <Footer
        footer={siteContent.footer}
        socialLinks={siteContent.socialLinks}
        contact={siteContent.contact}
      />
    </div>
  )
}
