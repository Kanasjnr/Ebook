import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FilterProvider } from './Context/FilterContext.jsx'
import { CartProvider } from './Context/CartContext.jsx'
import { ScrollToTop } from './Components/index.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <CartProvider>
      <FilterProvider>
        <ScrollToTop/>
        <ToastContainer closeButton={false} autoClose={3000} position={"bottom-right"}/>
        <App/>
      </FilterProvider>
    </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)