import { DataLogin, DataRegister } from "./../../services/AuthService";
import { IUser } from "./../../types/IUser";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";
import AuthResponse from "../../types/response/AuthResponse";
import { AxiosError } from "axios";

type TErrorAxios = {
  status: number;
  message: string;
  data?: any;
  response?: any;
  errors: {
    name?: string[];
    email?: string[];
    password: string[];
  };
};

interface UserSliceState {
  token: string;
  user: IUser;
  loading: boolean;
  error: {
    name?: string[];
    email?: string[];
    password?: string[];
  } | null;
}

const initialState: UserSliceState = {
  token: localStorage.getItem("ACCESS_TOKEN") || "",
  user: {} as IUser,
  loading: true,
  error: null,
};

export const registerUser = createAsyncThunk<AuthResponse, DataRegister>(
  "user/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthService.register(data);
      return response;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<TErrorAxios>;
      return rejectWithValue(axiosError.response?.data.errors);
    }
  }
);

export const loginUser = createAsyncThunk<AuthResponse, DataLogin>(
  "user/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(data);
      return response;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<TErrorAxios>;
      return rejectWithValue(axiosError.response?.data.errors);
    }
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async (_, { rejectWithValue }) => {
  try {
    return await AuthService.logout();
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getUser = createAsyncThunk("user/getUser", async (_, { rejectWithValue }) => {
  try {
    const user = await AuthService.getUser();
    return user;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      if (state.token) {
        localStorage.setItem("ACCESS_TOKEN", state.token);
      } else {
        localStorage.removeItem("ACCESS_TOKEN");
      }
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });
    builder.addCase(loginUser.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      if (state.token) {
        localStorage.setItem("ACCESS_TOKEN", state.token);
      } else {
        localStorage.removeItem("ACCESS_TOKEN");
      }
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      (state.token = ""), (state.user = {} as IUser);
      localStorage.removeItem("ACCESS_TOKEN");
    });

    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      (state.user = payload), (state.loading = false);
    });
    builder.addCase(getUser.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      }
      state.loading = false;
    });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
