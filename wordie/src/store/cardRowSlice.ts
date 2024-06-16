import { createSlice } from "@reduxjs/toolkit";

export enum LetterCardStatus {
  unrevealed = "unrevealed",
  correct = "correct",
  incorrect = "incorrect",
  misplaced = "misplaced",
}

export interface LetterCard {
  letter: string;
  status: LetterCardStatus;
}

export interface CardSlice {
  word: LetterCard[];
}

const initialState: CardSlice = {
  word: [],
};

export const cardRowSlice = createSlice({
  name: "cardRow",
  initialState,
  reducers: {
    addLetter: (state, action) => {
      if (state.word.length < 5) {
        state.word.push({
          letter: action.payload,
          status: LetterCardStatus.unrevealed,
        });
        console.log(state.word.length);
      }
    },
    removeLetter: (state) => {
      state.word.pop();
    },
    clearWord: (state) => {
      state.word = [];
    },
    setLetterStatus: (state, action) => {
      console.log(action.payload.status);

      state.word[action.payload.index].status = action.payload.status;
    },
  },
});

export const { addLetter, removeLetter, clearWord, setLetterStatus } =
  cardRowSlice.actions;

export default cardRowSlice.reducer;
