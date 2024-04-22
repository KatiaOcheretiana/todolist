import { action } from "@storybook/addon-actions";
import { EditableSpan } from "./EditableSpan";

export default {
  title: "EditableSpan Component",
  component: EditableSpan,
};

const callback = action("Value was changed");

export const EditableSpanBaseExample = (props: any) => {
  return <EditableSpan title="Start value" onChange={callback} />;
};
