import { Outlet } from 'react-router-dom'

import Navbar from './Navbar.jsx'

export default function MainLayout() {
  return (
    <div className="min-h-screen  bg-[radial-gradient(circle_at_top,rgba(78,54,226,0.14),transparent_32%),linear-gradient(180deg,#f7f9fc_0%,#eef3f9_100%)]">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-slate-950 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
        href="#main-content"
      >
        Skip to content
      </a>

      <Navbar title="NEXORA" />

      {/*
        pt-20 offsets the fixed header height (~72px).
        Adjust if your header grows taller.
      */}
      <main
        id="main-content"
        className="mx-auto w-[min(1180px,calc(100%-2rem))] pt-24 pb-4 sm:pb-6 xl:pb-8"
      >
        <Outlet />
      </main>
    </div>
  )
}
