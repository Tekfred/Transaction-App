import { cn } from '../../utils/cn.js'

export default function PageSection({ children, className }) {
  return <section className={cn('grid gap-4', className)}>{children}</section>
}
