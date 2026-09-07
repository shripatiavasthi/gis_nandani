import { lazy } from 'react'
import { services } from '../data/services'

const HomePage = lazy(() => import('../pages/HomePage'))
const AboutPage = lazy(() => import('../pages/AboutPage'))
const ContactPage = lazy(() => import('../pages/ContactPage'))
const CrmPage = lazy(() => import('../pages/CrmPage'))
const AllProjectsPage = lazy(() => import('../pages/AllProjectsPage'))
const ProjectGalleryPage = lazy(() => import('../pages/ProjectGalleryPage'))

const ServicePage = lazy(() => import('../pages/ServicePage'))

export const routeConfig = [
  ...services.map(({ path }) => ({ path, Component: ServicePage })),
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/about',
    Component: AboutPage,
  },
  {
    path: '/contact',
    Component: ContactPage,
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
