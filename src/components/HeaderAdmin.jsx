import React, { useContext } from 'react'
import { HiBars3 } from "react-icons/hi2";
import AdminContext from '../utils/AdminContext';

const HeaderAdmin = () => {
    const {IsShow, SetIsShow} = useContext(AdminContext)
  return (
    <div className='flex flex-row items-center gap-3'>
        <div onClick={() => SetIsShow(true)} className='md:hidden p-2'><HiBars3 /></div>
        <div>Dashboard</div>
    </div>
  )
}

export default HeaderAdmin