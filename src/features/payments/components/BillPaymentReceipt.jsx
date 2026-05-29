import { Badge, Card } from '../../../components/ui/index.js'
import { formatCompactDate, formatCurrency } from '../../../utils/formatters.js'

export default function BillPaymentReceipt({ receipt }) {
  if (!receipt) {
    return null
  }

  const receiptDate = receipt.processedAt ?? receipt.createdAt

  return (
    <Card className="grid gap-3 border-emerald-600/20 bg-emerald-50 text-emerald-900" padded="md">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-bold uppercase tracking-widest">Payment successful</p>
        <Badge variant="paid">{receipt.status}</Badge>
      </div>
      <h3 className="text-xl font-bold">{receipt.billerName}</h3>
      <p className="text-sm font-semibold">
        {formatCurrency(receipt.amount)} · {formatCompactDate(receiptDate)}
      </p>
      <p className="text-sm">Customer: {receipt.customerName}</p>
      <p className="text-sm">Reference: {receipt.reference}</p>
      {receipt.transactionReference ? (
        <p className="text-sm">Transaction: {receipt.transactionReference}</p>
      ) : null}
    </Card>
  )
}
