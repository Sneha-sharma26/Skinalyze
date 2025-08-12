import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import './App.css'
import App from './App'
import ResultsPage from './routes/ResultsPage'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/results', element: <ResultsPage /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
