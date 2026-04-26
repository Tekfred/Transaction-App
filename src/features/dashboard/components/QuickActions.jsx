import { Button, Card } from '../../../components/ui/index.js'

export default function QuickActions({ actions }) {
  return (
    <Card className="grid gap-4">
      <div>
        <h3 className="text-xl font-semibold text-slate-900">Quick actions</h3>
        <p className="text-slate-500">Start the most common banking tasks fast.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        {actions.map((action) => (
          <Button
            className="h-auto justify-between rounded-2xl px-4 py-3 text-left"
            key={action.id}
            variant={action.id === 'transfer' ? 'primary' : 'secondary'}
          >
            <span>
              <span className="block">{action.label}</span>
              <span className="block text-xs font-semibold opacity-75">{action.description}</span>
            </span>
          </Button>
        ))}
      </div>
    </Card>
  )
}
