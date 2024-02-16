import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './Router'
import { ThemeProvider } from './components/ThemeProvider'
import { Toaster } from './components/ui/sonner'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
       
      <RouterProvider router={router} />
     
      <Toaster richColors />
    </ThemeProvider>
  )
}

export default App
