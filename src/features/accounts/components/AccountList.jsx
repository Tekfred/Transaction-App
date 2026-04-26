import AccountCard from './AccountCard.jsx'

export default function AccountList({ accounts, onSelectAccount, selectedAccountId }) {
  return (
    <div className="grid gap-4">
      {accounts.map((account) => (
        <AccountCard
          account={account}
          isSelected={account.id === selectedAccountId}
          key={account.id}
          onSelect={onSelectAccount}
        />
      ))}
    </div>
  )
}
