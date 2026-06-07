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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ms { font-family: 'Material Symbols Outlined'; display: inline-block; line-height: 1; font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }

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

        /* ── Header ─────────────────────────────────────────── */
        .nf-header {
          display: flex; justify-content: space-between; align-items: center;
          width: 100%; max-width: 1280px; margin: 0 auto;
          padding: 24px 20px;
        }
        @media (min-width: 768px) { .nf-header { padding: 24px 64px; } }

        .nf-logo {
          display: flex; align-items: center; gap: 10px; text-decoration: none;
        }
        .nf-logo-box {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(192,193,255,.12);
          border: 1px solid rgba(192,193,255,.22);
          display: flex; align-items: center; justify-content: center; overflow: hidden;
        }
        .nf-logo-box img { width: 26px; height: 26px; object-fit: contain; }
        .nf-brand {
          font-size: 21px; font-weight: 800; color: #dae2fd; letter-spacing: -0.03em;
        }
        .nf-nav { display: none; gap: 30px; }
        @media (min-width: 768px) { .nf-nav { display: flex; } }
        .nf-nav a {
          font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 500;
          color: #908fa0; text-decoration: none; letter-spacing: .04em; transition: color .2s;
        }
        .nf-nav a:hover { color: #c0c1ff; }

        /* ── Main ───────────────────────────────────────────── */
        .nf-main {
          flex: 1; display: flex; align-items: center; justify-content: center;
          padding: 40px 20px; position: relative;
        }
        .nf-glow-a {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(192,193,255,.055) 0%, transparent 65%);
          pointer-events: none;
        }
        .nf-glow-b {
          position: absolute; top: 18%; right: 18%;
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(221,183,255,.045) 0%, transparent 65%);
          pointer-events: none;
        }

        /* ── Side floating cards ────────────────────────────── */
        .nf-side {
          display: none; flex-direction: column; gap: 14px;
          position: absolute; left: 56px; top: 50%; transform: translateY(-50%);
        }
        @media (min-width: 1100px) { .nf-side { display: flex; } }

        .nf-fc {
          background: rgba(23,31,51,.65);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(192,193,255,.12);
          border-radius: 16px; padding: 14px 18px;
          display: flex; align-items: center; gap: 14px; max-width: 234px;
          animation: fcIn .65s ease both;
        }
        .nf-fc:nth-child(1) { transform: rotate(-2deg); animation-delay: .3s; }
        .nf-fc:nth-child(2) { transform: rotate(3deg) translateX(44px); animation-delay: .5s; }
        @keyframes fcIn { from { opacity:0; transform:translateY(18px); } to { opacity:1; } }

        .nf-fc-icon {
          width: 40px; height: 40px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .nf-fc-icon.purple { background: rgba(192,193,255,.14); }
        .nf-fc-icon.teal   { background: rgba(137,206,255,.14); }
        .nf-fc-icon.purple .ms { color: #c0c1ff; font-size: 20px; font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24; }
        .nf-fc-icon.teal   .ms { color: #89ceff; font-size: 20px; font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24; }
        .nf-fc-title { font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:700; color:#dae2fd; margin-bottom:2px; }
        .nf-fc-sub   { font-family:'JetBrains Mono',monospace; font-size:11px; color:#908fa0; }

        /* ── Glass card ─────────────────────────────────────── */
        .nf-card {
          background: rgba(23,31,51,.60);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(192,193,255,.10);
          box-shadow:
            0 40px 80px -20px rgba(0,0,0,.55),
            inset 0 1px 1px rgba(255,255,255,.04);
          border-radius: 28px; padding: 40px;
          width: 100%; max-width: 480px;
          position: relative; z-index: 10;
          transform-style: preserve-3d;
          transition: transform 0.08s linear;
          animation: cardIn .5s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes cardIn { from { opacity:0; transform:translateY(22px); } to { opacity:1; } }

        .nf-ws-label {
          font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700;
          letter-spacing: .14em; text-transform: uppercase; color: #c0c1ff; margin-bottom: 6px;
        }
        .nf-card h1 {
          font-size: 34px; font-weight: 800; color: #dae2fd;
          letter-spacing: -0.03em; margin-bottom: 28px; line-height: 1.1;
        }

        /* ── Form ───────────────────────────────────────────── */
        .nf-form { display: flex; flex-direction: column; gap: 16px; }

        /* ── Floating-label field ───────────────────────────── */
        .nf-field {
          position: relative;
          height: 58px;
        }

        /* The icon */
        .nf-fi {
          position: absolute; left: 15px;
          top: 50%; transform: translateY(-50%);
          color: #5a5870; font-size: 20px;
          pointer-events: none; z-index: 2;
          display: flex; align-items: center;
          transition: color .25s;
        }
        .nf-field:focus-within .nf-fi { color: #c0c1ff; }

        /* The actual <input> — transparent background matches the card */
        .nf-input {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          background: rgba(13,19,38,.75);
          border: 1px solid #3a3850;
          border-radius: 14px;
          color: #dae2fd;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px;
          padding: 22px 48px 8px 48px;
          outline: none;
          transition: border-color .25s, box-shadow .25s, background .25s;
          -webkit-text-fill-color: #dae2fd;
          caret-color: #c0c1ff;
        }
        .nf-input:focus {
          border-color: #c0c1ff;
          background: rgba(20,26,50,.85);
          box-shadow: 0 0 0 3px rgba(192,193,255,.10);
        }
        /* pr variant for show/hide button */
        .nf-input-pr { padding-right: 72px; }

        /* The floating label */
        .nf-label {
          position: absolute;
          left: 48px; top: 50%;
          transform: translateY(-50%);
          font-size: 15px; font-weight: 400;
          color: #5a5870;
          pointer-events: none; z-index: 3;
          transform-origin: left center;
          transition: top .22s cubic-bezier(.4,0,.2,1),
                      transform .22s cubic-bezier(.4,0,.2,1),
                      font-size .22s cubic-bezier(.4,0,.2,1),
                      color .22s;
        }

        /* Lifted state — triggered by :focus OR data-filled */
        .nf-input:focus  ~ .nf-label,
        .nf-input[data-filled="true"] ~ .nf-label {
          top: 30%;
          transform: translateY(-100%) scale(0.78);
          font-size: 15px;
          color: #c0c1ff;
          font-weight: 600;
          letter-spacing: .04em;
        }
        /* When just filled but not focused keep a muted accent */
        .nf-input[data-filled="true"]:not(:focus) ~ .nf-label {
          color: #7b78a8;
        }

        /* Show / Hide button */
        .nf-show-btn {
          position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
          background: transparent; border: none; cursor: pointer; z-index: 4;
          font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700;
          color: #c0c1ff; letter-spacing: .04em;
          padding: 6px 8px; border-radius: 8px;
          transition: background .15s, color .15s;
        }
        .nf-show-btn:hover { background: rgba(192,193,255,.1); color: #fff; }

        /* ── Error banner ──────────────────────────────────── */
        .nf-error {
          background: rgba(255,90,90,.08);
          border: 1px solid rgba(255,90,90,.22);
          border-radius: 14px; padding: 12px 16px;
          font-size: 13px; font-weight: 600; color: #fca5a5;
        }

        /* ── Submit button ─────────────────────────────────── */
        .nf-submit {
          width: 100%; margin-top: 4px;
          background: linear-gradient(135deg, #c0c1ff 0%, #8083ff 45%, #6f00be 100%);
          background-size: 200% 200%; background-position: left center;
          border: none; border-radius: 14px; color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 17px; font-weight: 700;
          padding: 17px 24px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          letter-spacing: -0.01em;
          transition: background-position .45s ease, transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s;
        }
        .nf-submit:hover:not(:disabled) {
          background-position: right center;
          box-shadow: 0 0 28px rgba(128,131,255,.5);
          transform: scale(1.02);
        }
        .nf-submit:active:not(:disabled) { transform: scale(.98); }
        .nf-submit:disabled { opacity: .55; cursor: not-allowed; }
        .nf-submit .ms { font-size: 20px; }

        /* ── Forgot & footer note ──────────────────────────── */
        .nf-forgot { text-align: center; margin-top: 2px; }
        .nf-forgot a {
          font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 500;
          color: #908fa0; text-decoration: none; letter-spacing: .02em; transition: color .2s;
        }
        .nf-forgot a:hover { color: #c0c1ff; }

        .nf-card-foot {
          margin-top: 22px; padding-top: 18px;
          border-top: 1px solid rgba(70,69,84,.35); text-align: center;
        }
        .nf-card-foot p { font-size: 14px; color: #908fa0; line-height: 1.5; }

        /* ── Footer ─────────────────────────────────────────── */
        .nf-footer { background: #060e20; width: 100%; }
        .nf-footer-in {
          display: flex; flex-direction: column; align-items: center; gap: 14px;
          max-width: 1280px; margin: 0 auto; padding: 26px 20px;
        }
        @media (min-width: 768px) {
          .nf-footer-in { flex-direction: row; justify-content: space-between; padding: 26px 64px; }
        }
        .nf-footer-brand {
          font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 700; color: #dae2fd;
        }
        .nf-footer-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 26px; }
        .nf-footer-links a {
          font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 500;
          color: #908fa0; text-decoration: none; letter-spacing: .02em; transition: color .2s;
        }
        .nf-footer-links a:hover { color: #c0c1ff; }
        .nf-footer-copy {
          font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 500;
          color: #89ceff; opacity: .85;
        }
      `}</style>

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