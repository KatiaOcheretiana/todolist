import { TasksStateType, TodoListType } from "../../App";
import { taskReducer } from "../tasksReducer/tasksReducer";
import {
  addTodolistAC,
  todolistsReducer,
} from "../todolistsReducer/todolistsReducer";

test("id should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodoListType> = [];

  const action = addTodolistAC("new todolist");

  const endTasksState = taskReducer(startTasksState, action);

  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodolists).toBe(action.todolistId);
});
