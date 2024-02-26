// postsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [], // Initial state is an empty array of posts
};

const postsSlice = createSlice({
  name: 'posts', // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducers to handle actions
    addPost: (state, action) => {
      // Add a new post to the posts array
      state.posts.push(action.payload);
    },
    // You can add more reducers here for other actions like deletePost, editPost, etc.
  },
});

// Export the action creators
export const { addPost } = postsSlice.actions;

// Export the reducer
export default postsSlice.reducer;
