import { createSlice } from "@reduxjs/toolkit";

export interface CardSlice {
  word: string;
}

const initialState: CardSlice = { word: "" };

export const cardRowSlice = createSlice({
  name: "cardRow",
  initialState,
  reducers: {
    addLetter: (state, action) => {
      if (state.word.length < 5) {
        state.word += action.payload;
      }
    },
    removeLetter: (state) => {
      state.word = state.word.slice(0, -1);
    },
  },
});

export const { addLetter, removeLetter } = cardRowSlice.actions;

export default cardRowSlice.reducer;
