import React, { useState } from "react";
import { TaskType, TodoList } from "./Components/TodoList/TodoList/TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./Components/TodoList/AddItemForm/AddItemForm";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import styled from "styled-components";

const GridStyle = styled(Grid)`
  width: 100%;

  @media screen and (min-width: 768px) {
    max-width: 380px;
  }
`;

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = { [key: string]: Array<TaskType> };

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

  const changeTaskTitle = (
    taskId: string,
    newTitle: string,
    todoListId: string
  ) => {
    const tasks = allTasks[todoListId];

    let currentTask = tasks.find((item) => item.id === taskId);
    if (currentTask) {
      currentTask.title = newTitle;
      setAllTasks({ ...allTasks });
    }
  };

  const changeTodolistTitle = (newTitle: string, todoListId: string) => {
    let currentList = todolists.find((item) => item.id === todoListId);
    if (currentList) {
      currentList.title = newTitle;
      setTodolist([...todolists]);
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
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "25px" }}>
          <AddItemForm addItem={addTodolist} label="Create new task list" />
        </Grid>
        <Grid container spacing={3} style={{ padding: "15px" }}>
          {todolists.map((t) => {
            let filteredTasks: TaskType[] = allTasks[t.id];

            if (t.filter === "completed") {
              filteredTasks = allTasks[t.id].filter(
                (item) => item.isDone === true
              );
            }
            if (t.filter === "active") {
              filteredTasks = allTasks[t.id].filter(
                (item) => item.isDone === false
              );
            }

            return (
              <GridStyle item>
                <Paper style={{ padding: "20px" }} elevation={6}>
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
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </GridStyle>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

export default App;
