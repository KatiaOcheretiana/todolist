import { Button } from "@mui/material";
import styled from "styled-components";

export const StyledButton = styled(Button)`
  opacity: ${(props) => (props.variant === "contained" ? 1 : 0.4)};
`;

export const TitleListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: space-between;
  margin-top: 15px;
  padding: 0 10px;

  @media screen and (min-width: 375px) {
    flex-direction: row;
  }
`;
