import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { useAppState } from '../app/AppProvider.jsx'
import logo from '../assets/logo.svg'
import { Button, Card, FormControl } from '../components/ui/index.js'

export default function Login() {
  const { login, state } = useAppState()
  const location = useLocation()
  const navigate = useNavigate()
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
            alt="Transaction App logo"
            className="h-12 w-12 rounded-2xl bg-white p-2 shadow-[0_12px_28px_rgba(32,54,86,0.08)]"
            src={logo}
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
              Finance Workspace
            </p>
            <h1 className="text-2xl font-bold text-slate-950">Sign in</h1>
          </div>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Email</span>
            <FormControl
              className="border-slate-900/10 bg-white text-slate-950 focus:border-[--color-primary] focus:ring-[--color-primary]/15"
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
            <FormControl
              className="border-slate-900/10 bg-white text-slate-950 focus:border-[--color-primary] focus:ring-[--color-primary]/15"
              onChange={(event) =>
                setForm((current) => ({ ...current, password: event.target.value }))
              }
              placeholder="secret123"
              required
              type="password"
              value={form.password}
            />
          </label>

          {state.authError ? (
            <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
              {state.authError}
            </p>
          ) : null}

          <Button disabled={state.isAuthLoading} size="lg" type="submit">
            {state.isAuthLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </Card>
    </main>
  )
}
