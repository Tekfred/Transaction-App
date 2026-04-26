import { cn } from '../../utils/cn.js'

const variants = {
  active: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15',
  pending: 'bg-amber-50 text-amber-700 ring-amber-600/15',
  posted: 'bg-slate-100 text-slate-700 ring-slate-600/10',
  scheduled: 'bg-blue-50 text-blue-700 ring-blue-600/15',
}

export default function Badge({ children, className, variant = 'posted' }) {
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-bold capitalize ring-1 ring-inset',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
