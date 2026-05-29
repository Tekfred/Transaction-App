import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { useAppState } from '../app/AppProvider.jsx'
import logo from '../assets/logo.svg'
import { Button, Card, FormControl } from '../components/ui/index.js'

export default function Login() {
  const { login, state } = useAppState()
  const location = useLocation()
  const navigate = useNavigate()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const redirectTo = location.state?.from?.pathname || '/'

  if (state.isAuthenticated) {
    return <Navigate replace to={redirectTo} />
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      await login(form)
      navigate(redirectTo, { replace: true })
    } catch {
      // Error text is rendered from auth state.
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,rgba(78,54,226,0.14),transparent_32%),linear-gradient(180deg,#f7f9fc_0%,#eef3f9_100%)] px-4 py-8">
      <Card className="w-full max-w-md" padded="lg">
        <div className="mb-6 flex items-center gap-3">
          <img
            alt="NEXORA Finance Workspace logo"
            className="h-14 w-14 rounded-2xl bg-white shadow-[0_14px_30px_rgba(32,54,86,0.12)]"
            src={logo}
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
              NEXORA Finance Workspace
            </p>
            <h1 className="text-2xl font-bold text-slate-950">Sign in</h1>
          </div>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Email</span>
            <FormControl
              autoComplete="email"
              className="h-12 cursor-text border-slate-300 bg-white text-[16px] text-slate-950 caret-[#4e36e2] shadow-[inset_0_1px_0_rgba(15,23,42,0.03)] placeholder:text-slate-400 focus:border-[#4e36e2] focus:bg-white focus:ring-[rgba(78,54,226,0.18)]"
              name="email"
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              placeholder="user@example.com"
              required
              type="email"
              value={form.email}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Password</span>
            <div className="relative">
              <FormControl
                autoComplete="current-password"
                className="h-12 cursor-text border-slate-300 bg-white pr-24 text-[16px] text-slate-950 caret-[#4e36e2] shadow-[inset_0_1px_0_rgba(15,23,42,0.03)] placeholder:text-slate-400 focus:border-[#4e36e2] focus:bg-white focus:ring-[rgba(78,54,226,0.18)]"
                name="password"
                onChange={(event) =>
                  setForm((current) => ({ ...current, password: event.target.value }))
                }
                placeholder="Enter your password"
                required
                type={isPasswordVisible ? 'text' : 'password'}
                value={form.password}
              />
              <button
                className="absolute right-2 top-1/2 min-h-8 -translate-y-1/2 rounded-lg px-3 text-xs font-bold text-[#4e36e2] transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4e36e2]"
                onClick={() => setIsPasswordVisible((current) => !current)}
                type="button"
              >
                {isPasswordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          {state.authError ? (
            <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
              {state.authError}
            </p>
          ) : null}

          <div className="grid gap-2 pt-2">
            <Button
              className="w-full border border-indigo-500/20 text-base"
              disabled={state.isAuthLoading}
              size="lg"
              type="submit"
            >
              {state.isAuthLoading ? 'Logging in...' : 'Sign in to account'}
            </Button>
            <p className="text-center text-xs font-semibold text-slate-500">
              Use your account email and password to continue.
            </p>
          </div>
        </form>
      </Card>
    </main>
  )
}
