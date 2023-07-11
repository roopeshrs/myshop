import React, {useState, useEffect} from 'react'
import { setSortBy, setMinRating, setMinPrice, clearFilter } from '../store/slices/productsSlice'
import { useDispatch, useSelector } from 'react-redux'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

const Filter = () => {
  const dispatch = useDispatch();
  const [isFilterVisible, setFilterVisibility] = useState(true);
  const [isFilterIconVisible, setFilterIconVisibility] = useState(false);
  const [price, setPrice] = useState(0);
  const minRating = useSelector(store => store.products.minRating);
  const [defaultRatingFocus, setDefaultRatingFocus] = useState(false);
  const [selectedSort, setSelectedSort] = useState('');
  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSelectedSort(selectedSort);
    dispatch(setSortBy(selectedSort));
  }
  const handleRatingChange = (event) => {
    const minRating = event.target.value;
    dispatch(setMinRating(minRating));
  }
  const handleSliderChange = (event) => {
    setPrice(event.target.value);
    dispatch(setMinPrice(parseInt(event.target.value)));
  }
  const toggleFilter = () => {
    setFilterVisibility(!isFilterVisible);
  }
  const handleClear = () => {
    dispatch(clearFilter());
    setPrice(0);
    setSelectedSort('');
  }
  useEffect(() => {
    const handleResize = () => {
        if(window.innerWidth <= 639){
            setFilterIconVisibility(true)
            setFilterVisibility(false)
        }else{
            setFilterIconVisibility(false)
            setFilterVisibility(true)
        }
    }
    window.addEventListener('resize', handleResize)
    return () => {
        window.removeEventListener('resize', handleResize)
        dispatch(setSortBy(null));
        dispatch(setMinRating(0));
        dispatch(setMinPrice(0));
    }
  }, [])

  const handleDefaultRatingFocus = () => {
    setDefaultRatingFocus(true);
  }

  const handleDefaultRatingBlur = () => {
    setDefaultRatingFocus(false);
  }
  return (
    <div className='flex flex-col w-64 xl:w-60 lg:w-56 md:w-48 sm:w-full p-2 sm:px-4 uppercase gap-8 mb-12'>
        <div className='border-b-2 border-[#fb641b] flex items-center justify-between py-2'>
            <h3 className='font-bold'>
                Filter 
                {isFilterIconVisible && (
                    isFilterVisible ? 
                    <KeyboardArrowUpRoundedIcon onClick={toggleFilter} className='cursor-pointer' sx={{fontSize: '30px'}} /> : 
                    <KeyboardArrowDownRoundedIcon onClick={toggleFilter} className='cursor-pointer' sx={{fontSize: '30px'}} />
                )}
            </h3>
            <button className='uppercase bg-gray-200 px-2 py-1 rounded-lg text-sm font-semibold' onClick={handleClear}>clear</button>
        </div>
        {
            isFilterVisible && (
                <div className='flex flex-col gap-8'>
                    <div className='relative'>
                        <h4 className='font-semibold'>price</h4>
                        <input type='range' min={0} max={1000} step={200} value={price} onChange={handleSliderChange} className='w-full h-1 rounded-md bg-[#fb641b] appearance-none' />
                        <div className='flex justify-between text-xs absolute w-full -bottom-4 left-3'>
                            <span>0</span>
                            <span>200</span>
                            <span>400</span>
                            <span>600</span>
                            <span>800</span>
                            <span>1000+</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h4 className='font-semibold'>ratings</h4>
                        <ul className='text-sm flex flex-col gap-2'>
                            <li className='flex items-center gap-1'>
                                <input type='radio' id='fourFiveStar' name='rating' value='4.5' onChange={handleRatingChange} className='w-5 h-5 relative before:content-[""] checked:before:bg-[#fb641b] before:absolute before:top-1 before:left-1 before:w-3 before:h-3 before:rounded-full'/> 
                                <label htmlFor='fourFiveStar'>4.5 star & above</label>
                            </li>
                            <li className='flex items-center gap-1'>
                                <input type='radio' id='fourStar' name='rating' value='4' onChange={handleRatingChange} className='w-5 h-5 relative before:content-[""] checked:before:bg-[#fb641b] before:absolute before:top-1 before:left-1 before:w-3 before:h-3 before:rounded-full'/> 
                                <label htmlFor='fourStar'>4 star & above</label>
                            </li>
                            <li className='flex items-center gap-1'>
                                <input type='radio' id='threeStar' name='rating' value='3' onChange={handleRatingChange} className='w-5 h-5 relative before:content-[""] checked:before:bg-[#fb641b] before:absolute before:top-1 before:left-1 before:w-3 before:h-3 before:rounded-full'/> 
                                <label htmlFor='threeStar'>3 star & above</label>
                            </li>
                            <li className='flex items-center gap-1'>
                                <input type='radio' id='twoStar' name='rating' value='2' onChange={handleRatingChange} className='w-5 h-5 relative before:content-[""] checked:before:bg-[#fb641b] before:absolute before:top-1 before:left-1 before:w-3 before:h-3 before:rounded-full'/> 
                                <label htmlFor='twoStar'>2 star & above</label>
                            </li>
                            <li className='flex items-center gap-1'>
                                <input checked={minRating === 0 || defaultRatingFocus} onFocus={handleDefaultRatingFocus} onBlur={handleDefaultRatingBlur} type='radio' id='oneStar' name='rating' value='1' onChange={handleRatingChange} className='w-5 h-5 relative before:content-[""] checked:before:bg-[#fb641b] before:absolute before:top-1 before:left-1 before:w-3 before:h-3 before:rounded-full'/> 
                                <label htmlFor='oneStar'>1 star & above</label>
                            </li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h4 className='font-semibold'>sort by</h4>
                        <ul className='text-sm flex flex-col gap-2'>
                            <li className='flex items-center gap-1'>
                                <input checked={selectedSort === 'highToLow'} type='radio' id='highToLow' name='sort' value='highToLow' onChange={handleSortChange} className='w-5 h-5 relative before:content-[""] checked:before:bg-[#fb641b] before:absolute before:top-1 before:left-1 before:w-3 before:h-3 before:rounded-full'/> 
                                <label htmlFor='highToLow'>High to Low</label>
                            </li>
                            <li className='flex items-center gap-1'>
                                <input checked={selectedSort === 'lowToHigh'} type='radio' id='lowToHigh' name='sort' value='lowToHigh' onChange={handleSortChange} className='w-5 h-5 relative before:content-[""] checked:before:bg-[#fb641b] before:absolute before:top-1 before:left-1 before:w-3 before:h-3 before:rounded-full'/> 
                                <label htmlFor='lowToHigh'>Low to High</label>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default Filter