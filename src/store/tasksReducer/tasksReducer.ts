import { v1 } from "uuid";
import { TasksStateType } from "../../App";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from "../todolistsReducer/todolistsReducer";

type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};

type addTaskActionType = {
  type: "ADD-TASK";
  title: string;
  todolistId: string;
};

type changeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  taskId: string;
  isDone: boolean;
  todolistId: string;
};

type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  taskId: string;
  title: string;
  todolistId: string;
};

type ActionsType =
  | RemoveTaskActionType
  | addTaskActionType
  | changeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

const initialState: TasksStateType = {
  // [todolistId1]: [
  //   { id: v1(), title: "CSS", isDone: true },
  //   { id: v1(), title: "HTML", isDone: true },
  //   { id: v1(), title: "JS", isDone: false },
  //   { id: v1(), title: "React", isDone: true },
  //   { id: v1(), title: "TS", isDone: true },
  // ],
  // [todolistId2]: [
  //   { id: v1(), title: "book", isDone: true },
  //   { id: v1(), title: "milk", isDone: true },
  //   { id: v1(), title: "lemon", isDone: false },
  //   { id: v1(), title: "sugar", isDone: true },
  // ],
};

export const taskReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const filteredTasks = tasks.filter((t) => t.id !== action.taskId);

      stateCopy[action.todolistId] = filteredTasks;
      return stateCopy;
    }
    case "ADD-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      stateCopy[action.todolistId] = [
        { id: v1(), title: action.title, isDone: false },
        ...tasks,
      ];
      return stateCopy;
    }

    case "CHANGE-TASK-STATUS": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      stateCopy[action.todolistId] = tasks.map((t) =>
        t.id === action.taskId ? { ...t, isDone: action.isDone } : t
      );

      return stateCopy;
    }

    case "CHANGE-TASK-TITLE": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      stateCopy[action.todolistId] = tasks.map((t) =>
        t.id === action.taskId ? { ...t, title: action.title } : t
      );

      return stateCopy;
    }

    case "ADD-TODOLIST": {
      const stateCopy = { ...state };
      stateCopy[action.todolistId] = [];

      return stateCopy;
    }

    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    }

    default:
      return state;
  }
};

export const removeTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", taskId, todolistId };
};

export const addTaskAC = (
  title: string,
  todolistId: string
): addTaskActionType => {
  return { type: "ADD-TASK", title, todolistId };
};

export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todolistId: string
): changeTaskStatusActionType => {
  return { type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId };
};

export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
): ChangeTaskTitleActionType => {
  return { type: "CHANGE-TASK-TITLE", taskId, title, todolistId };
};
