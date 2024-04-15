import { ChangeEvent } from "react";
import { FilterValuesType } from "../../../App";
import { ItemOfList, StyledButton } from "./TodoList.styled";
import { AddItemForm } from "../AddItemForm/AddItemForm";

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
};

export const TodoList = (props: PropsType) => {
  const addTaskTitle = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <div>
      <h2>{props.title}</h2>
      <button
        onClick={() => {
          props.removeTodolist(props.id);
        }}
      >
        delete list
      </button>
      <div>
        <AddItemForm addItem={addTaskTitle} />
        <ul>
          {props.tasks.map((item) => {
            return (
              <ItemOfList key={item.id} isDone={item.isDone}>
                <input
                  className="error"
                  type="checkbox"
                  checked={item.isDone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(
                      item.id,
                      e.currentTarget.checked,
                      props.id
                    );
                  }}
                />

                <span>{item.title}</span>
                <button
                  onClick={() => {
                    props.deleteTask(item.id, props.id);
                  }}
                >
                  X
                </button>
              </ItemOfList>
            );
          })}
        </ul>
        <div>
          <StyledButton
            active={props.filter === "all"}
            onClick={() => props.changeFilter("all", props.id)}
          >
            All
          </StyledButton>
          <StyledButton
            active={props.filter === "active"}
            onClick={() => props.changeFilter("active", props.id)}
          >
            Active
          </StyledButton>
          <StyledButton
            active={props.filter === "completed"}
            onClick={() => props.changeFilter("completed", props.id)}
          >
            Completed
          </StyledButton>
        </div>
      </div>
    </div>
  );
};
