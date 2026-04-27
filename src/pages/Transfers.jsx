import { useAppState } from '../app/AppProvider.jsx'
import { PageHeader, PageSection } from '../components/ui/index.js'
import { TransferFormShell, TransferList } from '../features/transfers/components/index.js'
import { transfers } from '../features/transfers/data/transfers.js'

export default function Transfers() {
  const {
    closeTransferReview,
    openTransferReview,
    resetTransferDraft,
    state,
    updateTransferDraft,
  } = useAppState()

  return (
    <PageSection className="gap-6">
      <PageHeader
        eyebrow="Transfers"
        subtitle="Prepare new transfers and review scheduled movement between accounts."
        title="Transfers"
      />

      <div className="grid gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
        <TransferFormShell
          accounts={state.accounts}
          draft={state.transferDraft}
          isReviewOpen={state.isTransferReviewOpen}
          onCloseReview={closeTransferReview}
          onOpenReview={openTransferReview}
          onReset={resetTransferDraft}
          onUpdateDraft={updateTransferDraft}
        />
        <TransferList transfers={transfers} />
      </div>
    </PageSection>
  )
}
