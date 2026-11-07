import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ProductsProvider from './context/ProductsProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProductsProvider>
    
  </StrictMode>,
)
