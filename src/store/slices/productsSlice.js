import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        originalProducts: [],
        products: [],
        categories: [],
        selectedCategory: null,
        selectedProduct: null,
        sortBy: null,
        minRating: 0,
        minPrice: 0
    },
    reducers: {
        setProducts: (state, action) => {
            if(state.selectedCategory === 'all'){
                state.products.push(...action.payload)
                state.originalProducts.push(...action.payload)
            } else {
                state.products = action.payload;
                state.originalProducts = action.payload;
            }
        },
        clearProducts: (state) => {
            state.products = [];
            state.originalProducts = [];
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
            if (action.payload === 'lowToHigh'){
                state.products.sort((a, b) => a.price - b.price);
            } else if (action.payload === 'highToLow'){
                state.products.sort((a, b) => b.price - a.price);
            }
        },
        setMinRating: (state, action) => {
            state.minRating = action.payload;
            let filterdProducts;
            filterdProducts = state.originalProducts.filter(product => product.rating >= state.minRating)
            if(state.sortBy != null || state.minPrice !=0){
                filterdProducts = filterdProducts.filter(product => product.price >= state.minPrice)
                if (state.sortBy === 'lowToHigh'){
                    filterdProducts.sort((a, b) => a.price - b.price);
                } else if (state.sortBy === 'highToLow'){
                    filterdProducts.sort((a, b) => b.price - a.price);
                }
            }
            state.products = filterdProducts;
        },
        setMinPrice: (state, action) => {
            state.minPrice = action.payload;
            let filterdProducts;
            filterdProducts = state.originalProducts.filter(product => product.price >= state.minPrice)
            if(state.sortBy != null || state.minRating !=0){
                filterdProducts = filterdProducts.filter(product => product.rating >= state.minRating)
                if (state.sortBy === 'lowToHigh'){
                    filterdProducts.sort((a, b) => a.price - b.price);
                } else if (state.sortBy === 'highToLow'){
                    filterdProducts.sort((a, b) => b.price - a.price);
                }
            }
            state.products = filterdProducts;
        },
        clearFilter: (state) => {
            state.sortBy = null;
            state.minRating = 0;
            state.minPrice = 0;
            state.products = state.originalProducts;
        }
    }
})

export const {setProducts, clearProducts, setCategories, setSelectedCategory, setSelectedProduct, setSortBy, setMinRating, setMinPrice, clearFilter} = productsSlice.actions;
export default productsSlice.reducer;