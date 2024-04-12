import React, { useState } from "react";
import { TaskType, TodoList } from "./Components/TodoList/TodoList";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  const [tasks, setTasks] = useState([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "HTML", isDone: true },
    { id: v1(), title: "JS", isDone: false },
  ]);

  const [filter, setFilter] = useState<FilterValuesType>("all");

  let filteredTasks: TaskType[] = tasks;

  if (filter === "completed") {
    filteredTasks = tasks.filter((item) => item.isDone === true);
  }
  if (filter === "active") {
    filteredTasks = tasks.filter((item) => item.isDone === false);
  }

  const removeTask = (id: string) => {
    const updatedTasks = tasks.filter((item) => item.id !== id);
    setTasks(updatedTasks);
  };

  const addTask = (title: string) => {
    const newTask = { id: v1(), title: title, isDone: false };
    setTasks([newTask, ...tasks]);
  };

  const changeFilter = (value: FilterValuesType) => {
    setFilter(value);
  };

  return (
    <div style={{ display: "flex", gap: "50px" }}>
      <TodoList
        title="What to learn"
        tasks={filteredTasks}
        changeFilter={changeFilter}
        deleteTask={removeTask}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
