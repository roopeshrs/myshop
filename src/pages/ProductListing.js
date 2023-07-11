import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Filter from '../components/Filter';
import { setProducts } from '../store/slices/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

const ProductListing = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const {category} = params;
  const products = useSelector(store => store.products.products);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    fetchProducts();
  }, [])
  const fetchProducts = async () => {
    setLoading(true);
    const response = await fetch(`https://dummyjson.com/products/category/${category}`);
    const json = await response.json();
    dispatch(setProducts(json.products));
    setLoading(false);
  }
  return (
    <div>
      {
        loading ? (
          <div className='flex justify-center'>
              <CircularProgress sx={{color: '#fb641b'}} />
          </div>
        ) : (
        <div className='flex sm:flex-col'>
          <Filter />
          <div className='flex flex-wrap justify-start flex-1 sm:px-4'>
            {products?.length === 0 && <div className='text-4xl flex justify-center py-8 w-full'>There are no products</div>}
            {products?.map(product => (
              <div key={product.id} className='w-4/12 lg:w-6/12 sm:w-full px-2'>
                <Link to={`/products/${product.id}`}>
                  <ProductCard product={product} />
                </Link>
              </div>
            ))}
          </div>
        </div>
        )
      }
    </div>
  )
}

export default ProductListing