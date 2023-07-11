import React, {useEffect} from 'react'
import CartCard from '../components/CartCard';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/slices/cartSlice';
import { clearProducts, setSelectedCategory } from '../store/slices/productsSlice';

const Cart = () => {
  const cartItems = useSelector(store => store.cart.items)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(clearProducts());
    dispatch(setSelectedCategory(null));
  })
  const handleClearCart = () => {
    dispatch(clearCart())
  }
  const calculateTotal = () => {
    const total = cartItems.reduce((accumulator, item) => {
      return accumulator + item.quantity * item.price;
    }, 0)
    return total.toFixed(2);
  }
  const total = calculateTotal();
  if(cartItems.length === 0){
    return <div className='text-4xl flex justify-center py-8'>your cart is empty</div>
  }
  return (
        <div className='flex flex-col gap-8 px-16 md:px-4 py-8'>
          <h2 className='font-semibold uppercase text-xl'>My Cart {`(${cartItems.length})`}</h2>
          <div className='flex xl:flex-col justify-between gap-4'>
            <div className='flex-1'>
              <div className='flex justify-end'>
                <button className='w-fit text-sm uppercase bg-[#fb641b] py-1 px-2 rounded-lg text-white' onClick={handleClearCart}>clear cart</button>
              </div>
              {cartItems.map(cartItem => <CartCard key={cartItem.id} cartItem={cartItem} />)}
            </div>
            <div className='w-96 lg:w-full uppercase font-semibold flex flex-col gap-4 border rounded-lg h-fit'>
              <h3 className='border-b py-4 pl-4'>price details</h3>
              <div className='px-4 flex flex-col gap-2 border-b pb-4'>
                <p>total price: &#8377; {total}</p>
                <p>discount: &#8377; 0</p>
                <p>delivery charges: <span className='text-[#fb641b]'>free</span></p>
              </div>
              <p className='pl-4 text-xl'>total: {total}</p>
              <div className='p-4'>
                <button className='w-full text-xl uppercase font-semibold bg-[#fb641b] py-4 rounded-lg text-white'>place order</button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Cart