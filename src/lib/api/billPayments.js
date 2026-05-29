import { apiRequest } from './client.js'
import { mapBiller, mapBillInquiry, mapBillPayment, mapTransaction } from './mappers.js'

export async function getBillers(accessToken) {
  const response = await apiRequest('/api/billers/', {
    accessToken,
  })

  return response.map(mapBiller)
}

export async function inquireBill(accessToken, inquiry) {
  const response = await apiRequest('/api/bill-payments/inquiry/', {
    accessToken,
    body: {
      biller_id: inquiry.billerId,
      customer_reference: inquiry.customerReference,
    },
    method: 'POST',
  })

  return mapBillInquiry(response)
}

export async function createBillPayment(accessToken, payment) {
  const response = await apiRequest('/api/bill-payments/', {
    accessToken,
    body: {
      amount: String(payment.amount),
      biller_id: payment.billerId,
      customer_name: payment.customerName,
      customer_reference: payment.customerReference,
      narration: payment.narration,
      source_account_id: payment.sourceAccountId,
    },
    method: 'POST',
  })

  return mapBillPayment(response)
}

export async function payBill(accessToken, paymentId) {
  const response = await apiRequest(`/api/bill-payments/${paymentId}/pay/`, {
    accessToken,
    method: 'POST',
  })

  return mapTransaction(response)
}

export async function getBillPayments(accessToken) {
  const response = await apiRequest('/api/bill-payments/', {
    accessToken,
  })

  return response.map(mapBillPayment)
}

export async function getBillPayment(accessToken, paymentId) {
  const response = await apiRequest(`/api/bill-payments/${paymentId}/`, {
    accessToken,
  })

  return mapBillPayment(response)
}

export async function getBillPaymentReceipt(accessToken, paymentId) {
  const response = await apiRequest(`/api/bill-payments/${paymentId}/receipt/`, {
    accessToken,
  })

  return mapBillPayment(response)
}
