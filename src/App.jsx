import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import MainLayout from './components/MainLayout.jsx'
import Dashboard from './views/Dashboard.jsx'
import MyAccounts from './views/MyAccounts.jsx'
import Payments from './views/Payments.jsx'
import Profile from './views/Profile.jsx'
import Transfers from './views/Transfers.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />} path="/">
          <Route index element={<Dashboard />} />
          <Route element={<MyAccounts />} path="my-accounts" />
          <Route element={<Payments />} path="payments" />
          <Route element={<Transfers />} path="transfers" />
          <Route element={<Profile />} path="profile" />
          <Route element={<Navigate replace to="/" />} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
