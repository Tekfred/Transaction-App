export default function Transfers() {
  return (
    <section className="grid gap-4">
      <h2 className="text-3xl font-bold text-slate-900">Transfers</h2>
      <div className="grid gap-1.5 rounded-[22px] border border-slate-900/8 bg-white/90 p-6 shadow-[0_18px_44px_rgba(31,53,88,0.08)]">
        <p className="text-slate-500">Internal Transfer</p>
        <strong className="text-xl font-semibold text-slate-900">$500.00</strong>
        <span className="text-slate-500">
          Move money between your checking and savings accounts.
        </span>
      </div>
    </section>
  )
}
