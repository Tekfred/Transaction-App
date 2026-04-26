import AccountCard from './AccountCard.jsx'

export default function AccountList({ accounts }) {
  return (
    <div className="grid gap-4">
      {accounts.map((account) => (
        <AccountCard account={account} key={account.id} />
      ))}
    </div>
  )
}
