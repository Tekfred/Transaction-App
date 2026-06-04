import { Badge, Button, Card, FormControl } from '../../../components/ui/index.js'
import { formatCurrency } from '../../../utils/formatters.js'
import { lightFormControlClass } from './formStyles.js'
import SourceAccountSelector from './SourceAccountSelector.jsx'

export default function BillPaymentConfirmCard({
  accounts,
  draft,
  inquiry,
  isSubmitting,
  onPay,
  onReset,
  onUpdateDraft,
}) {
  if (!inquiry) {
    return (
      <Card className="grid gap-2 bg-slate-50" padded="md">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Step 3</p>
        <h3 className="text-xl font-semibold text-slate-900">Confirm payment</h3>
        <p className="text-sm text-slate-600">Bill details appear here after inquiry.</p>
      </Card>
    )
  }

  const amountLocked = inquiry.amountDue !== null
  const amount = Number(draft.amount)
  const canPay =
    accounts.length > 0 && Number.isFinite(amount) && amount > 0 && draft.sourceAccountId

  return (
    <Card className="grid gap-4" padded="md">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Step 3</p>
        <h3 className="text-xl font-semibold text-slate-900">Confirm payment</h3>
      </div>

      <div className="grid gap-3 rounded-2xl bg-slate-50 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold text-slate-950">{inquiry.billerName}</p>
          <Badge variant="pending">Ready</Badge>
        </div>
        <p className="text-sm text-slate-500">
          {inquiry.referenceLabel}: {inquiry.customerReference}
        </p>
        <p className="text-sm text-slate-500">Customer: {inquiry.customerName}</p>
      </div>

      <SourceAccountSelector
        accounts={accounts}
        disabled={isSubmitting}
        onSelectAccount={(accountId) => onUpdateDraft('sourceAccountId', accountId)}
        selectedAccountId={draft.sourceAccountId}
      />

      <label className="grid gap-2">
        <span className="text-sm font-semibold text-slate-700">Amount</span>
        <FormControl
          className={`${lightFormControlClass} text-2xl font-bold`}
          disabled={amountLocked || isSubmitting}
          min="1"
          onChange={(event) => onUpdateDraft('amount', Number(event.target.value))}
          type="number"
          value={draft.amount}
        />
        {amountLocked ? (
          <span className="text-xs font-semibold text-slate-500">
            Fixed amount from bill inquiry: {formatCurrency(inquiry.amountDue)}
          </span>
        ) : null}
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-semibold text-slate-700">Narration</span>
        <FormControl
          autoComplete="off"
          className={lightFormControlClass}
          disabled={isSubmitting}
          onChange={(event) => onUpdateDraft('narration', event.target.value)}
          type="text"
          value={draft.narration}
        />
      </label>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button className="w-full sm:w-fit" disabled={!canPay || isSubmitting} onClick={onPay}>
          {isSubmitting ? 'Processing...' : 'Pay Bill'}
        </Button>
        <Button
          className="w-full sm:w-fit"
          disabled={isSubmitting}
          onClick={onReset}
          variant="secondary"
        >
          Reset
        </Button>
      </div>
    </Card>
  )
}
