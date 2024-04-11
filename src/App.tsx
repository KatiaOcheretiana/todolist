import React, { useEffect, useState } from "react";
import { TaskType, TodoList } from "./Components/TodoList/TodoList";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  let initialTasks: TaskType[] = [
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "HTML", isDone: true },
    { id: 3, title: "JS", isDone: false },
  ];

  const [tasks, setTasks] = useState(initialTasks);

  const [filter, setFilter] = useState<FilterValuesType>("all");

  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>(initialTasks);

  useEffect(() => {
    if (filter === "completed") {
      setFilteredTasks(tasks.filter((item) => item.isDone === true));
    }
    if (filter === "active") {
      setFilteredTasks(tasks.filter((item) => item.isDone === false));
    }
  }, [filter, tasks]);

  const removeTask = (id: number) => {
    const updatedTasks = tasks.filter((item) => item.id !== id);
    setTasks(updatedTasks);
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
      />
    </div>
  );
}

export default App;
