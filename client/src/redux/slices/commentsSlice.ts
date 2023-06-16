import { CommentRecipeData } from "./../../services/CommentService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IComments } from "../../types/IComments";
import CommentService from "../../services/CommentService";

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
      const comments = await CommentService.getCommentsByRecipe(recipeId);
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
      const newComments = await CommentService.addCommentsByRecipe(data);
      return newComments;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCommentById = createAsyncThunk<IComments, number>(
  "comments/deleteComment",
  async (id, { rejectWithValue }) => {
    try {
      return await CommentService.deleteCommentById(id);
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
    builder.addCase(deleteCommentById.fulfilled, (state, { payload }) => {
      state.comments = state.comments.filter((item) => item.id !== payload.id);
      state.loading = false;
    });
    builder.addCase(deleteCommentById.rejected, (state) => {
      state.errorComment = "Ошибка удаления комментария";
    });
  },
});

export default commentsSlice.reducer;
