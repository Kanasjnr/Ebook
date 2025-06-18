import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import useTitle from '../../Hooks/useTitle'
import OrderSuccess from './Components/OrderSuccess'
import OrderFail from './Components/OrderFail'


const OrderPage = () => {

    useTitle("Order Summary")
    const {state} = useLocation()
    
    // If no state is provided, redirect to home page
    if (!state) {
        return <Navigate to="/" replace />
    }
    
  return (
    <main>
      {state.status ? <OrderSuccess orderData={state.orderData} /> : <OrderFail/> }
    </main>
  )
}

export default OrderPage
