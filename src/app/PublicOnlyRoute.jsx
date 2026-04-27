import { Navigate, Outlet } from 'react-router-dom'

import { useAppState } from './AppProvider.jsx'

export default function PublicOnlyRoute() {
  const { state } = useAppState()

  if (state.isAuthLoading) {
    return null
  }

  if (state.isAuthenticated) {
    return <Navigate replace to="/" />
  }

  return <Outlet />
}
