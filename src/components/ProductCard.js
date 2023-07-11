import React from 'react'
import StarIcon from '@mui/icons-material/Star';

const ProductCard = ({product}) => {
  return (
    <div className='w-full shadow-xl border rounded-lg p-2 flex flex-col gap-2 cursor-pointer mb-12'>
        <div className='w-full h-56 border-b'>
            <img src={product?.thumbnail} alt='product-image' className='w-full h-full object-contain'/>
        </div>
        <div className='text-lg flex flex-col gap-2'>
            <h5 className='font-semibold'>{product?.title?.length >= 22 ? product?.title?.slice(0, 22) + "..." : product?.title}</h5>
            <div className='flex items-center justify-between'>
              <p className='text-[#fb641b] font-bold'>&#8377; {product?.price}</p>
              <p className='flex items-center gap-1'><StarIcon className='text-yellow-600' /> {product?.rating}</p>
            </div>
        </div>
    </div>
  )
}

export default ProductCard