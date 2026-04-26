import { lazy } from 'react'

const HomePage = lazy(() => import('../pages/HomePage'))
const AboutPage = lazy(() => import('../pages/AboutPage'))
const CrmPage = lazy(() => import('../pages/CrmPage'))
const AllProjectsPage = lazy(() => import('../pages/AllProjectsPage'))
const ProjectGalleryPage = lazy(() => import('../pages/ProjectGalleryPage'))

export const routeConfig = [
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/about',
    Component: AboutPage,
  },
  {
    path: '/crm',
    Component: CrmPage,
  },
  {
    path: '/projects',
    Component: AllProjectsPage,
  },
  {
    path: '/projects/:slug',
    Component: ProjectGalleryPage,
  },
]
