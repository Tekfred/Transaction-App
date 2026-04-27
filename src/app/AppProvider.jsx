import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'

import { getAccounts as getAccountsRequest, getAccountsSummary } from '../lib/api/accounts.js'
import { accounts as mockAccounts } from '../features/accounts/data/accounts.js'
import { toAccountViewModels } from '../features/accounts/data/adapters.js'
import { createAccountsSummary } from '../features/accounts/data/summary.js'
import { depositDraft as defaultDepositDraft } from '../features/deposits/data/depositDraft.js'
import { transactions as mockTransactions } from '../features/transactions/data/transactions.js'
import { toTransactionViewModels } from '../features/transactions/data/adapters.js'
import { transferDraft as defaultTransferDraft } from '../features/transfers/data/transfers.js'
import { getCurrentUser, login as loginRequest, logout as logoutRequest } from '../lib/api/auth.js'
import { initiateDeposit as initiateDepositRequest } from '../lib/api/deposits.js'
import {
  getTransactionReceipt,
  getTransactionReceiptPdf,
  getTransactions as getTransactionsRequest,
} from '../lib/api/transactions.js'
import { createTransfer as createTransferRequest } from '../lib/api/transfers.js'
import { clearStoredAuth, loadStoredAuth, storeAuth } from './authStorage.js'

const AppStateContext = createContext(null)

const initialState = {
  accessToken: null,
  accounts: mockAccounts,
  accountsError: null,
  accountsSummary: createAccountsSummary(mockAccounts),
  authError: null,
  depositDraft: {
    ...defaultDepositDraft,
    accountId: mockAccounts[0]?.id ?? null,
  },
  depositError: null,
  isAccountsLoading: false,
  isAuthLoading: true,
  isDepositSubmitting: false,
  isAuthenticated: false,
  isReceiptDownloading: false,
  isReceiptLoading: false,
  isTransactionsLoading: false,
  isTransferSubmitting: false,
  isUsingMockAccounts: true,
  isUsingMockTransactions: true,
  isTransferReviewOpen: false,
  refreshToken: null,
  receiptError: null,
  selectedAccountId: mockAccounts[0]?.id ?? null,
  selectedReceipt: null,
  transactions: mockTransactions,
  transactionsError: null,
  transferError: null,
  transferDraft: defaultTransferDraft,
  transferReceipt: null,
  user: null,
}

function appReducer(state, action) {
  switch (action.type) {
    case 'account/select':
      return {
        ...state,
        selectedAccountId: action.accountId,
      }
    case 'accounts/loadStart':
      return {
        ...state,
        accountsError: null,
        isAccountsLoading: true,
      }
    case 'accounts/loadSuccess': {
      const selectedAccountExists = action.accounts.some(
        (account) => account.id === state.selectedAccountId,
      )
      const draftFromExists = action.accounts.some(
        (account) => account.id === state.transferDraft.fromAccountId,
      )
      const draftToExists = action.accounts.some(
        (account) => account.id === state.transferDraft.toAccountId,
      )
      const fallbackFromAccountId = action.accounts[0]?.id || null
      const fallbackToAccountId = action.accounts[1]?.id || action.accounts[0]?.id || null

      return {
        ...state,
        accounts: action.accounts,
        accountsError: null,
        accountsSummary: action.summary,
        isAccountsLoading: false,
        isUsingMockAccounts: false,
        selectedAccountId: selectedAccountExists
          ? state.selectedAccountId
          : action.accounts[0]?.id || null,
        transferDraft: {
          ...state.transferDraft,
          fromAccountId: draftFromExists
            ? state.transferDraft.fromAccountId
            : fallbackFromAccountId,
          toAccountId: draftToExists ? state.transferDraft.toAccountId : fallbackToAccountId,
        },
        depositDraft: {
          ...state.depositDraft,
          accountId: action.accounts.some((account) => account.id === state.depositDraft.accountId)
            ? state.depositDraft.accountId
            : fallbackFromAccountId,
        },
      }
    }
    case 'accounts/loadFailure':
      return {
        ...state,
        accounts: mockAccounts,
        accountsError: action.message,
        accountsSummary: createAccountsSummary(mockAccounts),
        isAccountsLoading: false,
        isUsingMockAccounts: true,
        selectedAccountId: mockAccounts[0]?.id ?? null,
      }
    case 'transfer/updateDraft':
      return {
        ...state,
        transferDraft: {
          ...state.transferDraft,
          [action.field]: action.value,
        },
        transferError: null,
      }
    case 'deposit/updateDraft':
      return {
        ...state,
        depositDraft: {
          ...state.depositDraft,
          [action.field]: action.value,
        },
        depositError: null,
      }
    case 'deposit/resetDraft':
      return {
        ...state,
        depositDraft: {
          ...defaultDepositDraft,
          accountId: state.accounts[0]?.id ?? defaultDepositDraft.accountId,
        },
        depositError: null,
      }
    case 'deposit/submitStart':
      return {
        ...state,
        depositError: null,
        isDepositSubmitting: true,
      }
    case 'deposit/submitFailure':
      return {
        ...state,
        depositError: action.message,
        isDepositSubmitting: false,
      }
    case 'transactions/loadStart':
      return {
        ...state,
        isTransactionsLoading: true,
        transactionsError: null,
      }
    case 'transactions/loadSuccess':
      return {
        ...state,
        isTransactionsLoading: false,
        isUsingMockTransactions: false,
        transactions: action.transactions,
        transactionsError: null,
      }
    case 'transactions/loadFailure':
      return {
        ...state,
        isTransactionsLoading: false,
        isUsingMockTransactions: true,
        transactions: mockTransactions,
        transactionsError: action.message,
      }
    case 'receipt/loadStart':
      return {
        ...state,
        isReceiptLoading: true,
        receiptError: null,
      }
    case 'receipt/loadSuccess':
      return {
        ...state,
        isReceiptLoading: false,
        receiptError: null,
        selectedReceipt: action.receipt,
      }
    case 'receipt/loadFailure':
      return {
        ...state,
        isReceiptLoading: false,
        receiptError: action.message,
      }
    case 'receipt/downloadStart':
      return {
        ...state,
        isReceiptDownloading: true,
        receiptError: null,
      }
    case 'receipt/downloadSuccess':
      return {
        ...state,
        isReceiptDownloading: false,
      }
    case 'receipt/downloadFailure':
      return {
        ...state,
        isReceiptDownloading: false,
        receiptError: action.message,
      }
    case 'receipt/clear':
      return {
        ...state,
        receiptError: null,
        selectedReceipt: null,
      }
    case 'transfer/openReview':
      return {
        ...state,
        isTransferReviewOpen: true,
        transferError: null,
      }
    case 'transfer/closeReview':
      return {
        ...state,
        isTransferReviewOpen: false,
      }
    case 'transfer/resetDraft':
      return {
        ...state,
        transferDraft: {
          ...defaultTransferDraft,
          fromAccountId: state.accounts[0]?.id ?? defaultTransferDraft.fromAccountId,
          toAccountId:
            state.accounts[1]?.id ?? state.accounts[0]?.id ?? defaultTransferDraft.toAccountId,
        },
        transferError: null,
        transferReceipt: null,
        isTransferReviewOpen: false,
      }
    case 'transfer/submitStart':
      return {
        ...state,
        isTransferSubmitting: true,
        transferError: null,
      }
    case 'transfer/submitSuccess':
      return {
        ...state,
        isTransferReviewOpen: false,
        isTransferSubmitting: false,
        transferError: null,
        transferReceipt: action.receipt,
      }
    case 'transfer/submitFailure':
      return {
        ...state,
        isTransferSubmitting: false,
        transferError: action.message,
      }
    case 'auth/restoreStart':
    case 'auth/loginStart':
      return {
        ...state,
        authError: null,
        isAuthLoading: true,
      }
    case 'auth/success':
      return {
        ...state,
        accessToken: action.accessToken,
        authError: null,
        isAuthLoading: false,
        isAuthenticated: true,
        refreshToken: action.refreshToken,
        user: action.user,
      }
    case 'auth/failure':
      return {
        ...state,
        accessToken: null,
        authError: action.message,
        isAuthLoading: false,
        isAuthenticated: false,
        refreshToken: null,
        user: null,
      }
    case 'auth/logout':
      return {
        ...state,
        accessToken: null,
        accounts: mockAccounts,
        accountsError: null,
        accountsSummary: createAccountsSummary(mockAccounts),
        authError: null,
        depositDraft: {
          ...defaultDepositDraft,
          accountId: mockAccounts[0]?.id ?? null,
        },
        depositError: null,
        isAccountsLoading: false,
        isAuthLoading: false,
        isDepositSubmitting: false,
        isAuthenticated: false,
        isReceiptDownloading: false,
        isReceiptLoading: false,
        isTransactionsLoading: false,
        isTransferReviewOpen: false,
        isTransferSubmitting: false,
        isUsingMockAccounts: true,
        isUsingMockTransactions: true,
        refreshToken: null,
        receiptError: null,
        selectedAccountId: mockAccounts[0]?.id ?? null,
        selectedReceipt: null,
        transactions: mockTransactions,
        transactionsError: null,
        transferError: null,
        user: null,
        transferReceipt: null,
      }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    const storedAuth = loadStoredAuth()

    if (!storedAuth?.accessToken) {
      dispatch({ type: 'auth/logout' })
      return
    }

    let isActive = true

    dispatch({ type: 'auth/restoreStart' })

    getCurrentUser(storedAuth.accessToken)
      .then((user) => {
        if (!isActive) {
          return
        }

        dispatch({
          type: 'auth/success',
          accessToken: storedAuth.accessToken,
          refreshToken: storedAuth.refreshToken,
          user,
        })
      })
      .catch(() => {
        if (!isActive) {
          return
        }

        clearStoredAuth()
        dispatch({ type: 'auth/logout' })
      })

    return () => {
      isActive = false
    }
  }, [])

  const login = useCallback(async (credentials) => {
    dispatch({ type: 'auth/loginStart' })

    try {
      const auth = await loginRequest(credentials)

      storeAuth({
        accessToken: auth.accessToken,
        refreshToken: auth.refreshToken,
      })

      dispatch({
        type: 'auth/success',
        accessToken: auth.accessToken,
        refreshToken: auth.refreshToken,
        user: auth.user,
      })

      return auth
    } catch (error) {
      dispatch({
        type: 'auth/failure',
        message: error.message || 'Unable to sign in.',
      })
      throw error
    }
  }, [])

  const logout = useCallback(async () => {
    const auth = {
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
    }

    clearStoredAuth()
    dispatch({ type: 'auth/logout' })

    if (auth.accessToken && auth.refreshToken) {
      try {
        await logoutRequest(auth)
      } catch {
        // Local logout should still complete if the server rejects the token.
      }
    }
  }, [state.accessToken, state.refreshToken])

  const refreshAccounts = useCallback(async (accessToken) => {
    const [apiAccounts, apiSummary] = await Promise.all([
      getAccountsRequest(accessToken),
      getAccountsSummary(accessToken),
    ])
    const accounts = toAccountViewModels(apiAccounts)

    dispatch({
      type: 'accounts/loadSuccess',
      accounts,
      summary: {
        activeAccounts: apiSummary.accounts.filter((account) => account.isActive).length,
        currency: accounts[0]?.currency ?? 'USD',
        totalAvailable: apiSummary.totalBalance,
        totalBalance: apiSummary.totalBalance,
      },
    })

    return accounts
  }, [])

  const refreshTransactions = useCallback(async (accessToken) => {
    const apiTransactions = await getTransactionsRequest(accessToken)
    const transactions = toTransactionViewModels(apiTransactions)

    dispatch({
      type: 'transactions/loadSuccess',
      transactions,
    })

    return transactions
  }, [])

  const submitTransfer = useCallback(async () => {
    if (!state.accessToken) {
      dispatch({
        type: 'transfer/submitFailure',
        message: 'You need to sign in before creating a transfer.',
      })
      return null
    }

    const senderAccount = state.accounts.find(
      (account) => account.id === state.transferDraft.fromAccountId,
    )
    const receiverAccount = state.accounts.find(
      (account) => account.id === state.transferDraft.toAccountId,
    )

    if (!senderAccount || !receiverAccount) {
      dispatch({
        type: 'transfer/submitFailure',
        message: 'Choose valid sender and receiver accounts.',
      })
      return null
    }

    if (senderAccount.id === receiverAccount.id) {
      dispatch({
        type: 'transfer/submitFailure',
        message: 'Sender and receiver accounts must be different.',
      })
      return null
    }

    if (!Number.isFinite(state.transferDraft.amount) || state.transferDraft.amount <= 0) {
      dispatch({
        type: 'transfer/submitFailure',
        message: 'Enter a transfer amount greater than zero.',
      })
      return null
    }

    dispatch({ type: 'transfer/submitStart' })

    try {
      const receipt = await createTransferRequest(state.accessToken, {
        amount: state.transferDraft.amount,
        narration: state.transferDraft.memo || 'Transfer',
        receiverAccountNumber: receiverAccount.accountNumber,
        senderAccountId: senderAccount.id,
      })

      dispatch({ type: 'transfer/submitSuccess', receipt })

      Promise.all([
        refreshAccounts(state.accessToken),
        refreshTransactions(state.accessToken),
      ]).catch(() => {
        // The receipt remains valid even if the follow-up refresh fails.
      })

      return receipt
    } catch (error) {
      dispatch({
        type: 'transfer/submitFailure',
        message: error.message || 'Unable to complete transfer.',
      })
      return null
    }
  }, [refreshAccounts, refreshTransactions, state.accessToken, state.accounts, state.transferDraft])

  const updateDepositDraft = useCallback((field, value) => {
    dispatch({ type: 'deposit/updateDraft', field, value })
  }, [])

  const resetDepositDraft = useCallback(() => {
    dispatch({ type: 'deposit/resetDraft' })
  }, [])

  const submitDeposit = useCallback(async () => {
    if (!state.accessToken) {
      dispatch({
        type: 'deposit/submitFailure',
        message: 'You need to sign in before creating a deposit.',
      })
      return null
    }

    const destinationAccount = state.accounts.find(
      (account) => account.id === state.depositDraft.accountId,
    )

    if (!destinationAccount) {
      dispatch({
        type: 'deposit/submitFailure',
        message: 'Choose a valid destination account.',
      })
      return null
    }

    if (!Number.isFinite(state.depositDraft.amount) || state.depositDraft.amount <= 0) {
      dispatch({
        type: 'deposit/submitFailure',
        message: 'Enter a deposit amount greater than zero.',
      })
      return null
    }

    dispatch({ type: 'deposit/submitStart' })

    try {
      const checkout = await initiateDepositRequest(state.accessToken, {
        accountId: destinationAccount.id,
        amount: state.depositDraft.amount,
      })

      if (!checkout.checkoutUrl) {
        throw new Error('Checkout URL was not returned by the server.')
      }

      window.location.assign(checkout.checkoutUrl)
      return checkout
    } catch (error) {
      dispatch({
        type: 'deposit/submitFailure',
        message: error.message || 'Unable to create deposit checkout.',
      })
      return null
    }
  }, [state.accessToken, state.accounts, state.depositDraft])

  const viewTransactionReceipt = useCallback(
    async (transactionId) => {
      if (!state.accessToken) {
        dispatch({
          type: 'receipt/loadFailure',
          message: 'You need to sign in before viewing receipts.',
        })
        return null
      }

      dispatch({ type: 'receipt/loadStart' })

      try {
        const receipt = await getTransactionReceipt(state.accessToken, transactionId)
        dispatch({ type: 'receipt/loadSuccess', receipt })
        return receipt
      } catch (error) {
        dispatch({
          type: 'receipt/loadFailure',
          message: error.message || 'Unable to load receipt.',
        })
        return null
      }
    },
    [state.accessToken],
  )

  const downloadTransactionReceipt = useCallback(
    async (transactionId, reference) => {
      if (!state.accessToken) {
        dispatch({
          type: 'receipt/downloadFailure',
          message: 'You need to sign in before downloading receipts.',
        })
        return
      }

      dispatch({ type: 'receipt/downloadStart' })

      try {
        const blob = await getTransactionReceiptPdf(state.accessToken, transactionId)
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')

        link.href = url
        link.download = `receipt-${reference || transactionId}.pdf`
        document.body.append(link)
        link.click()
        link.remove()
        URL.revokeObjectURL(url)

        dispatch({ type: 'receipt/downloadSuccess' })
      } catch (error) {
        dispatch({
          type: 'receipt/downloadFailure',
          message: error.message || 'Unable to download receipt.',
        })
      }
    },
    [state.accessToken],
  )

  useEffect(() => {
    if (!state.isAuthenticated || !state.accessToken) {
      return
    }

    let isActive = true

    dispatch({ type: 'accounts/loadStart' })

    refreshAccounts(state.accessToken)
      .then(() => {
        if (!isActive) {
          return
        }
      })
      .catch((error) => {
        if (!isActive) {
          return
        }

        dispatch({
          type: 'accounts/loadFailure',
          message: error.message || 'Unable to load accounts.',
        })
      })

    return () => {
      isActive = false
    }
  }, [refreshAccounts, state.accessToken, state.isAuthenticated])

  useEffect(() => {
    if (!state.isAuthenticated || !state.accessToken) {
      return
    }

    let isActive = true

    dispatch({ type: 'transactions/loadStart' })

    refreshTransactions(state.accessToken)
      .then(() => {
        if (!isActive) {
          return
        }
      })
      .catch((error) => {
        if (!isActive) {
          return
        }

        dispatch({
          type: 'transactions/loadFailure',
          message: error.message || 'Unable to load transactions.',
        })
      })

    return () => {
      isActive = false
    }
  }, [refreshTransactions, state.accessToken, state.isAuthenticated])

  const value = useMemo(
    () => ({
      closeTransferReview: () => dispatch({ type: 'transfer/closeReview' }),
      clearReceipt: () => dispatch({ type: 'receipt/clear' }),
      downloadTransactionReceipt,
      login,
      logout,
      openTransferReview: () => dispatch({ type: 'transfer/openReview' }),
      resetDepositDraft,
      resetTransferDraft: () => dispatch({ type: 'transfer/resetDraft' }),
      selectAccount: (accountId) => dispatch({ type: 'account/select', accountId }),
      state,
      submitDeposit,
      submitTransfer,
      updateDepositDraft,
      updateTransferDraft: (field, value) =>
        dispatch({ type: 'transfer/updateDraft', field, value }),
      viewTransactionReceipt,
    }),
    [
      downloadTransactionReceipt,
      login,
      logout,
      resetDepositDraft,
      state,
      submitDeposit,
      submitTransfer,
      updateDepositDraft,
      viewTransactionReceipt,
    ],
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const context = useContext(AppStateContext)

  if (!context) {
    throw new Error('useAppState must be used within AppProvider')
  }

  return context
}
