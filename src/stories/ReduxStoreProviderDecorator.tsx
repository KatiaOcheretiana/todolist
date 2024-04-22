import { Provider } from "react-redux";
import { AppRootStateType } from "../store/store";
import { GlobalStyle } from "../GlobalStyle";
import { v1 } from "uuid";
import { combineReducers, createStore } from "redux";
import { taskReducer } from "../store/tasksReducer/tasksReducer";
import { todolistsReducer } from "../store/todolistsReducer/todolistsReducer";

const rootReducer = combineReducers({
  tasks: taskReducer,
  todolists: todolistsReducer,
});

const initialGlobalState = {
  todolists: [
    {
      id: "todolistId1",
      title: "What to learn",
      filter: "all",
    },
    {
      id: "todolistId2",
      title: "What to buy",
      filter: "all",
    },
  ],
  tasks: {
    ["todolistId1"]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "JS", isDone: false },
    ],
    ["todolistId2"]: [
      { id: v1(), title: "book", isDone: true },
      { id: v1(), title: "milk", isDone: true },
      { id: v1(), title: "lemon", isDone: false },
      { id: v1(), title: "sugar", isDone: true },
    ],
  },
};

export const storyBookStore = createStore(
  rootReducer
  //   initialGlobalState as AppRootStateType
);

export const ReduxStoreProviderDecorator = (story: any) => {
  return (
    <Provider store={storyBookStore}>
      {story()}
      <GlobalStyle />
    </Provider>
  );
};
