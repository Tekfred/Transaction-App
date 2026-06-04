import { Button, Card, FormControl } from '../../../components/ui/index.js'
import { formatCurrency } from '../../../utils/formatters.js'

export default function TransferFormShell({
  accounts,
  draft,
  error,
  isReviewOpen,
  isSubmitting,
  onCloseReview,
  onOpenReview,
  onReset,
  onSubmit,
  onUpdateDraft,
  receipt,
}) {
  const selectedFromAccount = accounts.find((account) => account.id === draft.fromAccountId)
  const receiverAccountNumber = String(draft.receiverAccountNumber ?? '').trim()
  const isSameSenderAccount =
    Boolean(receiverAccountNumber) && selectedFromAccount?.accountNumber === receiverAccountNumber
  const canReview = Boolean(
    selectedFromAccount &&
    receiverAccountNumber &&
    !isSameSenderAccount &&
    Number.isFinite(draft.amount) &&
    draft.amount > 0,
  )

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
                {account.name} · {account.accountNumber}
              </option>
            ))}
          </FormControl>
        </label>
        <label className="grid gap-2 rounded-2xl bg-white/10 p-4">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-300">To</span>
          <FormControl
            inputMode="numeric"
            onChange={(event) => onUpdateDraft('receiverAccountNumber', event.target.value)}
            placeholder="Enter receiver account number"
            type="text"
            value={draft.receiverAccountNumber}
          />
          <span className="text-xs font-semibold text-slate-400">
            Send to any active account by entering the recipient account number.
          </span>
          {isSameSenderAccount ? (
            <span className="text-xs font-bold text-rose-200">
              Enter a different receiver account number.
            </span>
          ) : null}
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
            account {receiverAccountNumber}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row xl:flex-col">
            <Button
              className="w-full sm:w-fit xl:w-full"
              disabled={isSubmitting || !canReview}
              onClick={onSubmit}
              variant="secondary"
            >
              {isSubmitting ? 'Sending...' : 'Confirm Transfer'}
            </Button>
            <Button
              className="w-full sm:w-fit xl:w-full"
              disabled={isSubmitting}
              onClick={onCloseReview}
              variant="secondary"
            >
              Keep Editing
            </Button>
          </div>
        </div>
      ) : null}

      {error ? (
        <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
          {error}
        </p>
      ) : null}

      {receipt ? (
        <div className="grid gap-2 rounded-2xl bg-emerald-50 p-4 text-emerald-800">
          <p className="text-xs font-bold uppercase tracking-widest">Transfer sent</p>
          <p className="font-semibold">
            Reference {receipt.reference || receipt.id} · {receipt.statusLabel || receipt.status}
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-2 sm:flex-row xl:flex-col">
        <Button
          className="w-full sm:w-fit xl:w-full"
          disabled={isSubmitting || !canReview}
          onClick={onOpenReview}
          variant="secondary"
        >
          Review Transfer
        </Button>
        <Button
          className="w-full sm:w-fit xl:w-full"
          disabled={isSubmitting}
          onClick={onReset}
          variant="secondary"
        >
          Reset Draft
        </Button>
      </div>
    </Card>
  )
}
