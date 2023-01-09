import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { recipe } from "../../types/TRecipe";

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
      const recipe = axios
        .get<recipe[]>("http://acefood/acefood.ru/recipes")
        .then((resp) => resp.data);
      return recipe;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
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
      state.error = "Server error";
    });
  },
});

export default recipeSlice.reducer;
