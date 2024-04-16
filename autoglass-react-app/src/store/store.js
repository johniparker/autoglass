import { configureStore } from '@reduxjs/toolkit';
import quoteReducer from '../reducers/quoteSlice';

const store = configureStore({
  reducer: {
    quote: quoteReducer,
    // Add other reducers here if needed
  },
});

export default store;
