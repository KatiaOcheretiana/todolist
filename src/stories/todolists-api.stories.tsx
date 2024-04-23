import { useEffect, useState } from "react";
import { todolistsAPI } from "../api/todolists-api";

export default {
  title: "API",
};

export const GetTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todolistsAPI.getTodolists().then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState<string>("");

  const createTodolist = () => {
    todolistsAPI.createTodolists(title).then((res) => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="write todolist title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createTodolist}>create todolist</button>
      </div>
    </div>
  );
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");

  const deleteList = () => {
    todolistsAPI.deleteTodolists(todolistId).then((res) => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder="todolistId"
          onChange={(e) => setTodolistId(e.target.value)}
        />
      </div>
      <button onClick={deleteList}>delete</button>
    </div>
  );
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const updateTitle = () => {
    todolistsAPI
      .updateTodolistsTitle(todolistId, title)
      .then((res) => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="write new todolist title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="todolistId"
          onChange={(e) => setTodolistId(e.target.value)}
        />
      </div>
      <button onClick={updateTitle}>update todolist title</button>
    </div>
  );
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");

  const searchTask = () => {
    todolistsAPI.getTasks(todolistId).then((res) => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}{" "}
      <input
        type="text"
        placeholder="write todolistId"
        onChange={(e) => setTodolistId(e.target.value)}
      />
      <button onClick={searchTask}>search task</button>
    </div>
  );
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");

  const deleteTask = () => {
    todolistsAPI
      .deleteTask(todolistId, taskId)
      .then((res) => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder="todolistId"
          onChange={(e) => setTodolistId(e.target.value)}
        />
        <input
          placeholder="taskId"
          onChange={(e) => setTaskId(e.target.value)}
        />
      </div>{" "}
      <button onClick={deleteTask}>delete</button>
    </div>
  );
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);

  const [todolistId, setTodolistId] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const updateTitle = () => {
    todolistsAPI
      .updateTask(todolistId, taskId, title)
      .then((res) => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}{" "}
      <div>
        <input
          type="text"
          placeholder="write new task title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="todolistId"
          onChange={(e) => setTodolistId(e.target.value)}
        />
        <input
          placeholder="taskId"
          onChange={(e) => setTaskId(e.target.value)}
        />
      </div>
      <button onClick={updateTitle}>update task title</button>
    </div>
  );
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const createTask = () => {
    todolistsAPI
      .createTask(todolistId, title)
      .then((res) => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}{" "}
      <div>
        <input
          type="text"
          placeholder="write todolistId"
          onChange={(e) => setTodolistId(e.target.value)}
        />
        <input
          type="text"
          placeholder="write task title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createTask}>create task</button>
      </div>
    </div>
  );
};
