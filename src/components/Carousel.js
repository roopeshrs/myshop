import React, {useState, useEffect} from 'react'
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';

const Carousel = ({items, handleCategoryClick}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  const goToNextSlide = () => {
    const lastIndex = items.length - 1;
    const newIndex = currentIndex + itemsPerSlide > lastIndex ? lastIndex : currentIndex + itemsPerSlide;
    if(newIndex === lastIndex) return;
    setCurrentIndex(newIndex);
  }

  const goToPrevSlide = () => {
    const newIndex = currentIndex - itemsPerSlide < 0 ? 0 : currentIndex - itemsPerSlide;
    setCurrentIndex(newIndex);
  }

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerSlide).map((item, index) => (
    <div key={index} className='border border-gray-400 py-1 px-2 rounded-lg shadow-lg cursor-pointer' onClick={() => handleCategoryClick(item)}>
      {item}
    </div>
  ))

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setItemsPerSlide(4);
      } else if (window.innerWidth >= 768) {
        setItemsPerSlide(3);
      } else {
        setItemsPerSlide(2);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='flex items-center justify-between'>
      <button className="carousel-button prev" onClick={goToPrevSlide}>
        <ArrowCircleLeftRoundedIcon style={{fontSize: '40px', color: '#fb641b'}} />
      </button>
      <div className='flex items-center justify-evenly flex-1'>
        {visibleItems}
      </div>
      <button className="carousel-button next" onClick={goToNextSlide}>
        <ArrowCircleRightRoundedIcon style={{fontSize: '40px', color: '#fb641b'}} />
      </button>
    </div>
  )
}

export default Carousel