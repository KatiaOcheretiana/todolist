import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../../App";

type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
};

type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};

type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistFilterActionType
  | ChangeTodolistTitleActionType;

export const todolistsReducer = (
  state: Array<TodoListType>,
  action: ActionsType
): Array<TodoListType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((item) => item.id !== action.id);
    }

    case "ADD-TODOLIST": {
      const newTodoList: TodoListType = {
        id: v1(),
        title: action.title,
        filter: "all",
      };

      return [...state, newTodoList];
    }

    case "CHANGE-TODOLIST-TITLE": {
      const currentList = state.find((item) => item.id === action.id);
      if (currentList) {
        currentList.title = action.title;
      }
      return [...state];
    }

    case "CHANGE-TODOLIST-FILTER": {
      const currentList = state.find((item) => item.id === action.id);
      if (currentList) {
        currentList.filter = action.filter;
      }
      return [...state];
    }

    default:
      return state;
  }
};

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: id };
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title: title };
};

export const changeTodolistTitleAC = (
  id: string,
  title: string
): ChangeTodolistTitleActionType => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    id: id,
    title: title,
  };
};

export const changeTodolistFilterAC = (
  id: string,
  filter: FilterValuesType
): ChangeTodolistFilterActionType => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    id: id,
    filter: filter,
  };
};
