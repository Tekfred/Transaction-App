import { Badge, Card, FormControl } from '../../../components/ui/index.js'
import { lightFormControlClass } from './formStyles.js'

export default function BillerPicker({ billers, isLoading, onSelectBiller, selectedBillerId }) {
  const selectedBiller = billers.find((biller) => biller.id === selectedBillerId)

  return (
    <Card className="grid gap-3" padded="md">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Step 1</p>
          <h3 className="text-xl font-semibold text-slate-900">Choose biller</h3>
        </div>
        {selectedBiller ? <Badge variant="posted">{selectedBiller.categoryLabel}</Badge> : null}
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-semibold text-slate-700">Merchant or biller</span>
        <FormControl
          as="select"
          className={lightFormControlClass}
          disabled={isLoading || billers.length === 0}
          onChange={(event) => onSelectBiller(event.target.value)}
          value={selectedBillerId}
        >
          {billers.map((biller) => (
            <option key={biller.id} value={biller.id}>
              {biller.name}
            </option>
          ))}
        </FormControl>
      </label>

      {selectedBiller ? (
        <p className="text-sm font-semibold text-slate-500">
          Next: enter {selectedBiller.referenceLabel.toLowerCase()} for {selectedBiller.name}.
        </p>
      ) : (
        <p className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-500">
          {isLoading ? 'Loading billers...' : 'No active billers available.'}
        </p>
      )}
    </Card>
  )
}
