import Dashboard from '../pages/Dashboard.jsx'
import MyAccounts from '../pages/MyAccounts.jsx'
import Payments from '../pages/Payments.jsx'
import Profile from '../pages/Profile.jsx'
import Transfers from '../pages/Transfers.jsx'

export const appRoutes = [
  {
    id: 'dashboard',
    index: true,
    element: <Dashboard />,
  },
  {
    id: 'accounts',
    path: 'my-accounts',
    element: <MyAccounts />,
  },
  {
    id: 'payments',
    path: 'payments',
    element: <Payments />,
  },
  {
    id: 'transfers',
    path: 'transfers',
    element: <Transfers />,
  },
  {
    id: 'profile',
    path: 'profile',
    element: <Profile />,
  },
]
