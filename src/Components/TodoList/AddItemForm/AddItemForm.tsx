import { ChangeEvent, KeyboardEvent, useState } from "react";
import { InputStyle, InputWrapper } from "./AddItemForm.styled";
import { IconButton } from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";

type AddItemFormProps = {
  addItem: (title: string) => void;
  label: string;
};

export const AddItemForm = (props: AddItemFormProps) => {
  const [title, setTitle] = useState("");

  const [error, setError] = useState<boolean>(false);

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    setError(false);
  };

  const addTitleTask = () => {
    if (title.trim() !== "") {
      props.addItem(title.trim());
      setTitle("");
    } else {
      setError(true);
    }
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(false);
    if (e.charCode === 13) {
      addTitleTask();
    }
  };

  return (
    <>
      <InputWrapper>
        <InputStyle
          multiline
          error={error}
          label={props.label}
          variant="standard"
          value={title}
          onChange={onTitleChange}
          onKeyPress={onKeyPressHandler}
          helperText={error ? "Title is required!" : ""}
        />
        <IconButton onClick={addTitleTask}>
          <AddTaskIcon stroke="orange" />
        </IconButton>
      </InputWrapper>
    </>
  );
};
