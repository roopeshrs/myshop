import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import ProductCard from '../components/ProductCard';

const SearchResult = () => {
    const params = useParams();
    const {s} = params;
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState([]);
    useEffect(()=>{
      getSearchResult();
    }, [])
    const getSearchResult = async () => {
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/products/search?q=${s}`);
      const json = await response.json();
      setResult(json.products);
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
            <div className='flex flex-wrap justify-start'>
              {result?.map(item => (
                <div key={item.id} className='w-3/12 xl:w-4/12 lg:w-6/12 sm:w-full px-2'>
                  <Link to={`/products/${item.id}`}>
                    <ProductCard product={item} />
                  </Link>
                </div>
              ))}
            </div>
          )
        }
      </div>
    )
}

export default SearchResult