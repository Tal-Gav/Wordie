import { configureStore } from "@reduxjs/toolkit";
import cardRowReducer from "./cardRowSlice";
import bannedLettersReducer from "./bannedLetters";
export const store = configureStore({
  reducer: {
    cardRow: cardRowReducer,
    bannedLetters: bannedLettersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
