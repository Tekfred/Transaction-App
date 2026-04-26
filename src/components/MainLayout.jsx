import { Outlet } from 'react-router-dom'

import Navbar from './Navbar.jsx'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(78,54,226,0.14),transparent_32%),linear-gradient(180deg,#f7f9fc_0%,#eef3f9_100%)]">
      <Navbar title="Transaction App" />
      <main className="mx-auto w-[min(1100px,calc(100%-2rem))] pb-8">
        <Outlet />
      </main>
    </div>
  )
}
