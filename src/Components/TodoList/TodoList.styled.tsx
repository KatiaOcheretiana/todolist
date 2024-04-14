import styled from "styled-components";
import { FilterValuesType } from "../../App";

interface StyledInputProps {
  error: string | null;
}

export const StyledInput = styled.input<StyledInputProps>`
  border: ${(props) => (props.error ? "1px solid red" : "1px solid #ccc")};
  padding: 5px;
  margin-right: 10px;
`;

interface StyledButtonProps {
  active: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${(props) => (props.active ? "blue" : "orange")};
  border: 1px solid ${(props) => (props.active ? "orange" : "blue")};
  color: white;
  padding: 5px 10px;
  margin-right: 10px;
`;

interface ItemOfListProps {
  isDone: boolean;
}

export const ItemOfList = styled.li<ItemOfListProps>`
  opacity: ${(props) => (props.isDone ? "0.4" : "1")};
`;
