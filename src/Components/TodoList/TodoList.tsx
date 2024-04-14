import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "../../App";
import { ItemOfList, StyledButton, StyledInput } from "./TodoList.styled";

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
  deleteTask: (value: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
};

export const TodoList = (props: PropsType) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addTitleTask = () => {
    if (title.trim() !== "") {
      props.addTask(title.trim());
      setTitle("");
    } else {
      setError("Title is required!");
    }
  };

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      props.addTask(title);
      setTitle("");
    }
  };

  const filterHandler = (value: FilterValuesType, todolistId: string): void => {
    props.changeFilter(value);
  };

  return (
    <div>
      <h2>{props.title}</h2>
      <div>
        <div>
          <StyledInput
            type="text"
            value={title}
            onChange={onTitleChange}
            onKeyPress={onKeyPressHandler}
            error={error}
          />
          <button onClick={addTitleTask}>+</button>
          {error && <p style={{ color: "red" }}> {error}</p>}
        </div>

        <ul>
          {props.tasks.map((item) => {
            return (
              <ItemOfList key={item.id} isDone={item.isDone}>
                <input
                  className="error"
                  type="checkbox"
                  checked={item.isDone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(item.id, e.currentTarget.checked);
                  }}
                />

                <span>{item.title}</span>
                <button
                  onClick={() => {
                    props.deleteTask(item.id);
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
            onClick={() => filterHandler("all", props.id)}
          >
            All
          </StyledButton>
          <StyledButton
            active={props.filter === "active"}
            onClick={() => filterHandler("active", props.id)}
          >
            Active
          </StyledButton>
          <StyledButton
            active={props.filter === "completed"}
            onClick={() => filterHandler("completed", props.id)}
          >
            Completed
          </StyledButton>
        </div>
      </div>
    </div>
  );
};
