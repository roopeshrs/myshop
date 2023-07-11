import React,{useState, useEffect} from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => getSearchSuggestions(), 200);
    return ()=>{
      clearTimeout(timer);
    }
  }, [searchQuery])

  const getSearchSuggestions = async () => {
    const response = await fetch(`https://dummyjson.com/products/search?limit=10&q=${searchQuery}`);
    const json = await response.json();
    setSearchResult(json.products);
  }

  const handleMouseDown = () => {
    setShowSuggestion(true);
  }

  const handleLinkClick = (id) => {
    setShowSuggestion(false);
    navigate(`/products/${id}`);
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      setShowSuggestion(false);
      navigate(`/search/${searchQuery}`);
    }
  }

  const handleSearchClick = () => {
    setShowSuggestion(false);
    navigate(`/search/${searchQuery}`);
  }

  return (
    <div className='border border-gray-400 rounded-2xl py-2 px-4 flex items-center gap-1 relative'>
        <input className='outline-none text-xl flex-1' type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onMouseDown={handleMouseDown} onKeyDown={handleKeyDown} />
        <SearchOutlinedIcon className='cursor-pointer' onClick={handleSearchClick} />
        {showSuggestion && (
          <ul className='absolute top-[110%] left-0 rounded-lg shadow-lg bg-white w-full'>
            {searchResult.map(result => 
              <li key={result.id} className='p-2 font-semibold cursor-pointer hover:bg-gray-100 flex gap-5' onClick={()=>handleLinkClick(result.id)}>
                <div className='w-12 h-12'>
                  <img src={result.thumbnail} alt='product-image' className='w-full h-full object-contain'/>
                </div>
                <div>
                  <p>{result.title}</p>
                  <p className='text-sm text-[#fb641b]'>in <span className='font-bold'>{result.category}</span></p>
                </div>
              </li>
            )}
          </ul>
        )}
    </div>
  )
}

export default Search