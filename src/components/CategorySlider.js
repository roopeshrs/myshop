import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setCategories, setSelectedCategory } from '../store/slices/productsSlice';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel';

const CategorySlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(store => store.products.categories);

  useEffect(()=>{
    fetchCategories();
  }, [])

  const fetchCategories = async () => {
    const response = await fetch('https://dummyjson.com/products/categories');
    const json = await response.json();
    dispatch(setCategories(json));
  }

  const handleCategoryClick = async (category) => {
    dispatch(setSelectedCategory(category));
    navigate(`/products/category/${category}`);
  }

  return (
    <div>
        <Carousel items={categories} handleCategoryClick={handleCategoryClick} />
    </div>
  )
}

export default CategorySlider