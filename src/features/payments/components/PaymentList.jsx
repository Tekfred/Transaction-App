import PaymentCard from './PaymentCard.jsx'

export default function PaymentList({ payments }) {
  return (
    <div className="grid gap-4">
      {payments.map((payment) => (
        <PaymentCard key={payment.id} payment={payment} />
      ))}
    </div>
  )
}
