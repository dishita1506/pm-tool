import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchProjects = createAsyncThunk("projects/fetchAll", async () => {
  const res = await api.get("/projects");
  return res.data;
});

export const createProject = createAsyncThunk(
  "projects/create",
  async (data) => {
    const res = await api.post("/projects", data);
    return res.data;
  },
);

const projectSlice = createSlice({
  name: "projects",
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default projectSlice.reducer;
