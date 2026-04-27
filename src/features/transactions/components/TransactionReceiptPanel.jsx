import { Button, Card } from '../../../components/ui/index.js'
import { formatCurrency } from '../../../utils/formatters.js'

export default function TransactionReceiptPanel({
  error,
  isDownloading,
  isLoading,
  onDownload,
  receipt,
}) {
  if (isLoading) {
    return (
      <Card className="grid gap-2" padded="md">
        <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Receipt</p>
        <p className="text-slate-600">Loading receipt details...</p>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-rose-50 text-rose-800" padded="md">
        <p className="font-semibold">Receipt unavailable</p>
        <p className="text-sm">{error}</p>
      </Card>
    )
  }

  if (!receipt) {
    return null
  }

  return (
    <Card className="grid gap-4" padded="md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Receipt</p>
          <h3 className="text-xl font-semibold text-slate-900">
            {receipt.transactionTypeLabel || receipt.transactionType || 'Transaction'}
          </h3>
          <p className="text-slate-500">Reference {receipt.reference}</p>
        </div>
        <strong className="text-2xl font-bold text-slate-950">
          {formatCurrency(receipt.amount, receipt.currency ?? 'USD')}
        </strong>
      </div>

      <div className="grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Status</p>
          <p className="font-semibold text-slate-900">{receipt.statusLabel || receipt.status}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Source</p>
          <p className="font-semibold text-slate-900">{receipt.sourceLabel || receipt.source}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Processed</p>
          <p className="font-semibold text-slate-900">
            {receipt.processedAt ? new Date(receipt.processedAt).toLocaleDateString() : 'Pending'}
          </p>
        </div>
      </div>

      {receipt.narration ? <p className="text-slate-500">{receipt.narration}</p> : null}

      <Button className="w-full sm:w-fit" disabled={isDownloading} onClick={onDownload}>
        {isDownloading ? 'Preparing PDF...' : 'Download PDF'}
      </Button>
    </Card>
  )
}
