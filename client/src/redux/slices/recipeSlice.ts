import { recipe } from "./../../types/TRecipe";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../http/axios-client";

interface recipeSliceState {
  recipes: recipe[];
  recipe: recipe;
  loading: boolean;
  error: null | string;
}

const initialState: recipeSliceState = {
  recipes: [],
  recipe: {} as recipe,
  loading: false,
  error: null,
};

export const fetchRecipes = createAsyncThunk<recipe[]>(
  "recipes/fetchRecipes",
  async (_, { rejectWithValue }) => {
    try {
      const recipes = await axiosClient.get<recipe[]>("/recipes").then((resp) => resp.data);
      return recipes;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchRecipeById = createAsyncThunk<recipe, string>(
  "recipes/fetchRecipe",
  async (recipeId, { rejectWithValue }) => {
    try {
      const recipe = await axiosClient
        .get<recipe>(`/recipes/${recipeId}`)
        .then((response) => response.data);
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
    builder.addCase(fetchRecipeById.pending, (state) => {
      state.loading = true;
      state.error = "Ошибка сервера";
    });
    builder.addCase(fetchRecipeById.fulfilled, (state, action) => {
      state.recipe = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchRecipeById.rejected, (state) => {
      state.error = "Ошибка сервера!";
      state.loading = false;
    });
  },
});

export const { setRecipes } = recipeSlice.actions;
export default recipeSlice.reducer;
