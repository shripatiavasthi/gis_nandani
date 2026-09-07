import { Seo } from './components/Seo'
import { AppRoutes } from './routes/AppRoutes'
import { ScrollToTop } from './components/ScrollToTop'

function App() {
  return (
    <>
      <Seo />
      <ScrollToTop />
      <AppRoutes />
    </>
  )
}

export default App
