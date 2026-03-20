import { siteContent } from './data/siteContent'
import { TopBar } from './components/TopBar'
import { Header } from './components/Header'
import { HeroSection } from './sections/HeroSection'
import { AboutSection } from './sections/AboutSection'
import { HighlightsSection } from './sections/HighlightsSection'
import { ServicesSection } from './sections/ServicesSection'
import { GallerySection } from './sections/GallerySection'
import { StatsSection } from './sections/StatsSection'
import { WhyChooseUsSection } from './sections/WhyChooseUsSection'
import { ClientsSection } from './sections/ClientsSection'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="page-shell">
      <TopBar contact={siteContent.contact} socialLinks={siteContent.socialLinks} />
      <Header company={siteContent.company} navigation={siteContent.navigation} />
      <main>
        <HeroSection hero={siteContent.hero} />
        <AboutSection about={siteContent.about} />
        <HighlightsSection highlights={siteContent.highlights} />
        <ServicesSection services={siteContent.services} />
        <GallerySection gallery={siteContent.gallery} />
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

export default App
