import { createSlice } from "@reduxjs/toolkit";
interface BannedLetters {
  bannedLetters: string[];
}
const initialState: BannedLetters = {
  bannedLetters: [],
};

export const bannedLettersSlice = createSlice({
  name: "bannedLetters",
  initialState,
  reducers: {
    addBannedLetter: (state, action) => {
      state.bannedLetters.push(action.payload);
    },
  },
});

export const { addBannedLetter } = bannedLettersSlice.actions;

export default bannedLettersSlice.reducer;
