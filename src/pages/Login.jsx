import { useState, useRef, useCallback } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAppState } from '../app/AppProvider.jsx'
import logo from '../assets/logo.svg'

/**
 * Nexora Finance — Login Page
 * ─ Floating animated labels (label lifts + shrinks on focus/fill)
 * ─ Dark-matched inputs (no white backgrounds)
 * ─ Mouse-tracking 3D card tilt
 * ─ All auth logic (useAppState, login, navigate, errors) untouched
 */
export default function Login() {
  const { login, state } = useAppState()
  const location = useLocation()
  const navigate = useNavigate()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const cardRef = useRef(null)

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

  // Mouse-tracking 3D tilt on the card
  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    card.style.transform = `perspective(1000px) rotateX(${dy * -5}deg) rotateY(${dx * 5}deg)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    setTimeout(() => {
      if (card) card.style.transition = 'transform 0.08s linear'
    }, 500)
  }, [])

  return (
    <>
      <div className="nf-root" onMouseMove={handleMouseMove}>

        {/* ── Header ──────────────────────────────────────────── */}
        <header className="nf-header">
          <a className="nf-logo" href="/">
            <div className="nf-logo-box">
              <img src={logo} alt="Nexora Finance" />
            </div>
            <span className="nf-brand">Nexora Finance</span>
          </a>
          <nav className="nf-nav">
            <a href="#">Support</a>
            <a href="#">Security</a>
          </nav>
        </header>

        {/* ── Main ─────────────────────────────────────────────── */}
        <main className="nf-main">
          <div className="nf-glow-a" aria-hidden="true" />
          <div className="nf-glow-b" aria-hidden="true" />

          {/* Side floating cards */}
          <div className="nf-side" aria-hidden="true">
            <div className="nf-fc">
              <div className="nf-fc-icon purple">
                <span className="ms">bolt</span>
              </div>
              <div>
                <p className="nf-fc-title">Instant Sync</p>
                <p className="nf-fc-sub">Real-time node processing</p>
              </div>
            </div>
            <div className="nf-fc">
              <div className="nf-fc-icon teal">
                <span className="ms">shield</span>
              </div>
              <div>
                <p className="nf-fc-title">Encrypted Shell</p>
                <p className="nf-fc-sub">Quantum-ready security</p>
              </div>
            </div>
          </div>

          {/* Glass card */}
          <div
            className="nf-card"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <p className="nf-ws-label">Nexora Finance Workspace</p>
            <h1>Sign in</h1>

            <form className="nf-form" onSubmit={handleSubmit} noValidate>

              {/* ── Email field ─────────────────────────────── */}
              <div className="nf-field">
                <span className="nf-fi ms" aria-hidden="true">mail</span>
                <input
                  className="nf-input"
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  data-filled={form.email.length > 0 ? 'true' : 'false'}
                  onChange={(e) =>
                    setForm((cur) => ({ ...cur, email: e.target.value }))
                  }
                  aria-label="Email address"
                />
                <label className="nf-label" htmlFor="email">Email Address</label>
              </div>

              {/* ── Password field ──────────────────────────── */}
              <div className="nf-field">
                <span className="nf-fi ms" aria-hidden="true">lock</span>
                <input
                  className="nf-input nf-input-pr"
                  id="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={form.password}
                  data-filled={form.password.length > 0 ? 'true' : 'false'}
                  onChange={(e) =>
                    setForm((cur) => ({ ...cur, password: e.target.value }))
                  }
                  aria-label="Password"
                />
                <label className="nf-label" htmlFor="password">Password</label>
                <button
                  type="button"
                  className="nf-show-btn"
                  onClick={() => setIsPasswordVisible((cur) => !cur)}
                  aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                >
                  {isPasswordVisible ? 'Hide' : 'Show'}
                </button>
              </div>

              {/* Auth error */}
              {state.authError && (
                <div className="nf-error" role="alert">
                  {state.authError}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="nf-submit"
                disabled={state.isAuthLoading}
              >
                {state.isAuthLoading ? (
                  'Logging in...'
                ) : (
                  <>
                    Sign in to account
                    <span className="ms" aria-hidden="true">arrow_forward</span>
                  </>
                )}
              </button>

              {/* Forgot password */}
              <div className="nf-forgot">
                <a href="#">Forgot your password?</a>
              </div>
            </form>

            <div className="nf-card-foot">
              <p>Use your account email and password to continue.</p>
            </div>
          </div>
        </main>

        {/* ── Footer ──────────────────────────────────────────── */}
        <footer className="nf-footer">
          <div className="nf-footer-in">
            <span className="nf-footer-brand">Nexora Finance</span>
            <nav className="nf-footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Security</a>
              <a href="#">Help Center</a>
            </nav>
            <span className="nf-footer-copy">© 2024 Nexora Finance. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </>
  )
}