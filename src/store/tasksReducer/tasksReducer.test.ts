import { TasksStateType } from "../../App";
import { removeTaskAC, taskReducer } from "./tasksReducer";

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
