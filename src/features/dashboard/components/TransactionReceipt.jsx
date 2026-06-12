import { useState } from 'react'
import {
  Receipt,
  Download,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  X,
  ReceiptText,
  AlertCircle,
} from 'lucide-react'

/**
 * TransactionReceiptPanel
 *
 * Props (unchanged from original Dashboard.jsx usage):
 *   receipt          — state.selectedReceipt (null | object)
 *   error            — state.receiptError
 *   isDownloading    — state.isReceiptDownloading
 *   isLoading        — state.isReceiptLoading
 *   onDownload       — () => void  (calls downloadTransactionReceipt internally in Dashboard)
 *
 * Note: onClose is NOT passed from Dashboard.jsx in the old code,
 * so this component handles its own "clear" display gracefully.
 */
export default function TransactionReceiptPanel({
  receipt,
  error,
  isDownloading,
  isLoading,
  onDownload,
}) {
  // Empty / loading state
  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200/50 p-6 rounded-[32px] shadow-xs flex flex-col items-center justify-center gap-3 py-12 text-center">
        <RefreshCw size={20} className="animate-spin text-[#4648d4]" />
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Loading receipt…
        </p>
      </div>
    )
  }

  if (error && !receipt) {
    return (
      <div className="bg-rose-50 border border-rose-200/60 p-6 rounded-[32px] flex flex-col items-center justify-center gap-3 py-10 text-center">
        <AlertCircle size={20} className="text-rose-400" />
        <div>
          <p className="text-sm font-bold text-rose-700">Receipt unavailable</p>
          <p className="text-[11px] text-rose-500 mt-1 max-w-[220px] mx-auto">{error}</p>
        </div>
      </div>
    )
  }

  if (!receipt) {
    return (
      <div className="bg-white border border-slate-200/50 p-6 rounded-[32px] shadow-xs flex flex-col items-center justify-center gap-3 py-12 text-center">
        <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
          <ReceiptText size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-700">No transaction selected</h4>
          <p className="text-[11px] text-slate-400 mt-1 max-w-[200px] mx-auto">
            Click "View Receipt" on any transaction above to see its full audit details here.
          </p>
        </div>
      </div>
    )
  }

  const isDebit = receipt.amount < 0

  return (
    <div className="bg-white border border-slate-200/60 p-6 rounded-[32px] relative shadow-xs text-left divide-y divide-slate-100 animate-fade-in">
      {/* Header */}
      <div className="pb-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-[#4648d4] font-bold text-xs uppercase tracking-widest">
          <Receipt size={14} />
          <span>Receipt Auditor</span>
        </div>
        {/* Error badge if present alongside receipt */}
        {error && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-100">
            <AlertCircle size={10} />
            {error}
          </span>
        )}
      </div>

      {/* Main receipt body */}
      <div className="py-5 space-y-4">
        {/* Merchant + amount */}
        <div className="text-center space-y-1.5 pt-1">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
            Audited Transfer
          </p>
          <h4 className="text-lg font-bold text-[#0b1c30]">
            {receipt.merchant ?? receipt.reference ?? 'Transaction'}
          </h4>
          <p
            className={`text-2xl font-extrabold ${isDebit ? 'text-[#0b1c30]' : 'text-emerald-600'}`}
          >
            {isDebit ? '-' : '+'}
            {Math.abs(receipt.amount).toLocaleString('en-US', {
              style: 'currency',
              currency: receipt.currency ?? 'USD',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <div className="flex items-center justify-center gap-1 mt-1">
            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
              <CheckCircle2 size={9} className="stroke-[2.5]" />
              Secure Ledger
            </span>
          </div>
        </div>

        {/* Audit detail rows */}
        <div className="space-y-2.5 text-xs pt-2">
          {[
            { label: 'Transaction ID', value: receipt.id, mono: true },
            { label: 'Reference', value: receipt.reference ?? '—', mono: true },
            { label: 'Category', value: receipt.category ?? '—', mono: false },
            { label: 'Date', value: receipt.date ?? 'Just now', mono: false },
            { label: 'Status', value: receipt.status ?? 'completed', mono: false, highlight: true },
          ].map(({ label, value, mono, highlight }) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-slate-400">{label}</span>
              <span
                className={`
                ${mono ? 'font-mono' : 'font-semibold'} text-slate-800
                ${highlight ? 'text-emerald-600 font-bold uppercase tracking-wider text-[10px]' : ''}
              `}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 space-y-3">
        <button
          type="button"
          onClick={onDownload}
          disabled={isDownloading}
          className="w-full bg-[#0b1c30] hover:bg-[#4648d4] text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4648d4]"
        >
          {isDownloading ? (
            <>
              <RefreshCw size={14} className="animate-spin" />
              Generating PDF…
            </>
          ) : (
            <>
              <Download size={14} />
              Download Receipt
            </>
          )}
        </button>

        <div className="flex items-center gap-1.5 justify-center text-[10px] text-slate-400 font-semibold">
          <ShieldCheck size={12} className="text-emerald-500" />
          <span>Signed electronic audit artifact</span>
        </div>
      </div>
    </div>
  )
}
