import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { useAppState } from '../app/AppProvider.jsx'
import { navigationItems, profileNavigation } from '../app/navigation.js'
import logo from '../assets/logo.svg'
import profileImage from '../assets/profile_img_1.png'
import { cn } from '../utils/cn.js'

const navLinkClass = ({ isActive }) =>
  cn(
    'rounded-2xl px-4 py-3 text-sm font-bold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]',
    isActive
      ? 'bg-slate-950 text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)]'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
  )

export default function Navbar({ title }) {
  const { logout, state } = useAppState()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const profileName =
    [state.user?.firstName, state.user?.lastName].filter(Boolean).join(' ') ||
    profileNavigation.name
  const profileRole = state.user?.email || profileNavigation.role

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-slate-900/8 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto w-[min(1100px,calc(100%-2rem))] py-3">
        <div className="grid gap-3 rounded-[28px] border border-slate-900/8 bg-white/90 p-3 shadow-[0_18px_48px_rgba(31,53,88,0.08)] lg:grid-cols-[auto_1fr_auto_auto] lg:items-center">
          <div className="flex min-w-0 items-center justify-between gap-4">
            <NavLink
              aria-label="Dashboard"
              className="flex min-w-0 items-center gap-3 rounded-2xl pr-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]"
              to="/"
            >
              <img
                alt="NEXORA Finance Workspace logo"
                className="h-12 w-12 rounded-2xl bg-white p-2 shadow-[0_12px_28px_rgba(32,54,86,0.08)]"
                src={logo}
              />
              <div className="min-w-0">
                <h1 className="truncate text-xl font-bold text-slate-950">{title}</h1>
              </div>
            </NavLink>

            <button
              aria-controls="primary-navigation"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-900/8 bg-slate-50 text-slate-950 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary] lg:hidden"
              onClick={() => setIsMenuOpen((current) => !current)}
              type="button"
            >
              <span className="grid gap-1.5" aria-hidden="true">
                <span
                  className={cn(
                    'block h-0.5 w-5 rounded-full bg-current transition',
                    isMenuOpen && 'translate-y-2 rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'block h-0.5 w-5 rounded-full bg-current transition',
                    isMenuOpen && 'opacity-0',
                  )}
                />
                <span
                  className={cn(
                    'block h-0.5 w-5 rounded-full bg-current transition',
                    isMenuOpen && '-translate-y-2 -rotate-45',
                  )}
                />
              </span>
            </button>
          </div>

          <nav
            className={cn(
              'grid gap-2 lg:flex lg:items-center lg:justify-center',
              isMenuOpen ? 'grid' : 'hidden lg:flex',
            )}
            id="primary-navigation"
            aria-label="Primary"
          >
            {navigationItems.map((navigate) => (
              <NavLink
                className={navLinkClass}
                end={navigate.path === '/'}
                key={navigate.id}
                to={navigate.path}
              >
                <span className="block">{navigate.name}</span>
                <span className="block text-xs font-semibold opacity-70 lg:hidden">
                  {navigate.description}
                </span>
              </NavLink>
            ))}
          </nav>

          <NavLink
            aria-label="Profile"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-2xl border border-slate-900/8 px-3 py-2 transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]',
                isMenuOpen ? 'flex' : 'hidden lg:flex',
                isActive
                  ? 'bg-slate-950 text-white'
                  : 'bg-slate-50 text-slate-800 hover:bg-slate-100',
              )
            }
            to={profileNavigation.path}
          >
            <img
              alt="Profile"
              className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-md ring-1 ring-slate-900/10"
              src={profileImage}
            />
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold">{profileName}</span>
              <span className="block truncate text-xs font-semibold opacity-70">{profileRole}</span>
            </span>
          </NavLink>

          <button
            className={cn(
              'rounded-2xl border border-slate-900/8 bg-slate-50 px-4 py-3 text-left text-sm font-bold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]',
              isMenuOpen ? 'block' : 'hidden lg:block',
            )}
            onClick={logout}
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
