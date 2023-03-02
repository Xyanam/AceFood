import { recipe } from "./../../types/TRecipe";
import { Ingredient } from "../../types/TIngredient";
import { IComments } from "../../types/IComments";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../http/axios-client";
import RecipeService from "../../services/RecipeService";

interface recipeSliceState {
  recipes: recipe[];
  recipe: recipe;
  ingredients: Ingredient[];
  comments: IComments[];
  loading: boolean;
  error: null | string;
}

const initialState: recipeSliceState = {
  recipes: [],
  recipe: {} as recipe,
  ingredients: [],
  comments: [],
  loading: false,
  error: null,
};

export const fetchRecipes = createAsyncThunk<recipe[]>(
  "recipes/fetchRecipes",
  async (_, { rejectWithValue }) => {
    try {
      const recipes = await RecipeService.getRecipes();
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

export const fetchIngredientsByRecipe = createAsyncThunk<Ingredient[], string>(
  "recipes/fetchIngredient",
  async (recipeId, { rejectWithValue }) => {
    try {
      const ingredients = await axiosClient
        .get<Ingredient[]>(`/recipes/${recipeId}/ingredients`)
        .then((response) => response.data);
      return ingredients;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCommentsByRecipe = createAsyncThunk<IComments[], string>(
  "recipes/fetchComments",
  async (recipeId, { rejectWithValue }) => {
    try {
      const comments = await RecipeService.getCommentsByRecipe(recipeId);
      return comments;
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
    builder.addCase(fetchIngredientsByRecipe.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchIngredientsByRecipe.fulfilled, (state, action) => {
      state.ingredients = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchIngredientsByRecipe.rejected, (state) => {
      state.error = "Ошибка сервера";
      state.loading = false;
    });
  },
});

export const { setRecipes } = recipeSlice.actions;
export default recipeSlice.reducer;
