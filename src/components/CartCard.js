import React from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import { removeItem, increaseQuantity, decreaseQuantity } from '../store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const CartCard = ({cartItem}) => {
  const dispatch = useDispatch();
  const handleRemoveItem = () => {
    dispatch(removeItem(cartItem.id));
  }
  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(cartItem.id));
  }
  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(cartItem.id));
  }
  return (
    <div className='flex items-center gap-8 border-b py-2'>
        <div className='w-28 h-28'>
            <img src={cartItem.thumbnail} alt='product-image' className='w-full h-full object-contain'/>
        </div>
        <div className='flex sm:flex-col items-center sm:items-start justify-between flex-1 sm:gap-4'>
            <Link to={`/products/${cartItem.id}`}><h3 className='text-lg'>{cartItem?.title?.length >= 18 ? cartItem?.title?.slice(0, 18) + "..." : cartItem?.title}</h3></Link>
            <div className='flex items-center gap-8'>
                <div className='flex items-center gap-2'>
                    <KeyboardArrowUpIcon className={`cursor-pointer ${cartItem.quantity === 1 && 'cursor-default text-gray-400'}`} onClick={handleDecreaseQuantity} />
                    <p className='bg-gray-300 py-1 px-3'>{cartItem.quantity}</p>
                    <KeyboardArrowDownIcon className='cursor-pointer' onClick={handleIncreaseQuantity} />
                </div>
                <p className='font-semibold whitespace-nowrap'>&#8377; {cartItem.price*cartItem.quantity}</p>
                <CloseIcon onClick={handleRemoveItem} className='text-red-600 cursor-pointer'/>
            </div>
        </div>
    </div>
  )
}

export default CartCard