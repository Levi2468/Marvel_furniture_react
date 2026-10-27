import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ContextThrow from './context.jsx'
import App from './App.jsx'
import './css/App.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextThrow>
       <App />
    </ContextThrow>
  </StrictMode>,
)
