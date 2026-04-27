import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAppState } from './AppProvider.jsx'

export default function ProtectedRoute() {
  const { state } = useAppState()
  const location = useLocation()

  if (state.isAuthLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 px-4">
        <div className="rounded-3xl border border-slate-900/8 bg-white p-6 text-center shadow-[0_18px_44px_rgba(31,53,88,0.08)]">
          <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Loading</p>
          <p className="mt-2 text-xl font-semibold text-slate-950">Checking your session</p>
        </div>
      </div>
    )
  }

  if (!state.isAuthenticated) {
    return <Navigate replace state={{ from: location }} to="/login" />
  }

  return <Outlet />
}
