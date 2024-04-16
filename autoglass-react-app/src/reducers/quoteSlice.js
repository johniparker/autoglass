import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  quotes: []
};

const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    addQuote: (state, action) => {
      const newQuote = {
        id: uuidv4(), // Generate a UUID
        ...action.payload
      };
      state.quotes.push(newQuote);
    },
    getQuotes: (state) => {
      return state;
    },
    getQuote: (state, action) => {
      const quoteId = action.payload;
      const quote = state.quotes.find(quote => quote.id === quoteId);
      return quote ? quote : state;
    },
    editQuote: (state, action) => {
      const { id, updatedQuote } = action.payload;
      const updatedQuotes = state.quotes.map(quote =>
        quote.id === id ? updatedQuote : quote
      );
      state.quotes = updatedQuotes;
    },
  },
});

export const { addQuote, getQuotes, getQuote, editQuote } = quoteSlice.actions;
export default quoteSlice.reducer;
