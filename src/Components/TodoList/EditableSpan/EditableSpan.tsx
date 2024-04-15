import { ChangeEvent, useState } from "react";
import { SpanInput } from "./EditableSpan.styled";

type EditableSpanPropsType = {
  title: string;
  onChange: (newTitle: string) => void;
};

export const EditableSpan = (props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <SpanInput
      type="text"
      value={title}
      onBlur={activateViewMode}
      autoFocus
      onChange={onChangeTitleHandler}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
};
