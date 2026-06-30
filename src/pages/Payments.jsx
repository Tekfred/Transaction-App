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

      <div className="grid items-start gap-6 2xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="grid gap-6">
          <div className="grid items-start gap-6 xl:grid-cols-3">
            <BillerPicker
              billers={state.billers}
              isLoading={state.isBillersLoading}
              onSelectBiller={(billerId) => updateBillPaymentDraft('billerId', billerId)}
              selectedBillerId={state.billPaymentDraft.billerId}
            />
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

        <div className="grid h-fit gap-6">
          <BillPaymentReceipt receipt={state.billPaymentReceipt} />
          <Card className="bg-slate-950 text-white" padded="md">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-300">Flow</p>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-200">
              <p>1. Choose biller</p>
              <p>2. Enter reference</p>
              <p>3. Check bill</p>
              <p>4. Confirm and pay</p>
            </div>
          </Card>
        </div>
      </div>
    </PageSection>
  )
}
