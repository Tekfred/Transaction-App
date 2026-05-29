import { useAppState } from '../app/AppProvider.jsx'
import { Card, PageHeader, PageSection } from '../components/ui/index.js'
import {
  BillerPicker,
  BillInquiryForm,
  BillPaymentConfirmCard,
  BillPaymentHistoryList,
  BillPaymentReceipt,
} from '../features/payments/components/index.js'
import { isBillPaymentSourceAccount } from '../features/payments/data/sourceAccounts.js'

export default function Payments() {
  const { inquireBillPayment, resetBillPayment, state, submitBillPayment, updateBillPaymentDraft } =
    useAppState()
  const selectedBiller = state.billers.find(
    (biller) => biller.id === state.billPaymentDraft.billerId,
  )
  const sourceAccounts = state.accounts.filter(isBillPaymentSourceAccount)

  return (
    <PageSection className="gap-6">
      <PageHeader
        eyebrow="Bill payments"
        subtitle="Pay merchants and billers from your checking or savings balance."
        title="Payments"
      />

      {state.billersError ? (
        <Card className="bg-amber-50 text-amber-800" padded="md">
          <p className="font-semibold">Unable to load billers</p>
          <p className="text-sm">{state.billersError}</p>
        </Card>
      ) : null}

      {state.billPaymentError ? (
        <Card className="bg-rose-50 text-rose-700" padded="md">
          <p className="font-semibold">Payment needs attention</p>
          <p className="text-sm">{state.billPaymentError}</p>
        </Card>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
        <div className="grid gap-4">
          <BillerPicker
            billers={state.billers}
            isLoading={state.isBillersLoading}
            onSelectBiller={(billerId) => updateBillPaymentDraft('billerId', billerId)}
            selectedBillerId={state.billPaymentDraft.billerId}
          />
          <BillPaymentReceipt receipt={state.billPaymentReceipt} />
        </div>

        <div className="grid gap-4">
          <div className="grid gap-4 xl:grid-cols-2">
            <BillInquiryForm
              biller={selectedBiller}
              draft={state.billPaymentDraft}
              isLoading={state.isBillPaymentInquiryLoading}
              onSubmit={inquireBillPayment}
              onUpdateDraft={updateBillPaymentDraft}
            />
            <BillPaymentConfirmCard
              accounts={sourceAccounts}
              draft={state.billPaymentDraft}
              inquiry={state.billPaymentInquiry}
              isSubmitting={state.isBillPaymentSubmitting}
              onPay={submitBillPayment}
              onReset={resetBillPayment}
              onUpdateDraft={updateBillPaymentDraft}
            />
          </div>

          <BillPaymentHistoryList
            billPayments={state.billPayments}
            isLoading={state.isBillPaymentHistoryLoading}
          />
        </div>
      </div>
    </PageSection>
  )
}
