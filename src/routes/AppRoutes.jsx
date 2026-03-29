import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { RouteLoader } from '../components/RouteLoader'
import { routeConfig } from './routeConfig'

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        {routeConfig.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
