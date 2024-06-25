import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LetterCardStatus } from "../constants";

export interface LetterCard {
  letter: string;
  status: LetterCardStatus;
}

export interface CardSlice {
  rows: LetterCard[][];
}

const initialState: CardSlice = {
  rows: Array.from({ length: 6 }, () => []),
};

export const cardRowSlice = createSlice({
  name: "cardRow",
  initialState,
  reducers: {
    addLetter: (
      state,
      action: PayloadAction<{ rowIndex: number; letter: string }>
    ) => {
      const { rowIndex, letter } = action.payload;
      if (state.rows[rowIndex].length < 5) {
        state.rows[rowIndex].push({
          letter: letter,
          status: LetterCardStatus.unrevealed,
        });
      }
    },
    removeLetter: (state, action: PayloadAction<{ rowIndex: number }>) => {
      const { rowIndex } = action.payload;
      state.rows[rowIndex].pop();
    },

    setLetterStatus: (
      state,
      action: PayloadAction<{
        rowIndex: number;
        letterIndex: number;
        status: LetterCardStatus;
      }>
    ) => {
      const { rowIndex, letterIndex, status } = action.payload;

      state.rows[rowIndex][letterIndex].status = status;
    },
  },
});

export const { addLetter, removeLetter, setLetterStatus } =
  cardRowSlice.actions;

export default cardRowSlice.reducer;
