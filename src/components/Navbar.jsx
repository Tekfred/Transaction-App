import { NavLink } from 'react-router-dom'

import logo from '../assets/logo.svg'
import profileImage from '../assets/profile_img_1.png'

const navigation = [
  {
    name: 'Dashboard',
    path: '/',
  },
  {
    name: 'My Accounts',
    path: '/my-accounts',
  },
  {
    name: 'Payments',
    path: '/payments',
  },
  {
    name: 'Transfers',
    path: '/transfers',
  },
]

const navLinkClass = ({ isActive }) =>
  [
    'w-full rounded-full border border-slate-900/8 bg-white/80 px-4 py-3 text-center font-semibold shadow-[0_10px_24px_rgba(32,54,86,0.06)] transition hover:opacity-90 sm:w-auto sm:py-[0.7rem]',
    isActive ? 'bg-slate-900 text-white' : 'text-slate-700',
  ].join(' ')

export default function Navbar({ title }) {
  return (
    <header className="mx-auto grid w-[min(1100px,calc(100%-2rem))] gap-5 bg-[#0673c6] py-6 md:grid-cols-[1fr_auto] md:items-center">
      <div className="flex items-start gap-4 sm:items-center">
        <img
          alt="Transaction App logo"
          className="rounded-[18px] bg-white p-3 shadow-[0_18px_40px_rgba(32,54,86,0.08)]"
          height="56"
          src={logo}
          width="56"
        />
        <div>
          <p className="mb-0.5 text-xs font-bold uppercase tracking-[0.12em] text-slate-100">
            Finance Workspace
          </p>
          <h1 className="m-0 text-[clamp(1.75rem,4vw,2.4rem)] font-bold text-white">
            {title}
          </h1>
        </div>
      </div>

      <nav className="flex flex-wrap items-center gap-2 sm:gap-3" aria-label="Primary">
        {navigation.map((navigate) => (
          <NavLink
            className={navLinkClass}
            end={navigate.path === '/'}
            key={navigate.path}
            to={navigate.path}
          >
            {navigate.name}
          </NavLink>
        ))}

        <NavLink
          aria-label="Profile"
          className="ml-0 flex items-center gap-3 rounded-full bg-white/80 px-3 py-2 font-semibold text-slate-800 shadow-[0_10px_24px_rgba(32,54,86,0.06)] transition hover:opacity-90 md:ml-2"
          to="/profile"
        >
          <span>Cony</span>
          <img
            alt="Profile"
            className="h-8 w-8 rounded-full border-2 border-[#4B2AAD]/30 object-cover shadow-md ring-2 ring-[#4B2AAD]/20 transition-all duration-300 hover:ring-[#4B2AAD]/60 md:h-10 md:w-10"
            src={profileImage}
          />
        </NavLink>
      </nav>
    </header>
  )
}
