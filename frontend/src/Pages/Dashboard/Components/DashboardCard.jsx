import React from 'react'
import { Link } from 'react-router-dom'

const DashboardCard = ({order}) => {
    if (!order) {
        return null;
    }

    const { _id, cartList, amount_paid, quantity, createdAt } = order;
    
    // Safely handle date formatting with fallback
    let orderDate = 'N/A';
    if (createdAt) {
        const date = new Date(createdAt);
        if (!isNaN(date.getTime())) {
            orderDate = date.toLocaleDateString();
        }
    }

  return (
    <div className='max-w-4xl m-auto p-2 mb-5 border dark:border-slate-700'>
        <div className='flex justify-between text-sm m-2 font-bold dark:text-slate-200'>
            <span>Order Id: {_id.slice(-8)}</span>
            <span>Total: ${amount_paid}</span>
        </div>
        <div className='flex justify-between text-sm m-2 dark:text-slate-200'>
            <span>Items: {quantity}</span>
            <span>Date: {orderDate}</span>
        </div>

        <div className='flex flex-wrap justify-between max-w-4xl m-auto p-2 my-5'>
            {cartList && cartList.length > 0 && cartList.map((item, index) => (
                <div key={index} className='flex mb-3'>
                    <Link to={`/products/${item.id}`}>
                        <img 
                            src={item.poster} 
                            alt={item.name} 
                            className='w-32 h-20 object-cover rounded'
                        />
                    </Link>

                    <div className='ml-3'>
                        <Link to={`/products/${item.id}`}>
                            <p className='text-lg dark:text-slate-200 hover:text-blue-600'>
                                {item.name}
                            </p>
                        </Link>

                        <div className='text-lg font-semibold dark:text-slate-200'>
                            <span>${item.price}</span>                    
                        </div>
                        <div className='text-sm text-gray-600 dark:text-slate-400'>
                            <span>Rating: {item.rating}/5</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      
    </div>
  )
}

export default DashboardCard
