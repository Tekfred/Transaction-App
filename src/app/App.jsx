import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import MainLayout from '../layout/MainLayout.jsx'
import { appRoutes } from './routes.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />} path="/">
          {appRoutes.map((route) => (
            <Route element={route.element} index={route.index} key={route.id} path={route.path} />
          ))}
          <Route element={<Navigate replace to="/" />} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
