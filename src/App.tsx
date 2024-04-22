import { TaskType, TodoList } from "./Components/TodoList/TodoList";
import { AddItemForm } from "./Components/AddItemForm/AddItemForm";
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
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./store/todolistsReducer/todolistsReducer";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./store/store";
import { useCallback } from "react";

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
  console.log("App");
  const dispatch = useDispatch();

  const todolists = useSelector<AppRootStateType, Array<TodoListType>>(
    (state) => state.todolists
  );

  const removeTodolist = useCallback(
    (todoListId: string) => {
      dispatch(removeTodolistAC(todoListId));
    },
    [dispatch]
  );

  const addTodolist = useCallback(
    (title: string) => {
      const action = addTodolistAC(title);
      dispatch(action);
    },
    [dispatch]
  );

  const changeTodolistTitle = useCallback(
    (newTitle: string, todoListId: string) => {
      dispatch(changeTodolistTitleAC(todoListId, newTitle));
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (value: FilterValuesType, todolistId: string) => {
      dispatch(changeTodolistFilterAC(todolistId, value));
    },
    [dispatch]
  );

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
            return (
              <GridStyle item key={t.id}>
                <Paper style={{ padding: "20px" }} elevation={6}>
                  <TodoList
                    key={t.id}
                    id={t.id}
                    title={t.title}
                    changeFilter={changeFilter}
                    filter={t.filter}
                    removeTodolist={removeTodolist}
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
