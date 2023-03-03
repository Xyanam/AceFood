import { CommentRecipeData } from "./../../services/RecipeService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RecipeService from "../../services/RecipeService";
import { IComments } from "../../types/IComments";

interface ICommentsSliceState {
  comments: IComments[];
  loading: boolean;
  errorComment: null | string;
}

const initialState: ICommentsSliceState = {
  comments: [],
  loading: false,
  errorComment: null,
};

export const fetchCommentsByRecipe = createAsyncThunk<IComments[], string>(
  "comments/fetchComments",
  async (recipeId, { rejectWithValue }) => {
    try {
      const comments = await RecipeService.getCommentsByRecipe(recipeId);
      return comments;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addCommentsForRecipe = createAsyncThunk<IComments, CommentRecipeData>(
  "comments/createComment",
  async (data, { rejectWithValue }) => {
    try {
      const newComments = await RecipeService.addCommentsByRecipe(data);
      return newComments;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const commentsSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCommentsByRecipe.pending, (state) => {
      state.loading = true;
      state.errorComment = null;
    });
    builder.addCase(fetchCommentsByRecipe.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
      state.errorComment = null;
    });
    builder.addCase(fetchCommentsByRecipe.rejected, (state) => {
      state.loading = false;
      state.errorComment = "Ошибка загрузки комментариев";
    });
    builder.addCase(addCommentsForRecipe.fulfilled, (state, action) => {
      state.comments.unshift(action.payload);
      state.loading = false;
    });
    builder.addCase(addCommentsForRecipe.rejected, (state) => {
      state.loading = false;
      state.errorComment = "Ошибка отправки комментария";
    });
  },
});

export default commentsSlice.reducer;
