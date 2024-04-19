import React, { useCallback } from "react";
import { FilterValuesType } from "../../App";
import {
  ButtonWrapper,
  StyledButton,
  TitleListWrapper,
} from "./TodoList.styled";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";

import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addTaskAC } from "../../store/tasksReducer/tasksReducer";
import { changeTodolistTitleAC } from "../../store/todolistsReducer/todolistsReducer";
import { AppRootState } from "../../store/store";
import { TaskItem } from "../TaskItem/TaskItem";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (newTitle: string, todolistId: string) => void;
};

export const TodoList = React.memo(function (props: PropsType) {
  console.log("TodoList");

  const dispatch = useDispatch();

  const allTasks = useSelector<AppRootState, Array<TaskType>>(
    (state) => state.tasks[props.id]
  );

  const addTask = useCallback(
    (title: string) => {
      dispatch(addTaskAC(title, props.id));
    },
    [props.id, dispatch]
  );

  const changeTodolistTitle = useCallback(
    (newTitle: string) => {
      dispatch(changeTodolistTitleAC(props.id, newTitle));
    },
    [props.id, dispatch]
  );

  let filteredTasks = allTasks;
  if (props.filter === "completed") {
    filteredTasks = allTasks.filter((item) => item.isDone === true);
  }
  if (props.filter === "active") {
    filteredTasks = allTasks.filter((item) => item.isDone === false);
  }

  return (
    <>
      <TitleListWrapper>
        <EditableSpan
          element="h5"
          title={props.title}
          onChange={changeTodolistTitle}
        />

        <IconButton
          aria-label="delete"
          onClick={() => {
            props.removeTodolist(props.id);
          }}
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      </TitleListWrapper>
      <div>
        <AddItemForm addItem={addTask} label="Write your next task" />
        <ul style={{ marginTop: "15px" }}>
          {filteredTasks.map((item) => (
            <TaskItem key={item.id} task={item} todolistId={props.id} />
          ))}
        </ul>
        <ButtonWrapper>
          <StyledButton
            variant={props.filter === "all" ? "contained" : "outlined"}
            size="small"
            onClick={() => props.changeFilter("all", props.id)}
          >
            All
          </StyledButton>
          <StyledButton
            variant={props.filter === "active" ? "contained" : "outlined"}
            size="small"
            color="error"
            onClick={() => props.changeFilter("active", props.id)}
          >
            Active
          </StyledButton>
          <StyledButton
            variant={props.filter === "completed" ? "contained" : "outlined"}
            size="small"
            color="success"
            onClick={() => props.changeFilter("completed", props.id)}
          >
            Completed
          </StyledButton>
        </ButtonWrapper>
      </div>
    </>
  );
});
