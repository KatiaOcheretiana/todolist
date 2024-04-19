import { combineReducers, createStore } from "redux";
import { todolistsReducer } from "./todolistsReducer/todolistsReducer";
import { taskReducer } from "./tasksReducer/tasksReducer";

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: taskReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);

// window.store = store;
