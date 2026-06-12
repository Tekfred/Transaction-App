import { useNavigate } from 'react-router-dom'
import { ArrowRightLeft, Landmark, Receipt, ChevronRight } from 'lucide-react'

/**
 * QuickActions
 *
 * Props (unchanged from original):
 *   actions: Array<{ id, label, description }>
 *
 * Navigation logic preserved exactly from original — uses useNavigate()
 * to route to /transfers, /deposits, /payments. No modals/popups.
 */
export default function QuickActions({ actions }) {
  const navigate = useNavigate()

  const handleActionClick = (actionId) => {
    let path = '/'
    switch (actionId) {
      case 'transfer':
        path = '/transfers'
        break
      case 'deposit':
        path = '/deposits'
        break
      case 'pay-bill':
        path = '/payments'
        break
      default:
        path = '/'
    }
    navigate(path, { replace: false })
  }

  const iconMap = {
    transfer: ArrowRightLeft,
    deposit: Landmark,
    'pay-bill': Receipt,
  }

  return (
    <div className="bg-white border border-slate-200/50 p-6 rounded-[32px] shadow-xs space-y-5 text-left">
      <div>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#565e74] block mb-1">
          Quick Actions
        </span>
        <h3 className="text-xl font-extrabold text-[#0b1c30] tracking-tight">What do you need?</h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
        {actions.map((action, index) => {
          const Icon = iconMap[action.id] ?? ChevronRight
          const isPrimary = index === 0

          return (
            <button
              key={action.id}
              type="button"
              onClick={() => handleActionClick(action.id)}
              className={`
                group flex items-center justify-between gap-3 w-full
                px-4 py-3.5 rounded-2xl text-left
                transition-all active:scale-[0.98]
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4648d4]
                ${
                  isPrimary
                    ? 'bg-[#0b1c30] hover:bg-[#4648d4] text-white shadow-md'
                    : 'bg-[#f8f9ff] hover:bg-[#eff4ff] text-[#0b1c30] border border-slate-100'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                  w-8 h-8 rounded-xl flex items-center justify-center shrink-0
                  ${
                    isPrimary
                      ? 'bg-white/10 text-white'
                      : 'bg-white text-[#4648d4] border border-slate-100'
                  }
                `}
                >
                  <Icon size={15} />
                </div>
                <div>
                  <span
                    className={`block text-sm font-bold ${isPrimary ? 'text-white' : 'text-[#0b1c30]'}`}
                  >
                    {action.label}
                  </span>
                  <span
                    className={`block text-[11px] font-semibold ${isPrimary ? 'text-white/60' : 'text-slate-400'}`}
                  >
                    {action.description}
                  </span>
                </div>
              </div>
              <ChevronRight
                size={15}
                className={`shrink-0 transition-transform group-hover:translate-x-0.5 ${isPrimary ? 'text-white/50' : 'text-slate-300'}`}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
