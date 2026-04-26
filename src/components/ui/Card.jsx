import { cn } from '../../utils/cn.js'

const padding = {
  md: 'p-5',
  lg: 'p-6',
}

const radius = {
  md: 'rounded-[22px]',
  lg: 'rounded-3xl',
}

export default function Card({ as: Component = 'article', children, className, padded = 'lg' }) {
  return (
    <Component
      className={cn(
        'border border-slate-900/8 bg-white/90 shadow-[0_18px_44px_rgba(31,53,88,0.08)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(31,53,88,0.11)]',
        radius[padded === 'lg' ? 'lg' : 'md'],
        padding[padded],
        className,
      )}
    >
      {children}
    </Component>
  )
}
