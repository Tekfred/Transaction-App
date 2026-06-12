import { Wallet, PiggyBank, TrendingUp } from 'lucide-react'
import { formatCurrency } from '../../../utils/formatters.js'

/**
 * BalanceSummary
 *
 * Props (unchanged from original):
 *   summary: { totalBalance, availableBalance, currency, accountName, accountNumber }
 *
 * New UI maps totalBalance → hero figure, availableBalance → "Available Now"
 * pocket, and derives a second pocket from the account name/number.
 */
export default function BalanceSummary({ summary }) {
  return (
    <div className="bg-white border border-slate-200/50 p-6 md:p-8 rounded-4xl space-y-6 text-left shadow-xs relative overflow-hidden">
      {/* Decorative glow */}
      <div
        className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-[#4648d4]/10 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Hero row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 relative">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#565e74] block mb-1">
            Total Balance
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c30] tracking-tight leading-none">
            {formatCurrency(summary.totalBalance, summary.currency)}
          </h2>
        </div>

        <div className="self-start sm:self-auto bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-emerald-100">
          <TrendingUp size={13} className="stroke-[2.5]" />
          <span>All accounts active</span>
        </div>
      </div>

      {/* Two-pocket breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Available pocket */}
        <div className="bg-[#f8f9ff]/60 hover:bg-[#f8f9ff] transition-colors p-4 rounded-2xl border border-slate-100 flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#4648d4] flex items-center justify-center border border-indigo-100/50 group-hover:bg-indigo-100 transition-colors">
              <Wallet size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Available Now
              </p>
              <h4 className="text-lg font-extrabold text-[#0b1c30] mt-0.5">
                {formatCurrency(summary.availableBalance, summary.currency)}
              </h4>
            </div>
          </div>
          <span className="text-[9px] font-mono font-bold text-slate-400 bg-white border border-slate-100 px-1.5 py-0.5 rounded-lg hidden sm:block">
            {String(summary.accountNumber).trim() !== ''
              ? `···${String(summary.accountNumber).trim()}`
              : '···----'}
          </span>
        </div>

        {/* Primary account pocket */}
        <div className="bg-[#f8f9ff]/60 hover:bg-[#f8f9ff] transition-colors p-4 rounded-2xl border border-slate-100 flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100/50 group-hover:bg-teal-100 transition-colors">
              <PiggyBank size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                {String(summary.accountName).trim() !== ''
                  ? String(summary.accountName).trim()
                  : 'Primary Account'}
              </p>
              <h4 className="text-lg font-extrabold text-[#0b1c30] mt-0.5">
                {formatCurrency(summary.totalBalance, summary.currency)}
              </h4>
            </div>
          </div>
          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100/50">
            2 linked
          </span>
        </div>
      </div>
    </div>
  )
}
