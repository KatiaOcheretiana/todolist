import { FilterValuesType } from "../../App";

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: TaskType[];
  deleteTask: (value: number) => void;
  changeFilter: (value: FilterValuesType) => void;
};

export const TodoList = (props: PropsType) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <div>
        <input type="text" />
        <button>+</button>
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
          <button onClick={() => props.changeFilter("all")}>All</button>
          <button onClick={() => props.changeFilter("active")}>Active</button>
          <button onClick={() => props.changeFilter("completed")}>
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};
