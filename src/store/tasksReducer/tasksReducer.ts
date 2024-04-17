import { TasksStateType } from "../../App";

type removeTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};

type Action2Type = {
  type: "2";
  title: string;
};

type ActionsType = removeTaskActionType | Action2Type;

export const taskReducer = (
  state: TasksStateType,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = state[action.todolistId];
      const filteredTasks = tasks.filter((t) => t.id !== action.taskId);

      stateCopy[action.todolistId] = filteredTasks;
      return stateCopy;
    }
    case "2": {
      return { ...state };
    }
    default:
      return state;
  }
};

export const removeTaskAC = (
  taskId: string,
  todolistId: string
): removeTaskActionType => {
  return { type: "REMOVE-TASK", taskId, todolistId };
};

export const action2AC = (title: string): Action2Type => {
  return { type: "2", title: title };
};
