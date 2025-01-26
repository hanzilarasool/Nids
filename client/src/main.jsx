import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LoginProvider } from './contexts/LogingContext.jsx'

createRoot(document.getElementById('root')).render(
<LoginProvider>
<StrictMode>
    <App />
  </StrictMode>,
</LoginProvider>
)
