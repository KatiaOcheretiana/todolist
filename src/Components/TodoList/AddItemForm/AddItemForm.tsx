import { ChangeEvent, KeyboardEvent, useState } from "react";
import { StyledInput } from "./AddItemForm.styled";

type AddItemFormProps = {
  addItem: (title: string) => void;
};

export const AddItemForm = (props: AddItemFormProps) => {
  const [title, setTitle] = useState("");

  const [error, setError] = useState<string | null>(null);

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
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
  );
};
