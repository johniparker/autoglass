// store.js
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postSlice'; // Adjust the path as necessary

const store = configureStore({
  reducer: {
    posts: postsReducer, // Add the posts slice reducer here
  },
});

export default store;
