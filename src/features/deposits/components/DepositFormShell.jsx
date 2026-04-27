import { Button, Card, FormControl } from '../../../components/ui/index.js'
import { formatCurrency } from '../../../utils/formatters.js'

export default function DepositFormShell({
  accounts,
  draft,
  error,
  isDisabled = false,
  isSubmitting,
  onReset,
  onSubmit,
  onUpdateDraft,
}) {
  const selectedAccount = accounts.find((account) => account.id === draft.accountId) ?? accounts[0]

  return (
    <Card className="grid gap-5 bg-slate-950 text-white">
      <div>
        <p className="text-sm font-semibold text-slate-300">New deposit</p>
        <h3 className="mt-1 text-2xl font-bold">Add funds</h3>
      </div>

      <div className="grid gap-3">
        <label className="grid gap-2 rounded-2xl bg-white/10 p-4">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
            Destination account
          </span>
          <FormControl
            as="select"
            onChange={(event) => onUpdateDraft('accountId', event.target.value)}
            value={draft.accountId ?? selectedAccount?.id ?? ''}
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

      <div className="rounded-2xl bg-white/10 p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-300">Checkout</p>
        <p className="mt-1 font-semibold">
          {formatCurrency(draft.amount, draft.currency)} to {selectedAccount?.name ?? 'account'}
        </p>
        <p className="mt-1 text-sm text-slate-300">
          You will be redirected to Stripe checkout to complete this deposit.
        </p>
      </div>

      {error ? (
        <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
          {error}
        </p>
      ) : null}

      {isDisabled ? (
        <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">
          Connect to the backend before creating a deposit checkout.
        </p>
      ) : null}

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        <Button
          className="w-full"
          disabled={isSubmitting || isDisabled}
          onClick={onSubmit}
          variant="secondary"
        >
          {isSubmitting ? 'Creating checkout...' : 'Continue to Checkout'}
        </Button>
        <Button className="w-full" disabled={isSubmitting} onClick={onReset} variant="secondary">
          Reset Deposit
        </Button>
      </div>
    </Card>
  )
}
