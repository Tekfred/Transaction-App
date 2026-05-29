import { Badge, Card, FormControl } from '../../../components/ui/index.js'

export default function BillerPicker({ billers, isLoading, onSelectBiller, selectedBillerId }) {
  const selectedBiller = billers.find((biller) => biller.id === selectedBillerId)

  return (
    <Card className="grid gap-4 bg-slate-950 text-white">
      <div>
        <p className="text-sm font-semibold text-slate-300">Step 1</p>
        <h3 className="mt-1 text-2xl font-bold">Choose biller</h3>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-semibold text-slate-300">Merchant or biller</span>
        <FormControl
          as="select"
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
        <div className="grid gap-3 rounded-2xl bg-white/10 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold">{selectedBiller.name}</p>
            <Badge variant="posted">{selectedBiller.categoryLabel}</Badge>
          </div>
          <p className="text-sm text-slate-300">
            Reference needed: {selectedBiller.referenceLabel}
          </p>
        </div>
      ) : (
        <p className="rounded-2xl bg-white/10 p-4 text-sm font-semibold text-slate-300">
          {isLoading ? 'Loading billers...' : 'No active billers available.'}
        </p>
      )}
    </Card>
  )
}
