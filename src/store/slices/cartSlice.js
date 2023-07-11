import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            state.items.push({ ...newItem, quantity: 1 });
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter(item => item.id !== itemId);
        },
        clearCart: (state) => {
            state.items = [];
        },
        increaseQuantity: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.map(item => {
              if (item.id === itemId) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            })
        },
        decreaseQuantity: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.map(item => {
              if (item.id === itemId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
              }
              return item;
            })
        },
    }
})

export const {addItem, removeItem, clearCart, increaseQuantity, decreaseQuantity} = cartSlice.actions;
export default cartSlice.reducer;