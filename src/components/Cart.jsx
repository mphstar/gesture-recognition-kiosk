import React, { useContext, useState } from 'react'
import { BsCartCheck } from 'react-icons/bs'
import CartItem from './CartItem'
import ItemContext from '../utils/ItemContext,js'

const Cart = () => {
  const [DataCart, SetDataCart] = useContext(ItemContext)

  return (
    <div className='w-full h-full flex flex-col py-8 lg:px-6'>
        {/* Cart */}
        <div className='flex flex-col flex-grow w-full overflow-y-auto px-4 mb-4'>
            <p><BsCartCheck className='h-12 w-full' /></p>
            <p className='text-center font-semibold text-xl py-2'>Your Cart</p>
            <div className='grid grid-cols-1 w-full mt-4 h-fit mb-4 gap-3'>
                {DataCart.map((value, index) => {
                    return (
                        <CartItem name={value.name} price={value.price} key={index} qty={1} image={value.image} />
                    )
                })}
            </div>
        </div>
        {/* Bottom */}
        <div className='w-full h-fit px-4'>
            <div className='w-full h-fit items-center flex justify-center bg-orange-500 rounded-lg px-4 py-4 text-white cursor-pointer font-bold text-center'>
                Pay!
            </div>
        </div>
    </div>
  )
}

export default Cart