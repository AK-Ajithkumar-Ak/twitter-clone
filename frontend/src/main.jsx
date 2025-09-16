import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryclient= new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus: false,    // stop switch tab refetch
    }
  }
})


createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryclient}>
    <App />
    </QueryClientProvider>
    </BrowserRouter>
  // </StrictMode>,
)
