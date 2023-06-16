import { INewRecipeData } from "./../../types/INewRecipe";
import { recipe } from "./../../types/TRecipe";
import { Ingredient } from "../../types/TIngredient";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import RecipeService from "../../services/RecipeService";

interface recipeSliceState {
  recipes: recipe[];
  recipe: recipe;
  ingredients: Ingredient[];
  loading: boolean;
  error: null | string;
}

const initialState: recipeSliceState = {
  recipes: [],
  recipe: {} as recipe,
  ingredients: [],
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

export const fetchRecipesForAdmin = createAsyncThunk(
  "recipes/fetchRecipesForAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const adminRecipes = await RecipeService.fetchRecipeAdmin();
      return adminRecipes;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchRecipeById = createAsyncThunk<recipe, string>(
  "recipes/fetchRecipe",
  async (recipeId, { rejectWithValue }) => {
    try {
      return RecipeService.getRecipeById(recipeId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchIngredientsByRecipe = createAsyncThunk<Ingredient[], string>(
  "recipes/fetchIngredient",
  async (recipeId, { rejectWithValue }) => {
    try {
      return RecipeService.getIngredientByRecipe(recipeId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addNewRecipe = createAsyncThunk<string, INewRecipeData>(
  "recipes/addNewrecipe",
  async (data, { rejectWithValue }) => {
    try {
      return RecipeService.addNewRecipe(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateRecipeStatus = createAsyncThunk(
  "recipes/updateRecipeStatus",
  async (data, { rejectWithValue }) => {
    try {
      return RecipeService.updateRecipeStatus(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (data, { rejectWithValue }) => {
    try {
      return RecipeService.deleteRecipe(data);
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
    builder.addCase(fetchRecipesForAdmin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRecipesForAdmin.fulfilled, (state, action) => {
      state.recipes = action.payload;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { setRecipes } = recipeSlice.actions;
export default recipeSlice.reducer;
