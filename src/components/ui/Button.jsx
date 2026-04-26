import { cn } from '../../utils/cn.js'

const variants = {
  primary: 'bg-[--color-primary] text-white hover:bg-[--color-primary-strong]',
  secondary:
    'border border-slate-900/8 bg-white text-slate-800 shadow-[0_10px_24px_rgba(32,54,86,0.06)] hover:bg-slate-50',
}

const sizes = {
  md: 'px-5 py-3 text-sm',
  lg: 'px-5 py-3.5 text-base',
}

export default function Button({
  children,
  className,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex min-h-11 items-center justify-center rounded-full font-bold transition duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        sizes[size],
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
