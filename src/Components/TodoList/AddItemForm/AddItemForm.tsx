import { ChangeEvent, KeyboardEvent, useState } from "react";
import { InputWrapper } from "./AddItemForm.styled";
import { IconButton, TextField } from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";

type AddItemFormProps = {
  addItem: (title: string) => void;
  label: string;
};

export const AddItemForm = (props: AddItemFormProps) => {
  const [title, setTitle] = useState("");

  const [error, setError] = useState<string | null>(null);

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    setError(null);
  };

  const addTitleTask = () => {
    if (title.trim() !== "") {
      props.addItem(title.trim());
      setTitle("");
    } else {
      setError("Title is required!");
    }
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addTitleTask();
    }
  };

  return (
    <>
      <InputWrapper>
        <TextField
          label={props.label}
          variant="standard"
          value={title}
          onChange={onTitleChange}
          onKeyPress={onKeyPressHandler}
        />
        <IconButton onClick={addTitleTask}>
          <AddTaskIcon stroke="orange" />
        </IconButton>
      </InputWrapper>
      {error && <p style={{ color: "red" }}> {error}</p>}
    </>
  );
};
