import './styles/global.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './app/App.jsx'

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
