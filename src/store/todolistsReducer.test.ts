import { v1 } from "uuid";
import { TodoListType } from "../App";
import { todolistsReducer } from "./todolists";

test("correct todolist should be removed", () => {
  const todolist1 = v1();
  const todolist2 = v1();

  const startState: Array<TodoListType> = [
    { id: todolist1, title: "What to learn", filter: "all" },
    { id: todolist2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistsReducer(startState, {
    type: "REMOVE-TODOLIST",
    id: todolist1,
  });

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolist2);
});

test("correct todolist should be added", () => {
  const todolist1 = v1();
  const todolist2 = v1();

  const newTodolistTitle = "Check mail";

  const startState: Array<TodoListType> = [
    { id: todolist1, title: "What to learn", filter: "all" },
    { id: todolist2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistsReducer(startState, {
    type: "ADD-TODOLIST",
    title: newTodolistTitle,
  });

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe("all");
});

test("correct todolist should change its name", () => {
  const todolist1 = v1();
  const todolist2 = v1();

  const newTodolistTitle = "New todolist";

  const startState: Array<TodoListType> = [
    { id: todolist1, title: "What to learn", filter: "all" },
    { id: todolist2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistsReducer(startState, {
    type: "CHANGE-TODOLIST-TITLE",
    id: todolist2,
    title: newTodolistTitle,
  });

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});
