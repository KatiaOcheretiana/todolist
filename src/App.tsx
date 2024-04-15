import React, { useState } from "react";
import { TaskType, TodoList } from "./Components/TodoList/TodoList/TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./Components/TodoList/AddItemForm/AddItemForm";

export type FilterValuesType = "all" | "completed" | "active";

type TodoListType = { id: string; title: string; filter: FilterValuesType };

type TasksStateType = { [key: string]: Array<TaskType> };

function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolist] = useState<Array<TodoListType>>([
    {
      id: todolistId1,
      title: "What to learn",
      filter: "all",
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: "all",
    },
  ]);

  const [allTasks, setAllTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "JS", isDone: false },
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "JS", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "book", isDone: true },
      { id: v1(), title: "milk", isDone: true },
      { id: v1(), title: "lemon", isDone: false },
      { id: v1(), title: "sugar", isDone: true },
    ],
  });

  const removeTask = (id: string, todoListId: string) => {
    const tasks = allTasks[todoListId];
    const updatedTasks = tasks.filter((item) => item.id !== id);
    allTasks[todoListId] = updatedTasks;
    setAllTasks({ ...allTasks });
  };

  const removeTodolist = (todoListId: string) => {
    const updatedTasks = todolists.filter((item) => item.id !== todoListId);
    setTodolist(updatedTasks);

    delete allTasks[todoListId];
    setAllTasks({ ...allTasks });
  };

  const addTask = (title: string, todoListId: string) => {
    const tasks = allTasks[todoListId];
    const newTask = [{ id: v1(), title: title, isDone: false }, ...tasks];
    allTasks[todoListId] = newTask;
    setAllTasks({ ...allTasks });
  };

  const addTodolist = (title: string) => {
    const newTodoList: TodoListType = {
      id: v1(),
      title: title,
      filter: "all",
    };
    setTodolist([newTodoList, ...todolists]);
    setAllTasks({ ...allTasks, [newTodoList.id]: [] });
  };

  const changeTaskStatus = (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => {
    const tasks = allTasks[todoListId];

    let currentTask = tasks.find((item) => item.id === taskId);
    if (currentTask) {
      currentTask.isDone = isDone;
      setAllTasks({ ...allTasks });
    }
  };

  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    const currentTodolist = todolists.find((list) => list.id === todolistId);
    if (currentTodolist) {
      currentTodolist.filter = value;
      setTodolist([...todolists]);
    }
  };

  return (
    <div style={{ display: "flex", gap: "50px" }}>
      <AddItemForm addItem={addTodolist} />
      {todolists.map((t) => {
        let filteredTasks: TaskType[] = allTasks[t.id];

        if (t.filter === "completed") {
          filteredTasks = allTasks[t.id].filter((item) => item.isDone === true);
        }
        if (t.filter === "active") {
          filteredTasks = allTasks[t.id].filter(
            (item) => item.isDone === false
          );
        }

        return (
          <TodoList
            key={t.id}
            id={t.id}
            title={t.title}
            tasks={filteredTasks}
            changeFilter={changeFilter}
            deleteTask={removeTask}
            addTask={addTask}
            filter={t.filter}
            changeTaskStatus={changeTaskStatus}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
