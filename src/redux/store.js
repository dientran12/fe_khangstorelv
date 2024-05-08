import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slides/categorySlide';
import userReducer from './slides/userSlide';
import cartReducer from './slides/cartSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    user: userReducer,
    cart: cartReducer
  },
});

