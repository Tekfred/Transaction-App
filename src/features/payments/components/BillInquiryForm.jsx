import { Button, Card, FormControl } from '../../../components/ui/index.js'
import { lightFormControlClass } from './formStyles.js'

export default function BillInquiryForm({ biller, draft, isLoading, onSubmit, onUpdateDraft }) {
  const referenceLabel = biller?.referenceLabel ?? 'Customer reference'

  return (
    <Card className="grid gap-4" padded="md">
      <div>
        <p className="text-sm font-semibold text-slate-500">Step 2</p>
        <h3 className="text-xl font-semibold text-slate-900">Check bill</h3>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-semibold text-slate-700">{referenceLabel}</span>
        <FormControl
          autoComplete="off"
          className={lightFormControlClass}
          disabled={!biller || isLoading}
          onChange={(event) => onUpdateDraft('customerReference', event.target.value)}
          placeholder={`Enter ${referenceLabel.toLowerCase()}`}
          type="text"
          value={draft.customerReference}
        />
      </label>

      <Button disabled={!biller || isLoading || !draft.customerReference.trim()} onClick={onSubmit}>
        {isLoading ? 'Checking...' : 'Check Bill'}
      </Button>
    </Card>
  )
}
