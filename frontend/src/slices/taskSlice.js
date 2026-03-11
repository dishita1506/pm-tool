import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  async (boardId) => {
    const res = await api.get(`/tasks?board=${boardId}`);
    return { boardId, tasks: res.data.data };
  },
);

export const createTask = createAsyncThunk("tasks/create", async (data) => {
  // data must contain "board"
  const res = await api.post("/tasks", data);
  return { boardId: data.board, task: res.data.data };
});

export const updateTaskStatus = createAsyncThunk(
  "tasks/updateStatus",
  async ({ taskId, status }) => {
    const res = await api.patch(`/tasks/${taskId}`, { status });
    return res.data.data; // full task (contains .board)
  },
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ taskId, data }) => {
    const res = await api.put(`/tasks/${taskId}`, data);
    return res.data.data;
  },
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: { tasksByBoard: {}, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        const { boardId, tasks } = action.payload;
        state.tasksByBoard[boardId] = tasks;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const { boardId, task } = action.payload;
        if (!state.tasksByBoard[boardId]) state.tasksByBoard[boardId] = [];
        state.tasksByBoard[boardId].push(task);
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        const boardId = updated.board; // MongoDB returns the board ObjectId
        if (state.tasksByBoard[boardId]) {
          const index = state.tasksByBoard[boardId].findIndex(
            (t) => t._id === updated._id,
          );
          if (index !== -1) state.tasksByBoard[boardId][index] = updated;
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updated = action.payload;
        const boardId = updated.board;
        if (state.tasksByBoard[boardId]) {
          const index = state.tasksByBoard[boardId].findIndex(
            (t) => t._id === updated._id,
          );
          if (index !== -1) state.tasksByBoard[boardId][index] = updated;
        }
      });
  },
});

export default taskSlice.reducer;
