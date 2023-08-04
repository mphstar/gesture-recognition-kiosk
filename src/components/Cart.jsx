import React from 'react'
import { BsCartCheck } from 'react-icons/bs'
import CartItem from './CartItem'

const Cart = () => {
  return (
    <div className='w-full h-full flex flex-col py-8 px-6'>
        {/* Cart */}
        <div className='flex flex-col flex-grow w-full overflow-y-auto px-4 mb-4'>
            <p><BsCartCheck className='h-12 w-full' /></p>
            <p className='text-center font-semibold text-xl py-2'>Your Cart</p>
            <div className='grid grid-cols-1 w-full mt-4 h-fit mb-4 gap-3'>
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
            </div>
        </div>
        {/* Bottom */}
        <div className='w-full h-fit'>
            <div className='w-full h-fit items-center flex justify-center bg-orange-500 rounded-lg px-4 py-4 text-white cursor-pointer font-bold text-center'>
                Pay!
            </div>
        </div>
    </div>
  )
}

export default Cart