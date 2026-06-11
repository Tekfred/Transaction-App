import { useState, useEffect, useRef } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAppState } from '../app/AppProvider.jsx'
import logo from '../assets/logo.svg'
import {
  Lock,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  Fingerprint,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  CheckCircle,
  Smartphone,
  User,
  Building,
  Clock,
  RefreshCw,
  PiggyBank,
  ArrowLeft,
} from 'lucide-react'

/**
 * Nexora Finance — Login Page (New UI + Original Auth Wiring)
 *
 * Auth logic is 100% untouched from the original Login.jsx:
 *   - useAppState() → { login, state }
 *   - state.isAuthenticated  → redirect guard
 *   - state.authError        → error banner
 *   - state.isAuthLoading    → disables submit
 *   - login(form)            → called on sign-in submit
 *
 * The new multi-view UI (sign-up, forgot, OTP, biometric) is purely
 * presentational and does NOT call any backend — those flows still need
 * their own API wiring when you're ready.
 */
export default function Login() {
  // ── Original auth wiring ────────────────────────────────────────
  const { login, state } = useAppState()
  const location = useLocation()
  const navigate = useNavigate()
  const redirectTo = location.state?.from?.pathname || '/'

  if (state.isAuthenticated) {
    return <Navigate replace to={redirectTo} />
  }

  // ── Sign-in form state ──────────────────────────────────────────
  const [form, setForm] = useState({ email: '', password: '' })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  // The real submit handler — identical to the original
  async function handleSubmit(event) {
    event.preventDefault()
    try {
      await login(form)
      navigate(redirectTo, { replace: true })
    } catch {
      // Error text is rendered from state.authError
    }
  }

  // ── UI view state (sign-in | sign-up | forgot | otp | biometric) ─
  const [view, setView] = useState('signin')

  // Sign-up form
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupAccountType, setSignupAccountType] = useState('checking')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  // Forgot / OTP
  const [forgotEmail, setForgotEmail] = useState('')
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', ''])
  const [timerCount, setTimerCount] = useState(45)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const otpRefs = useRef([])

  // Biometric
  const [biometricScanning, setBiometricScanning] = useState(false)
  const [biometricProgress, setBiometricProgress] = useState(0)
  const [biometricSuccess, setBiometricSuccess] = useState(false)

  // Remember me (UI-only)
  const [rememberMe, setRememberMe] = useState(true)

  // ── Password strength ───────────────────────────────────────────
  useEffect(() => {
    let score = 0
    if (signupPassword.length >= 6) score += 1
    if (signupPassword.length >= 10) score += 1
    if (/[A-Z]/.test(signupPassword)) score += 1
    if (/[^A-Za-z0-9]/.test(signupPassword)) score += 1
    setPasswordStrength(score)
  }, [signupPassword])

  // ── OTP resend timer ────────────────────────────────────────────
  useEffect(() => {
    let interval = null
    if (isTimerRunning && timerCount > 0) {
      interval = setInterval(() => setTimerCount((p) => p - 1), 1000)
    } else if (timerCount === 0) {
      setIsTimerRunning(false)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timerCount])

  // ── Biometric animation ─────────────────────────────────────────
  useEffect(() => {
    let interval = null
    if (biometricScanning) {
      interval = setInterval(() => {
        setBiometricProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setBiometricSuccess(true)
            // Biometric "login" — wire to real auth when ready
            setTimeout(() => {
              setBiometricScanning(false)
            }, 800)
            return 100
          }
          return prev + 4
        })
      }, 50)
    } else {
      setBiometricProgress(0)
      setBiometricSuccess(false)
    }
    return () => clearInterval(interval)
  }, [biometricScanning])

  // ── OTP helpers ─────────────────────────────────────────────────
  const handleOtpChange = (index, value) => {
    if (isNaN(Number(value)) && value !== '') return
    const next = [...otpDigits]
    next[index] = value
    setOtpDigits(next)
    if (value !== '' && index < 5) otpRefs.current[index + 1]?.focus()
  }
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otpDigits[index] === '' && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  // ── Render ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col justify-center items-center py-6 px-4 md:px-10 relative select-none">

      {/* Decorative blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-linear-to-br from-[#4648d4]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-linear-to-tr from-[#6063ee]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl bg-white border border-slate-200/60 rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-155 relative z-10">

        {/* ── LEFT: branding panel ────────────────────────────── */}
        <div className="lg:col-span-5 bg-[#0b1c30] text-white p-8 md:p-12 relative flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-linear-to-br from-[#4648d4]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-linear-to-tr from-teal-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* Logo + heading */}
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-linear-to-br from-[#4648d4] to-[#6063ee] rounded-2xl shadow-lg ring-4 ring-indigo-500/15">
                <img src={logo} alt="Nexora Finance" className="w-5 h-5 object-contain" />
              </div>
              <span className="text-2xl font-extrabold tracking-tighter uppercase text-white">
                Nexora Finance
              </span>
            </div>

            <div className="pt-8 space-y-2">
              <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                Secure Wealth Engine.
              </h1>
              <p className="text-xs text-white/50 leading-relaxed max-w-sm">
                Redefining multi-asset compounding protocols, real-time sandboxed routing,
                and personal resource reserves.
              </p>
            </div>
          </div>

          {/* Feature cards */}
          <div className="space-y-6 pt-10 pb-6 relative z-10">
            <div className="flex gap-3 bg-white/5 border border-white/5 p-4 rounded-2xl items-start shadow-inner">
              <ShieldCheck size={18} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Insured Vault Security</h5>
                <p className="text-[10px] text-white/60 leading-relaxed mt-0.5">
                  SIPC secured sandboxed asset routing channels up to $250,000 standard.
                </p>
              </div>
            </div>
            <div className="flex gap-3 bg-white/5 border border-white/5 p-4 rounded-2xl items-start shadow-inner">
              <TrendingUp size={18} className="text-[#6063ee] shrink-0 mt-0.5" />
              <div>
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#9b9eff]">4.50% Compound APY</h5>
                <p className="text-[10px] text-white/60 leading-relaxed mt-0.5">
                  Accelerate savings reserves overnight through daily accrual index algorithms.
                </p>
              </div>
            </div>
          </div>

          {/* Footer stats */}
          <div className="pt-6 border-t border-white/5 flex justify-between items-center relative z-10 text-[10px] text-white/45 uppercase tracking-wider font-mono">
            <span>Server: Active</span>
            <span>Est. latency: 12ms</span>
          </div>
        </div>

        {/* ── RIGHT: form panel ───────────────────────────────── */}
        <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-white">

          {/* ── SIGN IN VIEW ─────────────────────────────────── */}
          {view === 'signin' && (
            <div className="space-y-6">
              <div className="space-y-1.5">
                <h2 className="text-2xl font-extrabold text-[#0b1c30] tracking-tight">Access Nexora Space</h2>
                <p className="text-xs text-[#565e74]">Enter your credentials to access your account.</p>
              </div>

              {/* ── Real auth form ── */}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-[#0b1c30] uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm((cur) => ({ ...cur, email: e.target.value }))}
                      autoComplete="email"
                      className="w-full text-xs pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4648d4] bg-white text-[#0b1c30]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-[#0b1c30] uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <KeyRound size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={isPasswordVisible ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={form.password}
                      onChange={(e) => setForm((cur) => ({ ...cur, password: e.target.value }))}
                      autoComplete="current-password"
                      className="w-full text-xs pl-10 pr-10 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4648d4] bg-white text-[#0b1c30]"
                    />
                    <button
                      type="button"
                      onClick={() => setIsPasswordVisible((cur) => !cur)}
                      aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0b1c30]"
                    >
                      {isPasswordVisible ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => setView('forgot')}
                      className="text-[11px] font-semibold text-[#4648d4] hover:text-[#3739b3] hover:underline transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center text-xs text-[#565e74]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-slate-200 text-[#4648d4] focus:ring-0"
                      checked={rememberMe}
                      onChange={() => setRememberMe((c) => !c)}
                    />
                    <span>Keep me signed in</span>
                  </label>
                </div>

                {/* Auth error — from real state.authError */}
                {state.authError && (
                  <div
                    role="alert"
                    className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold px-4 py-3 rounded-xl"
                  >
                    <span className="shrink-0">⚠</span>
                    {state.authError}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={state.isAuthLoading}
                  className="w-full bg-[#0b1c30] hover:bg-[#4648d4] text-white font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {state.isAuthLoading ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>

              {/* Biometric divider */}
              <div className="flex flex-col gap-3">
                <div className="relative flex py-1 items-center">
                  <div className="grow border-t border-slate-150" />
                  <span className="shrink mx-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    Or use biometrics
                  </span>
                  <div className="grow border-t border-slate-150" />
                </div>
                <button
                  type="button"
                  onClick={() => setView('biometric')}
                  className="border border-slate-200 hover:border-[#4648d4] hover:bg-slate-50 rounded-2xl py-3 text-xs font-bold text-[#0b1c30] flex items-center justify-center gap-2.5 transition-all"
                >
                  <Fingerprint size={16} className="text-[#0b1c30]" />
                  Use Touch ID
                </button>
              </div>

              <p className="text-center text-xs text-[#565e74]">
                Don't have an account?{' '}
                <button
                  onClick={() => setView('signup')}
                  className="font-bold text-[#4648d4] hover:underline"
                >
                  Create one
                </button>
              </p>
            </div>
          )}

          {/* ── SIGN UP VIEW ─────────────────────────────────── */}
          {view === 'signup' && (
            <div className="space-y-6">
              <button
                onClick={() => setView('signin')}
                className="inline-flex items-center gap-1 text-xs text-[#565e74] hover:text-[#0b1c30] font-semibold"
              >
                <ArrowLeft size={13} /> Return to Login
              </button>

              <div className="space-y-1">
                <h2 className="text-2xl font-extrabold text-[#0b1c30] tracking-tight">Create New Account</h2>
                <p className="text-xs text-[#565e74]">Fill in your details to get started.</p>
              </div>

              {/* NOTE: Sign-up form is UI-only. Wire onSubmit to your register API when ready. */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  // TODO: call your register endpoint here
                }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-[#0b1c30] uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Godfred Hart"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="w-full text-xs pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4648d4] bg-white text-[#0b1c30]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-[#0b1c30] uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="w-full text-xs pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4648d4] bg-white text-[#0b1c30]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-[#0b1c30] uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <KeyRound size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="Min 6 characters"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="w-full text-xs pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4648d4] bg-white text-[#0b1c30]"
                    />
                  </div>
                  {signupPassword.length > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[9px] font-semibold text-slate-400 uppercase tracking-widest">
                        <span>Password strength</span>
                        <span className={
                          passwordStrength === 4 ? 'text-teal-500' :
                          passwordStrength >= 2 ? 'text-amber-500' : 'text-rose-500'
                        }>
                          {passwordStrength === 4 ? 'Strong' : passwordStrength >= 2 ? 'Medium' : 'Weak'}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[1, 2, 3, 4].map((step) => (
                          <div
                            key={step}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              step <= passwordStrength
                                ? passwordStrength === 4 ? 'bg-teal-500' : 'bg-amber-500'
                                : 'bg-slate-100'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-[#0b1c30] uppercase tracking-wider">Account Type</label>
                  <div className="grid grid-cols-2 gap-3.5">
                    {[
                      { id: 'checking', icon: <Smartphone size={13} />, label: 'Checking', sub: 'Active debit ledger' },
                      { id: 'savings',  icon: <PiggyBank size={13} />,  label: 'Savings',  sub: '4.50% high-yield APY' },
                    ].map(({ id, icon, label, sub }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setSignupAccountType(id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          signupAccountType === id
                            ? 'border-[#4648d4] bg-[#eff4ff]/40 text-[#4648d4] font-bold'
                            : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <h4 className="text-xs font-bold flex items-center gap-1.5">{icon} {label}</h4>
                        <p className="text-[9px] text-[#565e74] mt-0.5 font-normal">{sub}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#565e74] pt-1 leading-relaxed">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={() => setAgreeTerms((c) => !c)}
                    className="rounded border-slate-200 text-[#4648d4] mt-0.5 focus:ring-0"
                  />
                  <span>I agree to the Terms of Service and Privacy Policy.</span>
                </label>

                <button
                  type="submit"
                  className="w-full bg-[#0b1c30] hover:bg-[#4648d4] text-white font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                >
                  Create Account <ArrowRight size={14} />
                </button>
              </form>
            </div>
          )}

          {/* ── FORGOT PASSWORD VIEW ─────────────────────────── */}
          {view === 'forgot' && (
            <div className="space-y-6">
              <button
                onClick={() => setView('signin')}
                className="inline-flex items-center gap-1 text-xs text-[#565e74] hover:text-[#0b1c30] font-semibold"
              >
                <ArrowLeft size={13} /> Return to Login
              </button>

              <div className="space-y-1.5">
                <h2 className="text-2xl font-extrabold text-[#0b1c30] tracking-tight">Recover Access</h2>
                <p className="text-xs text-[#565e74]">We'll send a 6-digit OTP to your registered email.</p>
              </div>

              {/* NOTE: Wire onSubmit to your password-reset API when ready. */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  // TODO: call your forgot-password endpoint here
                  setView('otp')
                  setTimerCount(45)
                  setIsTimerRunning(true)
                }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-[#0b1c30] uppercase tracking-wider">
                    Registered Email
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full text-xs pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4648d4] bg-white text-[#0b1c30]"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0b1c30] hover:bg-[#4648d4] text-white font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  Send OTP <ArrowRight size={14} />
                </button>
              </form>
            </div>
          )}

          {/* ── OTP VIEW ─────────────────────────────────────── */}
          {view === 'otp' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-[#0b1c30] tracking-tight">Enter OTP</h2>
                <p className="text-xs text-[#565e74] leading-relaxed">
                  Check your email for the 6-digit code and enter it below.
                </p>
              </div>

              {/* NOTE: Wire onSubmit to your OTP-verify endpoint when ready. */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  // TODO: call your OTP verification endpoint here
                }}
                className="space-y-5"
              >
                <div className="grid grid-cols-6 gap-2 pt-2">
                  {otpDigits.map((digit, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      ref={(el) => (otpRefs.current[i] = el)}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="h-12 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4648d4] text-center font-extrabold text-lg bg-slate-50 focus:bg-white text-[#0b1c30]"
                    />
                  ))}
                </div>

                <div className="flex justify-between items-center text-xs pt-1">
                  {timerCount > 0 ? (
                    <span className="text-slate-400 font-semibold flex items-center gap-1">
                      <Clock size={12} />
                      Resend in <b className="text-[#0b1c30] ml-1">{timerCount}s</b>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => { setTimerCount(45); setIsTimerRunning(true) }}
                      className="font-bold text-[#4648d4] hover:underline"
                    >
                      Resend code
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setView('forgot')}
                    className="text-slate-400 hover:text-[#0b1c30] font-semibold"
                  >
                    Change Email
                  </button>
                </div>

                <div className="flex gap-3.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setView('signin')}
                    className="flex-1 border border-slate-200 hover:bg-slate-50 text-[#565e74] rounded-xl font-bold text-xs py-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#0b1c30] hover:bg-[#4648d4] text-white rounded-xl font-bold text-xs py-3 shadow-md active:scale-95 transition-all"
                  >
                    Verify
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ── BIOMETRIC VIEW ────────────────────────────────── */}
          {view === 'biometric' && (
            <div className="space-y-6 text-center">
              <button
                onClick={() => setView('signin')}
                className="inline-flex items-center gap-1 text-xs text-[#565e74] hover:text-[#0b1c30] font-semibold"
              >
                <ArrowLeft size={13} /> Return to Login
              </button>

              <div className="space-y-1.5">
                <h2 className="text-2xl font-extrabold text-[#0b1c30] tracking-tight">Biometric Sign In</h2>
                <p className="text-xs text-[#565e74] max-w-sm mx-auto">
                  Tap the fingerprint icon to authenticate with Touch ID.
                </p>
              </div>

              <div className="py-6 flex flex-col items-center justify-center space-y-4">
                <button
                  type="button"
                  onClick={() => { if (!biometricScanning) setBiometricScanning(true) }}
                  className={`w-28 h-28 rounded-full border flex items-center justify-center relative overflow-hidden transition-all shadow-md group ${
                    biometricScanning
                      ? 'border-[#4648d4] bg-indigo-50/50'
                      : biometricSuccess
                      ? 'border-emerald-500 bg-emerald-50/50'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 active:scale-95'
                  }`}
                >
                  {biometricScanning && (
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle
                        cx="56" cy="56" r="52"
                        className="stroke-[#4648d4] fill-none stroke-4"
                        strokeDasharray="327"
                        strokeDashoffset={327 - (327 * biometricProgress) / 100}
                      />
                    </svg>
                  )}
                  {biometricSuccess ? (
                    <CheckCircle className="w-14 h-14 text-emerald-500" />
                  ) : (
                    <Fingerprint className={`w-14 h-14 transition-colors ${
                      biometricScanning ? 'text-[#4648d4] animate-pulse' : 'text-[#0b1c30] group-hover:text-[#4648d4]'
                    }`} />
                  )}
                </button>

                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {biometricScanning
                    ? `Scanning… ${biometricProgress}%`
                    : biometricSuccess
                    ? 'Scan complete!'
                    : 'Click to scan fingerprint'}
                </p>
              </div>

              <div className="p-3.5 bg-[#eff4ff]/60 border border-[#e1e0ff] rounded-2xl text-[10px] text-left text-indigo-700 leading-relaxed flex items-start gap-2.5">
                <ShieldCheck size={14} className="shrink-0 mt-0.5" />
                <span>
                  Biometric authentication uses FIDO2 and never stores your fingerprint data on our servers.
                </span>
              </div>
            </div>
          )}

        </div>{/* end right panel */}
      </div>
    </div>
  )
}