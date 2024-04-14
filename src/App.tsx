import React, { useState } from "react";
import { TaskType, TodoList } from "./Components/TodoList/TodoList";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

type TodoListType = { id: string; title: string; filter: FilterValuesType };

function App() {
  const [tasks, setTasks] = useState([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "HTML", isDone: true },
    { id: v1(), title: "JS", isDone: false },
  ]);

  // const [filter, setFilter] = useState<FilterValuesType>("all");

  const removeTask = (id: string) => {
    const updatedTasks = tasks.filter((item) => item.id !== id);
    setTasks(updatedTasks);
  };

  const addTask = (title: string) => {
    const newTask = { id: v1(), title: title, isDone: false };
    setTasks([newTask, ...tasks]);
  };

  const changeFilter = (value: FilterValuesType, todolistId: string) => {};

  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    let task = tasks.find((item) => item.id === taskId);
    if (task) {
      task.isDone = isDone;
    }

    setTasks([...tasks]);
  };

  const [todolist, setTodolist] = useState<Array<TodoListType>>([
    {
      id: v1(),
      title: "What to learn",
      filter: "active",
    },
    {
      id: v1(),
      title: "What to buy",
      filter: "completed",
    },
  ]);

  // let todolist: Array<TodoListType> = [
  //   {
  //     id: v1(),
  //     title: "What to learn",
  //     filter: "active",
  //   },
  //   {
  //     id: v1(),
  //     title: "What to buy",
  //     filter: "completed",
  //   },
  // ];

  return (
    <div style={{ display: "flex", gap: "50px" }}>
      {todolist.map((t) => {
        let filteredTasks: TaskType[] = tasks;

        if (t.filter === "completed") {
          filteredTasks = tasks.filter((item) => item.isDone === true);
        }
        if (t.filter === "active") {
          filteredTasks = tasks.filter((item) => item.isDone === false);
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
          />
        );
      })}
    </div>
  );
}

export default App;
