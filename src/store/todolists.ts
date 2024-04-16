import { v1 } from "uuid";
import { TodoListType } from "../App";

type ActionType = {
  type: string;
  [key: string]: any;
};

export const todolistsReducer = (
  state: Array<TodoListType>,
  action: ActionType
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

    // case "CHANGE-TODOLIST-TITLE": {
    //   const currentList = state.find((item) => item.id === action.id);
    //   if (currentList) {
    //     currentList.title = action.title;
    //     return [...state, currentList];
    //   }
    // }

    case "CHANGE-TODOLIST-TITLE": {
      const newState = state.map((item) =>
        item.id === action.id ? { ...item, title: action.title } : item
      );
      return newState;
    }

    default:
      throw new Error("Not work");
  }
};
