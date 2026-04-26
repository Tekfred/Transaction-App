export default function Dashboard() {
  return (
    <section className="grid gap-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-900/8 bg-white/90 p-6 shadow-[0_18px_44px_rgba(31,53,88,0.08)] md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-1.5 text-[0.78rem] font-bold uppercase tracking-widest text-slate-500">
            Overview
          </p>
          <h2 className="m-0 text-3xl font-bold text-slate-900">Dashboard</h2>
          <p className="text-slate-500">
            Track your balances, recent activity, and quick actions from one place.
          </p>
        </div>
        <button
          type="button"
          className="rounded-full bg-[--color-primary] px-5 py-3.5 font-bold text-white"
        >
          New Transfer
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-3xl border border-slate-900/8 bg-white/90 p-6 shadow-[0_18px_44px_rgba(31,53,88,0.08)]">
          <span className="text-slate-500">Total Balance</span>
          <strong className="my-2 block text-[1.8rem] text-slate-900">$24,580.40</strong>
          <p className="text-slate-500">Across your linked checking and savings accounts.</p>
        </article>
        <article className="rounded-3xl border border-slate-900/8 bg-white/90 p-6 shadow-[0_18px_44px_rgba(31,53,88,0.08)]">
          <span className="text-slate-500">Monthly Spending</span>
          <strong className="my-2 block text-[1.8rem] text-slate-900">$3,240.18</strong>
          <p className="text-slate-500">Down 8% compared with last month.</p>
        </article>
        <article className="rounded-3xl border border-slate-900/8 bg-white/90 p-6 shadow-[0_18px_44px_rgba(31,53,88,0.08)]">
          <span className="text-slate-500">Pending Payments</span>
          <strong className="my-2 block text-[1.8rem] text-slate-900">4</strong>
          <p className="text-slate-500">Two card payments and two scheduled transfers.</p>
        </article>
      </div>
    </section>
  )
}
