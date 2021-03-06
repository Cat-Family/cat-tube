import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../request";
import axios from "../../request";
import type { RootState } from "../../store";

// Define a type for the slice state
interface CurrentUserState {
  status: "idle" | "loading" | "failed" | "success";
  error: Array<object> | string | null;
  user:
    | {
        _id: string;
        email: string;
        name: string;
        isAdmin: boolean;
        isPremium: boolean;
        isDelete: boolean;
        createdAt: Date;
        updatedAt: Date;
        iat: number;
        exp: number;
        avatar: string;
      }
    | undefined;
}

// Define the initial state using that type
const initialState: CurrentUserState = {
  status: "idle",
  error: null,
  user: undefined,
};

export const currentUser = createAsyncThunk(
  "user/current",
  async (accessToken: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/users/current`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const currentUsreSlice = createSlice({
  name: "currentUser",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    clearCurrentUsrState: (state: CurrentUserState) => {
      state.status = "idle";
      state.error = null;
      state.user = undefined;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
  extraReducers: (builder) => {
    builder
      .addCase(currentUser.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as Array<object> | string;
        state.user = undefined;
      });
  },
});

export const { clearCurrentUsrState } = currentUsreSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentUserStatus = (state: RootState) =>
  state.currentUser.user;
export const selectCurrentUserState = (state: RootState) =>
  state.currentUser.status;

export default currentUsreSlice.reducer;
