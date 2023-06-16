import UserService from "../../services/UserService";
import { IUser } from "./../../types/IUser";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type TSliceState = {
  profileUser: IUser;
  loading: boolean;
  error: string | null;
};

const initialState: TSliceState = {
  profileUser: {} as IUser,
  favourite: [],
  loading: false,
  error: null,
};

export const getUserProfile = createAsyncThunk<IUser, number>(
  "user/getProfile",
  async (userId, { rejectWithValue }) => {
    try {
      return UserService.getUser(userId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserFavourite = createAsyncThunk<IUser, number>(
  "user/getFavourite",
  async (userId, { rejectWithValue }) => {
    try {
      return UserService.getFavourite(userId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const UserProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserProfile.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.profileUser = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getUserProfile.rejected, (state) => {
      state.error = "Ошибка сервера";
      state.loading = false;
    });
    builder.addCase(getUserFavourite.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserFavourite.fulfilled, (state, action) => {
      state.favourite = action.payload;
      state.loading = false;
      state.error = null;
    });
  },
});

export default UserProfileSlice.reducer;
