import { useAppState } from '../app/AppProvider.jsx'
import { Card, PageHeader, PageSection } from '../components/ui/index.js'
import { TransferFormShell, TransferList } from '../features/transfers/components/index.js'
import { transfers } from '../features/transfers/data/transfers.js'

export default function Transfers() {
  const {
    closeTransferReview,
    openTransferReview,
    resetTransferDraft,
    state,
    submitTransfer,
    updateTransferDraft,
  } = useAppState()

  return (
    <PageSection className="gap-6">
      <PageHeader
        eyebrow="Transfers"
        subtitle="Prepare new transfers and review scheduled movement between accounts."
        title="Transfers"
      />

      {state.isAccountsLoading ? (
        <Card className="bg-blue-50 text-blue-800" padded="md">
          <p className="font-semibold">Refreshing transfer accounts</p>
          <p className="text-sm">Account options are being updated from the API.</p>
        </Card>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
        <TransferFormShell
          accounts={state.accounts}
          draft={state.transferDraft}
          error={state.transferError}
          isReviewOpen={state.isTransferReviewOpen}
          isSubmitting={state.isTransferSubmitting}
          onCloseReview={closeTransferReview}
          onOpenReview={openTransferReview}
          onReset={resetTransferDraft}
          onSubmit={submitTransfer}
          onUpdateDraft={updateTransferDraft}
          receipt={state.transferReceipt}
        />
        <TransferList transfers={transfers} />
      </div>
    </PageSection>
  )
}
