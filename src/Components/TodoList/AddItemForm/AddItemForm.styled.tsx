import styled from "styled-components";

interface StyledInputProps {
  error: string | null;
}

export const StyledInput = styled.input<StyledInputProps>`
  border: ${(props) => (props.error ? "1px solid red" : "1px solid #ccc")};
  padding: 5px;
  margin-right: 10px;
`;
