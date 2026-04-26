import Card from './Card.jsx'

export default function PageHeader({ action, eyebrow, subtitle, title }) {
  return (
    <Card as="header" className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? (
          <p className="mb-1.5 text-[0.78rem] font-bold uppercase tracking-widest text-slate-500">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="m-0 text-3xl font-bold text-slate-900">{title}</h2>
        {subtitle ? <p className="text-slate-500">{subtitle}</p> : null}
      </div>
      {action ? <div className="grid shrink-0 sm:block">{action}</div> : null}
    </Card>
  )
}
