import { TaskItem } from "./TaskItem";
import { ReduxStoreProviderDecorator } from "../../stories/ReduxStoreProviderDecorator";

export default {
  title: "TaskItem Component",
  component: TaskItem,
  decorators: [ReduxStoreProviderDecorator],
};

export const TaskItemBaseExample = () => {
  return (
    <>
      <TaskItem
        task={{ id: "1", isDone: true, title: "JS" }}
        todolistId="111"
      />
      <TaskItem
        task={{ id: "2", isDone: false, title: "TS" }}
        todolistId="11"
      />
    </>
  );
};
