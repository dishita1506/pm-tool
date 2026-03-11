import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchBoards = createAsyncThunk(
  "boards/fetchAll",
  async (projectId) => {
    const res = await api.get(`/boards?project=${projectId}`);
    return res.data.data;
  },
);

export const createBoard = createAsyncThunk("boards/create", async (data) => {
  const res = await api.post("/boards", data);
  return res.data.data;
});

const boardSlice = createSlice({
  name: "boards",
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default boardSlice.reducer;
