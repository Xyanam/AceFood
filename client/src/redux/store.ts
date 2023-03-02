import commentsSlice from "./slices/commentsSlice";
import userSlice from "./slices/userSlice";
import recipeSlice from "./slices/recipeSlice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    recipes: recipeSlice,
    user: userSlice,
    comment: commentsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
