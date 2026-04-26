import { Button, Card, FormControl } from '../../../components/ui/index.js'
import { formatCurrency } from '../../../utils/formatters.js'

export default function TransferFormShell({
  accounts,
  draft,
  isReviewOpen,
  onCloseReview,
  onOpenReview,
  onReset,
  onUpdateDraft,
}) {
  const selectedFromAccount = accounts.find((account) => account.id === draft.fromAccountId)
  const selectedToAccount = accounts.find((account) => account.id === draft.toAccountId)

  return (
    <Card className="grid gap-5 bg-slate-950 text-white">
      <div>
        <p className="text-sm font-semibold text-slate-300">New transfer</p>
        <h3 className="mt-1 text-2xl font-bold">Move money</h3>
      </div>

      <div className="grid gap-3">
        <label className="grid gap-2 rounded-2xl bg-white/10 p-4">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-300">From</span>
          <FormControl
            as="select"
            onChange={(event) => onUpdateDraft('fromAccountId', event.target.value)}
            value={draft.fromAccountId}
          >
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </FormControl>
        </label>
        <label className="grid gap-2 rounded-2xl bg-white/10 p-4">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-300">To</span>
          <FormControl
            as="select"
            onChange={(event) => onUpdateDraft('toAccountId', event.target.value)}
            value={draft.toAccountId}
          >
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </FormControl>
        </label>
        <label className="grid gap-2 rounded-2xl bg-white/10 p-4">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Amount</span>
          <FormControl
            className="text-2xl font-bold sm:text-3xl"
            min="1"
            onChange={(event) => onUpdateDraft('amount', Number(event.target.value))}
            type="number"
            value={draft.amount}
          />
        </label>
      </div>

      <div className="grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2 lg:grid-cols-1">
        <label className="grid gap-2">
          <span className="text-sm text-slate-300">Frequency</span>
          <FormControl
            as="select"
            onChange={(event) => onUpdateDraft('frequency', event.target.value)}
            value={draft.frequency}
          >
            <option>One-time</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </FormControl>
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-slate-300">Memo</span>
          <FormControl
            onChange={(event) => onUpdateDraft('memo', event.target.value)}
            type="text"
            value={draft.memo}
          />
        </label>
      </div>

      {isReviewOpen ? (
        <div className="grid gap-3 rounded-2xl bg-white/10 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-300">
            Review transfer
          </p>
          <p className="font-semibold">
            {formatCurrency(draft.amount, draft.currency)} from {selectedFromAccount?.name} to{' '}
            {selectedToAccount?.name}
          </p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            <Button className="w-full" variant="secondary">
              Confirm Transfer
            </Button>
            <Button className="w-full" onClick={onCloseReview} variant="secondary">
              Keep Editing
            </Button>
          </div>
        </div>
      ) : null}

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        <Button className="w-full" onClick={onOpenReview} variant="secondary">
          Review Transfer
        </Button>
        <Button className="w-full" onClick={onReset} variant="secondary">
          Reset Draft
        </Button>
      </div>
    </Card>
  )
}
