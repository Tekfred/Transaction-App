import { FormControl } from '../../../components/ui/index.js'
import { formatCurrency } from '../../../utils/formatters.js'
import { lightFormControlClass } from './formStyles.js'

export default function SourceAccountSelector({
  accounts,
  disabled,
  onSelectAccount,
  selectedAccountId,
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-slate-700">Pay from</span>
      <FormControl
        as="select"
        className={lightFormControlClass}
        disabled={disabled || accounts.length === 0}
        onChange={(event) => onSelectAccount(event.target.value)}
        value={selectedAccountId}
      >
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.name} · {account.accountNumber} ·{' '}
            {formatCurrency(account.availableBalance ?? account.balance, account.currency)}
          </option>
        ))}
      </FormControl>
    </label>
  )
}
