import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setSelectedCategory } from '../store/slices/productsSlice';
import CategorySlider from '../components/CategorySlider';
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(store => store.products.products);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const limit = 12;
  
  useEffect(()=>{
    fetchProducts();
  }, [skip])

  const fetchProducts = async () => {
    const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    const json = await response.json();
    dispatch(setProducts(json.products));
    dispatch(setSelectedCategory('all'));
    setLoading(false);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll)

    return () => {
      window.removeEventListener('scroll', handleInfiniteScroll)
    }
  }, [])

  const handleInfiniteScroll = async () => {
    try{
      let documentHeight = document.documentElement.scrollHeight;
      let viewportHeight = window.innerHeight;
      let scrolledHeight = document.documentElement.scrollTop;
      if(viewportHeight + scrolledHeight + 1 >= documentHeight){
        setLoading(true);
        // setSkip((prev) => prev + limit);
        setSkip((prev) => {
          const newSkip = prev + limit;
          if(prev > 90){
            window.removeEventListener('scroll', handleInfiniteScroll)
          }
          return newSkip;
        });
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className='px-16 md:px-4 py-8 flex flex-col gap-12'>
        <CategorySlider />
        <div className='flex flex-wrap justify-start'>
              {products?.map(product => (
                <div key={product.id} className='w-3/12 xl:w-4/12 lg:w-6/12 sm:w-full px-2'>
                  <Link to={`/products/${product.id}`} >
                    <ProductCard product={product} />
                  </Link>
                </div>
              ))}
        </div>
        {
          loading && (
            <div className='flex justify-center'>
              <CircularProgress sx={{color: '#fb641b'}} />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Home