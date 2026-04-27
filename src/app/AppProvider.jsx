import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'

import { getAccounts as getAccountsRequest, getAccountsSummary } from '../lib/api/accounts.js'
import { accounts as mockAccounts } from '../features/accounts/data/accounts.js'
import { toAccountViewModels } from '../features/accounts/data/adapters.js'
import { createAccountsSummary } from '../features/accounts/data/summary.js'
import { transactions as mockTransactions } from '../features/transactions/data/transactions.js'
import { toTransactionViewModels } from '../features/transactions/data/adapters.js'
import { transferDraft as defaultTransferDraft } from '../features/transfers/data/transfers.js'
import { getCurrentUser, login as loginRequest, logout as logoutRequest } from '../lib/api/auth.js'
import { getTransactions as getTransactionsRequest } from '../lib/api/transactions.js'
import { clearStoredAuth, loadStoredAuth, storeAuth } from './authStorage.js'

const AppStateContext = createContext(null)

const initialState = {
  accessToken: null,
  accounts: mockAccounts,
  accountsError: null,
  accountsSummary: createAccountsSummary(mockAccounts),
  authError: null,
  isAccountsLoading: false,
  isAuthLoading: true,
  isAuthenticated: false,
  isTransactionsLoading: false,
  isUsingMockAccounts: true,
  isUsingMockTransactions: true,
  isTransferReviewOpen: false,
  refreshToken: null,
  selectedAccountId: mockAccounts[0]?.id ?? null,
  transactions: mockTransactions,
  transactionsError: null,
  transferDraft: defaultTransferDraft,
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
    case 'transfer/openReview':
      return {
        ...state,
        isTransferReviewOpen: true,
      }
    case 'transfer/closeReview':
      return {
        ...state,
        isTransferReviewOpen: false,
      }
    case 'transfer/resetDraft':
      return {
        ...state,
        transferDraft: defaultTransferDraft,
        isTransferReviewOpen: false,
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
        isAccountsLoading: false,
        isAuthLoading: false,
        isAuthenticated: false,
        isTransactionsLoading: false,
        isUsingMockAccounts: true,
        isUsingMockTransactions: true,
        refreshToken: null,
        selectedAccountId: mockAccounts[0]?.id ?? null,
        transactions: mockTransactions,
        transactionsError: null,
        user: null,
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

  useEffect(() => {
    if (!state.isAuthenticated || !state.accessToken) {
      return
    }

    let isActive = true

    dispatch({ type: 'accounts/loadStart' })

    Promise.all([getAccountsRequest(state.accessToken), getAccountsSummary(state.accessToken)])
      .then(([apiAccounts, apiSummary]) => {
        if (!isActive) {
          return
        }

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
  }, [state.accessToken, state.isAuthenticated])

  useEffect(() => {
    if (!state.isAuthenticated || !state.accessToken) {
      return
    }

    let isActive = true

    dispatch({ type: 'transactions/loadStart' })

    getTransactionsRequest(state.accessToken)
      .then((apiTransactions) => {
        if (!isActive) {
          return
        }

        dispatch({
          type: 'transactions/loadSuccess',
          transactions: toTransactionViewModels(apiTransactions),
        })
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
  }, [state.accessToken, state.isAuthenticated])

  const value = useMemo(
    () => ({
      closeTransferReview: () => dispatch({ type: 'transfer/closeReview' }),
      login,
      logout,
      openTransferReview: () => dispatch({ type: 'transfer/openReview' }),
      resetTransferDraft: () => dispatch({ type: 'transfer/resetDraft' }),
      selectAccount: (accountId) => dispatch({ type: 'account/select', accountId }),
      state,
      updateTransferDraft: (field, value) =>
        dispatch({ type: 'transfer/updateDraft', field, value }),
    }),
    [login, logout, state],
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
