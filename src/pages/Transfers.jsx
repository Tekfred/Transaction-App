import { PageHeader, PageSection } from '../components/ui/index.js'
import { TransferFormShell, TransferList } from '../features/transfers/components/index.js'
import { transferDraft, transfers } from '../features/transfers/data/transfers.js'

export default function Transfers() {
  return (
    <PageSection className="gap-6">
      <PageHeader
        eyebrow="Transfers"
        subtitle="Prepare new transfers and review scheduled movement between accounts."
        title="Transfers"
      />

      <div className="grid gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
        <TransferFormShell draft={transferDraft} />
        <TransferList transfers={transfers} />
      </div>
    </PageSection>
  )
}
