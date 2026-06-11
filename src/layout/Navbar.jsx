import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { LogOut, LayoutDashboard, Shield, Receipt, ArrowRightLeft, User } from 'lucide-react'

import { useAppState } from '../app/AppProvider.jsx'
import { navigationItems, profileNavigation } from '../app/navigation.js'
import logo from '../assets/logo.svg'
import profileImage from '../assets/profile_img_1.png'
import { cn } from '../utils/cn.js'


export default function Navbar({ title }) {
  const { logout, state } = useAppState()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showProfileEdit, setShowProfileEdit] = useState(false)
  const location = useLocation()

  // Derived user info — same logic as original
  const profileName =
    [state.user?.firstName, state.user?.lastName].filter(Boolean).join(' ') ||
    profileNavigation.name
  const profileRole = state.user?.email || profileNavigation.role

  // Close mobile menu on route change — same as original
  useEffect(() => {
    setIsMenuOpen(false)
    setShowProfileEdit(false)
  }, [location.pathname])

  // Close profile popover on outside click
  useEffect(() => {
    if (!showProfileEdit) return
    const handler = (e) => {
      if (!e.target.closest('[data-profile-popover]')) {
        setShowProfileEdit(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showProfileEdit])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center py-4  border-slate-200/40 px-4 md:px-10">
      <div className="flex justify-between items-center w-full mx-auto ">
        {/* ── Logo ──────────────────────────────────────────── */}
        <NavLink
          to="/"
          aria-label="Dashboard"
          className="flex items-center gap-3 group bg-transparent backdrop-blur-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4648d4] rounded-2xl pr-2"
        >
          <img
            src={logo}
            alt={`${title} logo`}
            className="w-9 h-9 object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-sans text-xl tracking-tighter font-extrabold text-[#0b1c30]">
            {title}
          </span>
        </NavLink>

        {/* ── Desktop pill navigation ────────────────────────── */}
        <nav
          className="hidden md:flex items-center gap-1 bg-white  backdrop-blur-lg border border-slate-200/50 p-1 rounded-full shadow-xs"
          aria-label="Primary"
          id="primary-navigation"
        >
          {navigationItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 py-2 px-5 rounded-full transition-all text-sm font-semibold  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4648d4]',
                  isActive ? 'text-white bg-[#0b1c30]' : 'text-[#565e74] hover:bg-[#eff4ff]',
                )
              }
            >
              {/* Render icon if present on the item, otherwise no icon */}
              {item.icon && <item.icon size={16} />}
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* ── Right section: profile + logout ───────────────── */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Avatar + name */}
          <div className="flex items-center gap-3 backdrop-blur-lg rounded" data-profile-popover>
            <button
              type="button"
              onClick={() => setShowProfileEdit((c) => !c)}
              title="View profile"
              className="w-10 h-10 rounded-full border-2 border-[#4648d4]/10 overflow-hidden shadow-xs cursor-pointer hover:border-[#4648d4] transition-all  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4648d4]"
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover backdrop-blur-lg"
              />
            </button>

            <div className="hidden lg:block text-left">
              <button
                type="button"
                onClick={() => setShowProfileEdit((c) => !c)}
                className="font-sans text-sm font-bold text-[#0b1c30] leading-tight hover:underline  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4648d4] rounded"
              >
                {profileName}
              </button>
              <p className="text-[11px] text-[#565e74] font-medium text-left">{profileRole}</p>
            </div>

            {/* Profile popover — read-only (name comes from state.user, not editable here) */}
            {showProfileEdit && (
              <div className="absolute top-16 right-32 bg-white p-4 rounded-2xl border border-slate-200 shadow-xl z-50 w-64 animate-fade-in">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow ring-1 ring-slate-900/10"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#0b1c30] truncate">{profileName}</p>
                    <p className="text-[11px] text-[#565e74] truncate">{profileRole}</p>
                  </div>
                </div>
                <NavLink
                  to={profileNavigation.path}
                  className="w-full flex items-center gap-2 text-xs font-semibold text-[#4648d4] hover:underline mt-1 focus-visible:outline-none backdrop-blur-lg rounded"
                  onClick={() => setShowProfileEdit(false)}
                >
                  <User size={13} />
                  View profile
                </NavLink>
              </div>
            )}
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={logout}
            className="hidden md:flex bg-[#d3e4fe]/50 hover:bg-[#d3e4fe backdrop-blur-lg text-[#0b1c30] px-4 md:px-5 py-2 rounded-full font-semibold text-sm transition-all border border-[#c7c4d7]/20 items-center gap-2 cursor-pointer focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#4648d4]"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>

          {/* ── Mobile hamburger ──────────────────────────────── */}
          <button
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setIsMenuOpen((c) => !c)}
            className="inline-flex md:hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-900/8 bg-slate-50 text-slate-950 transition hover:bg-slate-100  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4648d4]"
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
      </div>

      {/* ── Mobile dropdown nav ──────────────────────────────── */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-slate-200/50 shadow-lg px-4 py-4 flex flex-col gap-2 md:hidden animate-fade-in"
        >
          {navigationItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4648d4]',
                  isActive ? 'text-white bg-[#0b1c30]' : 'text-[#565e74] hover:bg-[#eff4ff]',
                )
              }
            >
              {item.icon && <item.icon size={16} />}
              <span>{item.name}</span>
            </NavLink>
          ))}

          {/* Mobile logout */}
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-[#565e74] hover:bg-rose-50 hover:text-rose-600 transition-all mt-1 border-t border-slate-100 pt-3"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </header>
  )
}
