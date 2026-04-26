export default function MyAccounts() {
  return (
    <section className="grid gap-4">
      <h2 className="text-3xl font-bold text-slate-900">My Accounts</h2>
      <div className="grid gap-4">
        <article className="flex flex-col justify-between gap-4 rounded-[22px] border border-slate-900/8 bg-white/90 px-5 py-5 shadow-[0_18px_44px_rgba(31,53,88,0.08)] sm:flex-row">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Checking Account</h3>
            <p className="text-slate-500">Main daily spending account</p>
          </div>
          <strong className="text-xl font-semibold text-slate-900">$8,245.00</strong>
        </article>
        <article className="flex flex-col justify-between gap-4 rounded-[22px] border border-slate-900/8 bg-white/90 px-5 py-5 shadow-[0_18px_44px_rgba(31,53,88,0.08)] sm:flex-row">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Savings Account</h3>
            <p className="text-slate-500">Emergency fund and short-term goals</p>
          </div>
          <strong className="text-xl font-semibold text-slate-900">$16,335.40</strong>
        </article>
      </div>
    </section>
  )
}
