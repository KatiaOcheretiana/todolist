import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../../App";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todolistId: string;
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

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: Array<TodoListType> = [
  // {
  //   id: todolistId1,
  //   title: "What to learn",
  //   filter: "all",
  // },
  // {
  //   id: todolistId2,
  //   title: "What to buy",
  //   filter: "all",
  // },
];

export const todolistsReducer = (
  state: Array<TodoListType> = initialState,
  action: ActionsType
): Array<TodoListType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((item) => item.id !== action.id);
    }

    case "ADD-TODOLIST": {
      const newTodoList: TodoListType = {
        id: action.todolistId,
        title: action.title,
        filter: "all",
      };

      return [newTodoList, ...state];
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
  return { type: "ADD-TODOLIST", title: title, todolistId: v1() };
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
