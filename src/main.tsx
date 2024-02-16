import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import { Toaster } from 'sonner'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
      <Toaster richColors />
    </ThemeProvider>
  </React.StrictMode>,
)
