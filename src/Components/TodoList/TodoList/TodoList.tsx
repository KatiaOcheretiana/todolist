import { ChangeEvent } from "react";
import { FilterValuesType } from "../../../App";
import {
  ButtonWrapper,
  ItemOfList,
  StyledButton,
  TitleListWrapper,
} from "./TodoList.styled";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import Checkbox from "@mui/material/Checkbox";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: TaskType[];
  filter: FilterValuesType;
  deleteTask: (value: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void;
  removeTodolist: (todolistId: string) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;

  changeTodolistTitle: (newTitle: string, todolistId: string) => void;
};

export const TodoList = (props: PropsType) => {
  const addTaskTitle = (title: string) => {
    props.addTask(title, props.id);
  };

  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(newTitle, props.id);
  };

  return (
    <div>
      <TitleListWrapper>
        <h2>
          <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        </h2>

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
        <AddItemForm addItem={addTaskTitle} label="Write your next task" />
        <ul>
          {props.tasks.map((item) => {
            const onChangeStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              props.changeTaskStatus(
                item.id,
                e.currentTarget.checked,
                props.id
              );
            };

            const onChangeTitleHandler = (newTitle: string) => {
              props.changeTaskTitle(item.id, newTitle, props.id);
            };

            return (
              <ItemOfList key={item.id} isDone={item.isDone}>
                <TitleListWrapper>
                  <div>
                    <Checkbox
                      checked={item.isDone}
                      onChange={onChangeStatusHandler}
                    />

                    <EditableSpan
                      title={item.title}
                      onChange={onChangeTitleHandler}
                    />
                  </div>

                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      props.deleteTask(item.id, props.id);
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
            variant="contained"
            size="small"
            active={props.filter === "all"}
            onClick={() => props.changeFilter("all", props.id)}
          >
            All
          </StyledButton>
          <StyledButton
            variant="contained"
            size="small"
            active={props.filter === "active"}
            onClick={() => props.changeFilter("active", props.id)}
          >
            Active
          </StyledButton>
          <StyledButton
            variant="contained"
            size="small"
            active={props.filter === "completed"}
            onClick={() => props.changeFilter("completed", props.id)}
          >
            Completed
          </StyledButton>
        </ButtonWrapper>
      </div>
    </div>
  );
};
