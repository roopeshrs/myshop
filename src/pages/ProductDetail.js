import React, {useState, useEffect} from 'react'
import StarIcon from '@mui/icons-material/Star';
import { useParams, useNavigate } from 'react-router-dom';
import Error from './Error';
import { addItem } from '../store/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import ImgCarousel from '../components/ImgCarousel';
import CircularProgress from '@mui/material/CircularProgress';
import { setSelectedProduct, clearProducts, setSelectedCategory } from '../store/slices/productsSlice';

const ProductDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {id} = params;
  const dispatch = useDispatch();
  const cartItems = useSelector(store => store.cart.items);
  const itemId = parseInt(id);
  const isItemInCart = cartItems.some(cartItem => cartItem.id === itemId);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    dispatch(clearProducts());
    dispatch(setSelectedCategory(null));
    fetchProductDetails();
    return () => {
      dispatch(setSelectedProduct(null));
    }
  }, [id])
  const fetchProductDetails = async () => {
    try{
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const json = await response.json();
      setProduct(json);
      setImage(json.thumbnail);
      dispatch(setSelectedProduct(json));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message)
    }
  }
  const handleAddItem = () => {
    dispatch(addItem(product))
    navigate('/cart');
  }
  const handleImageClick = (image) => {
    setImage(image);
  }
  if(error){
    return <Error msg={'incorrect product id'} />
  }
  return (
      <>
        {
          loading ? (
            <div className='flex justify-center'>
              <CircularProgress sx={{color: '#fb641b'}} />
            </div>
          ) : (
            <div className='px-16 md:px-4 py-8 flex lg:flex-col gap-8'>
              <div className='flex flex-col items-center gap-2'>
                <div className='w-[500px] border border-gray-400 h-96'>
                  <img src={image} alt='product-image' className='h-full w-full object-contain'/>
                </div>
                {product && <ImgCarousel items={product?.images} handleImageClick={handleImageClick} />}
              </div>
              <div className='flex-1 flex flex-col gap-4'>
                <h2 className='text-4xl font-semibold'>{product?.title}</h2>
                <p>{product?.description}</p>
                <p><span className='font-bold uppercase text-sm'>category:</span> {product?.category}</p>
                <p><span className='font-bold uppercase text-sm'>brand:</span> {product?.brand}</p>
                <p><span className='font-bold uppercase text-sm'>stock:</span> {product?.stock}</p>
                <div className='flex items-center gap-1'>
                  <p className='font-bold uppercase text-sm'>rating:</p> 
                  <div className='flex items-center gap-1'><StarIcon className='text-yellow-600' /> {product?.rating}</div>
                </div>
                <p className='text-4xl font-semibold'>&#8377; {product?.price}</p>
                {isItemInCart ? (
                  <button className='text-2xl uppercase font-semibold bg-[#fb641b] py-3 rounded-lg text-white max-w-sm' onClick={() => navigate('/cart')}>go to cart</button>
                ) : (
                  <button className='text-2xl uppercase font-semibold bg-[#fb641b] py-3 rounded-lg text-white max-w-sm' onClick={handleAddItem}>add to cart</button>
                )}
              </div>
            </div>
          )
        }
      </>
  )
}

export default ProductDetail