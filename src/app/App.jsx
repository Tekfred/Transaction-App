import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import MainLayout from '../layout/MainLayout.jsx'
import Login from '../pages/Login.jsx'
import { AppProvider } from './AppProvider.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import PublicOnlyRoute from './PublicOnlyRoute.jsx'
import { appRoutes } from './routes.jsx'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicOnlyRoute />}>
            <Route element={<Login />} path="/login" />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />} path="/">
              {appRoutes.map((route) => (
                <Route
                  element={route.element}
                  index={route.index}
                  key={route.id}
                  path={route.path}
                />
              ))}
              <Route element={<Navigate replace to="/" />} path="*" />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
