import { useState, useRef, useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAppState } from '../app/AppProvider.jsx'
import logo from '../assets/logo.svg'

/**
 * Nexora Finance — Login Page
 * UI fully rebuilt to match the glassmorphism dark design.
 * All auth logic (useAppState, login, navigate, error/loading states) is untouched.
 */
export default function Login() {
  const { login, state } = useAppState()
  const location = useLocation()
  const navigate = useNavigate()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  // Card drag / movable UI (purely visual)
  const [cardOffset, setCardOffset] = useState({ x: 0, y: 0 })
  const draggingRef = useRef({ active: false, startX: 0, startY: 0, origX: 0, origY: 0 })
  const cardRef = useRef(null)

  useEffect(() => {
    function onPointerMove(e) {
      if (!draggingRef.current.active) return
      const dx = e.clientX - draggingRef.current.startX
      const dy = e.clientY - draggingRef.current.startY
      setCardOffset({ x: draggingRef.current.origX + dx, y: draggingRef.current.origY + dy })
    }
    function onPointerUp() {
      if (!draggingRef.current.active) return
      draggingRef.current.active = false
      // gently snap back a little for a playful feel (optional)
      setCardOffset((cur) => ({ x: cur.x * 0.95, y: cur.y * 0.95 }))
    }
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [])

  function handleCardPointerDown(e) {
    // only start drag when primary button
    if (e.button && e.button !== 0) return
    draggingRef.current.active = true
    draggingRef.current.startX = e.clientX
    draggingRef.current.startY = e.clientY
    draggingRef.current.origX = cardOffset.x
    draggingRef.current.origY = cardOffset.y
    // allow pointer capture so we get move events even if outside
    try { e.currentTarget.setPointerCapture && e.currentTarget.setPointerCapture(e.pointerId) } catch (err) {}
  }

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
    <>
      {/* ── Global styles injected once ─────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .nf-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #0b1326;
          background-image:
            radial-gradient(at 0% 0%,   rgba(105, 0, 179, 0.18) 0px, transparent 50%),
            radial-gradient(at 100% 0%,  rgba(128,131,255, 0.18) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(0,  76,110, 0.22) 0px, transparent 50%),
            radial-gradient(at 0%  100%, rgba(73,  75,214, 0.22) 0px, transparent 50%);
          overflow-x: hidden;
        }

        /* ── Header ─────────────────────────────────────────────────────── */
        .nf-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 24px 20px;
        }
        @media (min-width: 768px) { .nf-header { padding: 24px 64px; } }

        .nf-logo-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .nf-logo-box {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(192,193,255,0.12);
          border: 1px solid rgba(192,193,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .nf-logo-box img { width: 28px; height: 28px; object-fit: contain; }
        .nf-brand-name {
          font-size: 22px;
          font-weight: 800;
          color: #dae2fd;
          letter-spacing: -0.03em;
        }

        .nf-nav { display: none; gap: 32px; }
        @media (min-width: 768px) { .nf-nav { display: flex; } }
        .nf-nav a {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          color: #908fa0;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.2s;
        }
        .nf-nav a:hover { color: #c0c1ff; }

        /* ── Main ────────────────────────────────────────────────────────── */
        .nf-main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 20px;
          position: relative;
        }

        /* ambient glow blobs */
        .nf-glow-center {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(192,193,255,0.06) 0%, transparent 65%);
          pointer-events: none;
        }
        .nf-glow-secondary {
          position: absolute;
          top: 20%; right: 20%;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(221,183,255,0.05) 0%, transparent 65%);
          pointer-events: none;
        }

        /* ── Side floating cards ─────────────────────────────────────────── */
        .nf-side-cards {
          display: none;
          flex-direction: column;
          gap: 16px;
          position: absolute;
          left: 64px;
          top: 50%;
          transform: translateY(-50%);
        }
        @media (min-width: 1100px) { .nf-side-cards { display: flex; } }

        .nf-float-card {
          background: rgba(23,31,51,0.65);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(192,193,255,0.12);
          border-radius: 16px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          max-width: 240px;
          animation: floatUp 0.6s ease both;
        }
        .nf-float-card:nth-child(1) {
          transform: rotate(-2deg);
          animation-delay: 0.3s;
        }
        .nf-float-card:nth-child(2) {
          transform: rotate(3deg) translateX(48px);
          animation-delay: 0.5s;
        }
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(20px) rotate(var(--r, 0deg)); }
          to   { opacity: 1; }
        }

        .nf-float-icon {
          width: 40px; height: 40px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .nf-float-icon.purple {
          background: rgba(192,193,255,0.15);
        }
        .nf-float-icon.teal {
          background: rgba(137,206,255,0.15);
        }
        .nf-float-icon .material-symbols-outlined {
          font-size: 20px;
          font-variation-settings: 'FILL' 1;
        }
        .nf-float-icon.purple .material-symbols-outlined { color: #c0c1ff; }
        .nf-float-icon.teal   .material-symbols-outlined { color: #89ceff; }

        .nf-float-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          color: #dae2fd;
          margin-bottom: 2px;
        }
        .nf-float-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #908fa0;
        }

        /* ── Glass Card ──────────────────────────────────────────────────── */
        .nf-card {
          background: rgba(23,31,51,0.60);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(192,193,255,0.10);
          box-shadow:
            0 40px 80px -20px rgba(0,0,0,0.55),
            inset 0 1px 1px rgba(255,255,255,0.04);
          border-radius: 28px;
          padding: 40px;
          width: 100%;
          max-width: 480px;
          position: relative;
          z-index: 10;
          animation: cardIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .nf-workspace-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #c0c1ff;
          margin-bottom: 6px;
        }
        .nf-card h1 {
          font-size: 36px;
          font-weight: 800;
          color: #dae2fd;
          letter-spacing: -0.03em;
          margin-bottom: 28px;
          line-height: 1.1;
        }

        /* ── Form ────────────────────────────────────────────────────────── */
        .nf-form { display: flex; flex-direction: column; gap: 16px; }

        .nf-field { position: relative; }
        .nf-field-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #908fa0;
          font-size: 20px;
          font-variation-settings: 'FILL' 0, 'wght' 300;
          pointer-events: none;
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }
        .nf-field:focus-within .nf-field-icon { color: #c0c1ff; }

        /* Floating label */
        .nf-label {
          position: absolute;
          left: 48px;
          top: 50%;
          transform: translateY(-50%) scale(1);
          transform-origin: left center;
          color: #908fa0;
          font-size: 15px;
          pointer-events: none;
          transition: transform 160ms ease, color 160ms ease, font-size 160ms ease;
          background: transparent;
          padding: 0 4px;
        }
        .nf-field:focus-within .nf-label,
        .nf-field.filled .nf-label {
          transform: translateY(-130%) scale(0.78);
          color: #c0c1ff;
        }

        .nf-input {
          width: 100%;
          background: #0f1726; /* slightly darker than before */
          border: 1px solid #3e3a47;
          border-radius: 14px;
          color: #c0c1ff; /* avoid pure white */
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px;
          padding: 18px 16px 18px 48px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          -webkit-text-fill-color: #c0c1ff;
        }
        .nf-input::placeholder { color: rgba(144,143,160,0.38); }
        .nf-input:focus {
          border-color: #c0c1ff;
          box-shadow: 0 0 0 3px rgba(192,193,255,0.08);
        }
        .nf-input-pr { padding-right: 72px; }

        /* Make card visually movable */
        .nf-card {
          transition: transform 120ms ease, box-shadow 120ms ease;
          will-change: transform;
        }

        .nf-show-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          color: #c0c1ff;
          letter-spacing: 0.04em;
          padding: 6px 8px;
          border-radius: 8px;
          transition: background 0.15s, color 0.15s;
        }
        .nf-show-btn:hover { background: rgba(192,193,255,0.1); color: #fff; }

        /* ── Error ───────────────────────────────────────────────────────── */
        .nf-error {
          background: rgba(255,100,100,0.08);
          border: 1px solid rgba(255,100,100,0.25);
          border-radius: 14px;
          padding: 12px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #fca5a5;
        }

        /* ── Submit button ───────────────────────────────────────────────── */
        .nf-submit {
          width: 100%;
          background: linear-gradient(135deg, #c0c1ff 0%, #8083ff 45%, #6f00be 100%);
          background-size: 200% 200%;
          background-position: left center;
          border: none;
          border-radius: 14px;
          color: #ffffff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 17px;
          font-weight: 700;
          padding: 17px 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          letter-spacing: -0.01em;
          transition: background-position 0.45s ease, transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s;
          margin-top: 4px;
        }
        .nf-submit:hover:not(:disabled) {
          background-position: right center;
          box-shadow: 0 0 24px rgba(128,131,255,0.45);
          transform: scale(1.02);
        }
        .nf-submit:active:not(:disabled) { transform: scale(0.98); }
        .nf-submit:disabled { opacity: 0.55; cursor: not-allowed; }
        .nf-submit .material-symbols-outlined {
          font-size: 20px;
          font-variation-settings: 'FILL' 0;
        }

        /* ── Forgot password ─────────────────────────────────────────────── */
        .nf-forgot {
          text-align: center;
          margin-top: 4px;
        }
        .nf-forgot a {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          color: #908fa0;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.2s;
        }
        .nf-forgot a:hover { color: #c0c1ff; }

        /* ── Card divider + footer note ──────────────────────────────────── */
        .nf-card-footer {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid rgba(70,69,84,0.35);
          text-align: center;
        }
        .nf-card-footer p {
          font-size: 14px;
          color: #908fa0;
          line-height: 1.5;
        }

        /* ── Page Footer ─────────────────────────────────────────────────── */
        .nf-footer {
          background: #060e20;
          width: 100%;
        }
        .nf-footer-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          max-width: 1280px;
          margin: 0 auto;
          padding: 28px 20px;
        }
        @media (min-width: 768px) {
          .nf-footer-inner {
            flex-direction: row;
            justify-content: space-between;
            padding: 28px 64px;
          }
        }

        .nf-footer-brand {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          font-weight: 700;
          color: #dae2fd;
          letter-spacing: 0.02em;
        }
        .nf-footer-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 28px;
        }
        .nf-footer-links a {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          color: #908fa0;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.2s;
        }
        .nf-footer-links a:hover { color: #c0c1ff; }
        .nf-footer-copy {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          color: #89ceff;
          letter-spacing: 0.02em;
          opacity: 0.85;
        }
      `}</style>

      <div className="nf-root">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header className="nf-header">
          <a className="nf-logo-wrap" href="/">
            <div className="nf-logo-box">
              <img src={logo} alt="Nexora Finance logo" />
            </div>
            <span className="nf-brand-name">Nexora Finance</span>
          </a>

          <nav className="nf-nav" aria-label="Header navigation">
            <a href="#">Support</a>
            <a href="#">Security</a>
          </nav>
        </header>

        {/* ── Main ────────────────────────────────────────────────────────── */}
        <main className="nf-main">
          {/* ambient glow */}
          <div className="nf-glow-center" aria-hidden="true" />
          <div className="nf-glow-secondary" aria-hidden="true" />

          {/* Side floating feature cards — visible on large screens */}
          <div className="nf-side-cards" aria-hidden="true">
            <div className="nf-float-card">
              <div className="nf-float-icon purple">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <div>
                <p className="nf-float-title">Instant Sync</p>
                <p className="nf-float-sub">Real-time node processing</p>
              </div>
            </div>

            <div className="nf-float-card">
              <div className="nf-float-icon teal">
                <span className="material-symbols-outlined">shield</span>
              </div>
              <div>
                <p className="nf-float-title">Encrypted Shell</p>
                <p className="nf-float-sub">Quantum-ready security</p>
              </div>
            </div>
          </div>

          {/* ── Glass login card ────────────────────────────────────────── */}
          <div
              className="nf-card"
              role="main"
              ref={cardRef}
              onPointerDown={handleCardPointerDown}
              style={{ transform: `translate(${cardOffset.x}px, ${cardOffset.y}px)` }}
            >
            <p className="nf-workspace-label">Nexora Finance Workspace</p>
            <h1>Sign in</h1>

            <form className="nf-form" onSubmit={handleSubmit} noValidate>

              {/* Email field */}
              <div className={`nf-field ${form.email ? 'filled' : ''}`}>
                <span className="nf-field-icon material-symbols-outlined" aria-hidden="true">
                  mail
                </span>
                <label htmlFor="email" className="nf-label">Email Address</label>
                <input
                  className="nf-input"
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder=" "
                  value={form.email}
                  onChange={(e) =>
                    setForm((cur) => ({ ...cur, email: e.target.value }))
                  }
                  aria-label="Email address"
                />
              </div>

              {/* Password field */}
              <div className={`nf-field ${form.password ? 'filled' : ''}`}>
                <span className="nf-field-icon material-symbols-outlined" aria-hidden="true">
                  lock
                </span>
                <label htmlFor="password" className="nf-label">Password</label>
                <input
                  className="nf-input nf-input-pr"
                  id="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  required
                  placeholder=" "
                  value={form.password}
                  onChange={(e) =>
                    setForm((cur) => ({ ...cur, password: e.target.value }))
                  }
                  aria-label="Password"
                />
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
                    <span className="material-symbols-outlined" aria-hidden="true">
                      arrow_forward
                    </span>
                  </>
                )}
              </button>

              {/* Forgot password */}
              <div className="nf-forgot">
                <a href="#">Forgot your password?</a>
              </div>
            </form>

            {/* Card footer note */}
            <div className="nf-card-footer">
              <p>Use your account email and password to continue.</p>
            </div>
          </div>
        </main>

        {/* ── Page footer ─────────────────────────────────────────────────── */}
        <footer className="nf-footer">
          <div className="nf-footer-inner">
            <span className="nf-footer-brand">Nexora Finance</span>

            <nav className="nf-footer-links" aria-label="Footer links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Security</a>
              <a href="#">Help Center</a>
            </nav>

            <span className="nf-footer-copy">
              © 2024 Nexora Finance. All rights reserved.
            </span>
          </div>
        </footer>

      </div>
    </>
  )
}