import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "e74f445b-d9fb-421a-aa09-e20461ce0ce0",
  },
});

export type TodolistsType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

type ResponseType<D = {}> = {
  resultCode: number;
  fieldsErrors: Array<string>;
  messages: Array<string>;
  data: D;
};

export type TaskType = {
  description: string;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

type UpdateTaskType = {
  description: string;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

type GetTaskResponseType = {
  items: TaskType[];
  totalCount: number;
  error: null | string;
};

export const todolistsAPI = {
  getTodolists() {
    return instance.get<Array<TodolistsType>>("todo-lists");
  },

  createTodolists(title: string) {
    return instance.post<
      ResponseType<{
        item: TodolistsType;
      }>
    >("todo-lists", {
      title: title,
    });
  },

  deleteTodolists(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },

  updateTodolistsTitle(todolistId: string, newTitle: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {
      title: newTitle,
    });
  },

  getTasks(todolistId: string) {
    return instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`);
  },

  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },

  updateTask(todolistId: string, taskId: string, newTitle: string) {
    return instance.put<ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      {
        title: newTitle,
      }
    );
  },

  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<TaskType>>(
      `todo-lists/${todolistId}/tasks`,
      {
        title: title,
      }
    );
  },
};
