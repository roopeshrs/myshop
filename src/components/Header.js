import React from 'react'
import Search from './Search'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const cartItems = useSelector(store => store.cart.items)
  return (
    <div className='flex md:flex-col md:gap-4 items-center justify-between shadow-lg py-2 px-16 md:px-4'>
        <div className='w-1/4 md:w-full md:text-center'>
            <Link to={'/'}><h1 className='text-3xl font-semibold cursor-pointer text-[#fb641b]'>MyShop</h1></Link>
        </div>
        <div className='flex-1 md:w-full md:order-3'>
            <Search />
        </div>
        <div className='w-1/4 md:w-full md:order-2'>
            <ul className='flex items-center justify-end'>
                <li>
                    <Link to={'/cart'}>
                        <div className='border border-gray-400 rounded-full p-1 cursor-pointer w-fit relative'>
                            <LocalMallOutlinedIcon />
                            {
                                cartItems.length > 0 && (
                                    <div className='absolute -top-2 -right-2 text-[#fb641b] text-sm font-bold'>
                                        {cartItems.length}
                                    </div>
                                )
                            }
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Header