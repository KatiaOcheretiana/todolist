import { useDispatch } from "react-redux";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "../../store/tasksReducer/tasksReducer";
import React, { ChangeEvent, useCallback } from "react";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { TaskType } from "../TodoList/TodoList";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { CheckBoxTitle, ItemOfList, TitleListWrapper } from "./TaskItem.styled";

type TaskItemPropsType = { task: TaskType; todolistId: string };

export const TaskItem = React.memo(function (props: TaskItemPropsType) {
  const dispatch = useDispatch();

  const onChangeStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        changeTaskStatusAC(
          props.task.id,
          e.currentTarget.checked,
          props.todolistId
        )
      );
    },
    [props.task.id, props.todolistId, dispatch]
  );

  const onChangeTitleHandler = useCallback(
    (newTitle: string) => {
      dispatch(changeTaskTitleAC(props.task.id, newTitle, props.todolistId));
    },
    [props.task.id, props.todolistId, dispatch]
  );

  return (
    <ItemOfList isdone={props.task.isDone ? "0.4" : "1"}>
      <TitleListWrapper>
        <CheckBoxTitle>
          <Checkbox
            checked={props.task.isDone}
            onChange={onChangeStatusHandler}
          />

          <EditableSpan
            title={props.task.title}
            onChange={onChangeTitleHandler}
          />
        </CheckBoxTitle>

        <IconButton
          aria-label="delete"
          onClick={() => {
            dispatch(removeTaskAC(props.task.id, props.todolistId));
          }}
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      </TitleListWrapper>
    </ItemOfList>
  );
});
