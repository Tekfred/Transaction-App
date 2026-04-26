import Card from './Card.jsx'

export default function StatCard({ description, label, value }) {
  return (
    <Card>
      <span className="text-slate-500">{label}</span>
      <strong className="my-2 block text-[1.8rem] text-slate-900">{value}</strong>
      {description ? <p className="text-slate-500">{description}</p> : null}
    </Card>
  )
}
