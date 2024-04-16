import { TextField } from "@mui/material";
import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InputStyle = styled(TextField)`
  width: 100%;
  @media screen and (min-width: 375px) {
    width: 300px;
  }
`;
