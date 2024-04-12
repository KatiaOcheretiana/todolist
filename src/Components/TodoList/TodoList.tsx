import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "../../App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: TaskType[];
  deleteTask: (value: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
};

export const TodoList = (props: PropsType) => {
  const [title, setTitle] = useState("");

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      props.addTask(title);
      setTitle("");
    }
  };

  const addTask = () => {
    props.addTask(title);
    setTitle("");
  };

  const filterHandler = (value: FilterValuesType): void => {
    props.changeFilter(value);
  };

  return (
    <div>
      <h2>{props.title}</h2>
      <div>
        <input
          type="text"
          value={title}
          onChange={onTitleChange}
          onKeyPress={onKeyPressHandler}
        />
        <button onClick={addTask}>+</button>
        <ul>
          {props.tasks.map((item) => {
            return (
              <li key={item.id}>
                <input type="checkbox" checked={item.isDone} />
                <span>{item.title}</span>
                <button
                  onClick={() => {
                    props.deleteTask(item.id);
                  }}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
        <div>
          <button onClick={() => filterHandler("all")}>All</button>
          <button onClick={() => filterHandler("active")}>Active</button>
          <button onClick={() => filterHandler("completed")}>Completed</button>
        </div>
      </div>
    </div>
  );
};
