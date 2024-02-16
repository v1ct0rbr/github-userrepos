import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import { AppLayout } from './Layouts/AppLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    
    ],
  },
])
