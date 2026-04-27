import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'

import { accounts } from '../features/accounts/data/accounts.js'
import { transferDraft as defaultTransferDraft } from '../features/transfers/data/transfers.js'
import { getCurrentUser, login as loginRequest, logout as logoutRequest } from '../lib/api/auth.js'
import { clearStoredAuth, loadStoredAuth, storeAuth } from './authStorage.js'

const AppStateContext = createContext(null)

const initialState = {
  accessToken: null,
  authError: null,
  isAuthLoading: true,
  isAuthenticated: false,
  isTransferReviewOpen: false,
  refreshToken: null,
  selectedAccountId: accounts[0]?.id ?? null,
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
    case 'transfer/updateDraft':
      return {
        ...state,
        transferDraft: {
          ...state.transferDraft,
          [action.field]: action.value,
        },
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
        authError: null,
        isAuthLoading: false,
        isAuthenticated: false,
        refreshToken: null,
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
