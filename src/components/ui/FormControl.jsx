import { cn } from '../../utils/cn.js'

export default function FormControl({ as: Component = 'input', className, ...props }) {
  return (
    <Component
      className={cn(
        'min-h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-white/40 focus:ring-2 focus:ring-white/10',
        className,
      )}
      {...props}
    />
  )
}
