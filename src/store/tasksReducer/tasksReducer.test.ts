import { TasksStateType } from "../../App";
import {
  addTodolistAC,
  removeTodolistAC,
} from "../todolistsReducer/todolistsReducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  taskReducer,
} from "./tasksReducer";

test("correct task should be deleted from current array", () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "HTML", isDone: true },
      { id: "3", title: "JS", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "book", isDone: true },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "lemon", isDone: false },
    ],
  };

  const action = removeTaskAC("2", "todolistId2");

  const endState = taskReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
  expect(endState["todolistId2"].every((t) => t.id !== "2")).toBeTruthy();
});

test("correct task should be added to current array", () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "HTML", isDone: true },
      { id: "3", title: "JS", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "book", isDone: true },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "lemon", isDone: false },
    ],
  };

  const action = addTaskAC("orange", "todolistId2");

  const endState = taskReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("orange");
  expect(endState["todolistId2"][0].isDone).toBe(false);
});

test("status of specified task should be changed", () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "HTML", isDone: true },
      { id: "3", title: "JS", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "book", isDone: true },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "lemon", isDone: false },
    ],
  };

  const action = changeTaskStatusAC("2", false, "todolistId2");

  const endState = taskReducer(startState, action);

  expect(endState["todolistId2"][1].isDone).toBe(false);
  expect(endState["todolistId1"][1].isDone).toBe(true);
});

test("title of specified task should be changed", () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "HTML", isDone: true },
      { id: "3", title: "JS", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "book", isDone: true },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "lemon", isDone: false },
    ],
  };

  const action = changeTaskTitleAC("2", "cake", "todolistId2");

  const endState = taskReducer(startState, action);

  expect(endState["todolistId2"][1].title).toBe("cake");
  expect(endState["todolistId1"][1].title).toBe("HTML");
});

test("new property with new array should be added when new todolist is added", () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "HTML", isDone: true },
      { id: "3", title: "JS", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "book", isDone: true },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "lemon", isDone: false },
    ],
  };

  const action = addTodolistAC("new todolist");

  const endState = taskReducer(startState, action);

  const keys = Object.keys(endState);

  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "HTML", isDone: true },
      { id: "3", title: "JS", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "book", isDone: true },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "lemon", isDone: false },
    ],
  };

  const action = removeTodolistAC("todolistId2");

  const endState = taskReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});
