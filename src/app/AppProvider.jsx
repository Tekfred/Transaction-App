import { createContext, useContext, useMemo, useReducer } from 'react'

import { accounts } from '../features/accounts/data/accounts.js'
import { transferDraft as defaultTransferDraft } from '../features/transfers/data/transfers.js'

const AppStateContext = createContext(null)

const initialState = {
  selectedAccountId: accounts[0]?.id ?? null,
  transferDraft: defaultTransferDraft,
  isTransferReviewOpen: false,
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
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const value = useMemo(
    () => ({
      closeTransferReview: () => dispatch({ type: 'transfer/closeReview' }),
      openTransferReview: () => dispatch({ type: 'transfer/openReview' }),
      resetTransferDraft: () => dispatch({ type: 'transfer/resetDraft' }),
      selectAccount: (accountId) => dispatch({ type: 'account/select', accountId }),
      state,
      updateTransferDraft: (field, value) =>
        dispatch({ type: 'transfer/updateDraft', field, value }),
    }),
    [state],
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
