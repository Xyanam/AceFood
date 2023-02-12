import { recipe } from "./../../types/TRecipe";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import axiosClient from "../../http/axios-client";

interface recipeSliceState {
  recipes: recipe[];
  loading: boolean;
  error: null | string;
}

const initialState: recipeSliceState = {
  recipes: [],
  loading: false,
  error: null,
};

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async function (_, { rejectWithValue }) {
    try {
      const recipe = axiosClient.get("/recipes").then((resp) => resp.data);
      return recipe;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes(state, action: PayloadAction<recipe[]>) {
      state.recipes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.recipes = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchRecipes.rejected, (state) => {
      state.loading = false;
      state.error = "Ошибка сервера!";
    });
  },
});

export const { setRecipes } = recipeSlice.actions;
export default recipeSlice.reducer;
