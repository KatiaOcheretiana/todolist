import { ChangeEvent } from "react";
import { FilterValuesType } from "../../../App";
import {
  ButtonWrapper,
  CheckBoxTitle,
  ItemOfList,
  StyledButton,
  TitleListWrapper,
} from "./TodoList.styled";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import Checkbox from "@mui/material/Checkbox";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "../../../store/tasksReducer/tasksReducer";
import { changeTodolistTitleAC } from "../../../store/todolistsReducer/todolistsReducer";
import { AppRootState } from "../../../store/store";

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
  // addTask: (title: string, todolistId: string) => void;
  // changeTaskStatus: (
  //   taskId: string,
  //   isDone: boolean,
  //   todolistId: string
  // ) => void;
  removeTodolist: (todolistId: string) => void;
  // changeTaskTitle: (
  //   taskId: string,
  //   newTitle: string,
  //   todolistId: string
  // ) => void;

  changeTodolistTitle: (newTitle: string, todolistId: string) => void;
};

export const TodoList = (props: PropsType) => {
  const dispatch = useDispatch();

  const allTasks = useSelector<AppRootState, Array<TaskType>>(
    (state) => state.tasks[props.id]
  );

  const changeTodolistTitle = (newTitle: string) => {
    dispatch(changeTodolistTitleAC(props.id, newTitle));
  };

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
        <AddItemForm
          addItem={(title) => dispatch(addTaskAC(title, props.id))}
          label="Write your next task"
        />
        <ul style={{ marginTop: "15px" }}>
          {filteredTasks.map((item) => {
            const onChangeStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              dispatch(
                changeTaskStatusAC(item.id, e.currentTarget.checked, props.id)
              );
            };

            const onChangeTitleHandler = (newTitle: string) => {
              dispatch(changeTaskTitleAC(item.id, newTitle, props.id));
            };

            return (
              <ItemOfList key={item.id} isdone={item.isDone ? "0.4" : "1"}>
                <TitleListWrapper>
                  <CheckBoxTitle>
                    <Checkbox
                      checked={item.isDone}
                      onChange={onChangeStatusHandler}
                    />

                    <EditableSpan
                      title={item.title}
                      onChange={onChangeTitleHandler}
                    />
                  </CheckBoxTitle>

                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      dispatch(removeTaskAC(item.id, props.id));
                    }}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TitleListWrapper>
              </ItemOfList>
            );
          })}
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
};
