import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const register = createAsyncThunk("auth/register", async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
});

export const login = createAsyncThunk("auth/login", async (userData) => {
  const res = await api.post("/auth/login", userData);
  localStorage.setItem("accessToken", res.data.data.accessToken);
  localStorage.setItem("user", JSON.stringify(res.data.data.user));
  return res.data.data;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
});

const loadUserFromStorage = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: loadUserFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
