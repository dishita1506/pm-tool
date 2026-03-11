import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import projectReducer from "./slices/projectSlice.js";
import boardReducer from "./slices/boardSlice.js";
import taskReducer from "./slices/taskSlice.js";

export default configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    boards: boardReducer,
    tasks: taskReducer,
  },
});
