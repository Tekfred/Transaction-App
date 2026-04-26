import TransferCard from './TransferCard.jsx'

export default function TransferList({ transfers }) {
  return (
    <div className="grid gap-4">
      {transfers.map((transfer) => (
        <TransferCard key={transfer.id} transfer={transfer} />
      ))}
    </div>
  )
}
