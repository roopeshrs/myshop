import React, {useState} from 'react'
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';

const ImgCarousel = ({items, handleImageClick}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;

  const goToNextSlide = () => {
    const lastIndex = items.length - 1;
    const newIndex = currentIndex + itemsPerSlide > lastIndex ? lastIndex : currentIndex + itemsPerSlide;
    setCurrentIndex(newIndex);
  }

  const goToPrevSlide = () => {
    const newIndex = currentIndex - itemsPerSlide < 0 ? 0 : currentIndex - itemsPerSlide;
    setCurrentIndex(newIndex);
  }

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerSlide).map((item, index) => (
    <div key={index} className='border border-gray-400 p-1 shadow-lg cursor-pointer' onClick={() => handleImageClick(item)}>
      <div className='w-20 h-20'>
        <img src={item} className='w-full h-full object-contain'/>
      </div>
    </div>
  ))

  return (
    <div className='flex items-center justify-between w-full'>
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

export default ImgCarousel