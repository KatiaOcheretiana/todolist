import React, { ChangeEvent, useState } from "react";

import { TextField, Typography } from "@mui/material";

type EditableSpanPropsType = {
  title: string;
  onChange: (newTitle: string) => void;
  element?: any;
};

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
  console.log("EditableSpan");

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
    <TextField
      size="small"
      color="warning"
      multiline
      type="text"
      value={title}
      onBlur={activateViewMode}
      autoFocus
      onChange={onChangeTitleHandler}
    />
  ) : (
    <Typography
      // variant="subtitle2"
      // component="h4"
      variant={props.element || "p"}
      onDoubleClick={activateEditMode}
    >
      {props.title}
    </Typography>
  );
});
