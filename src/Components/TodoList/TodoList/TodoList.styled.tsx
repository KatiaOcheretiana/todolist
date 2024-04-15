import { Button } from "@mui/material";
import styled from "styled-components";

interface StyledButtonProps {
  active: boolean;
}

export const StyledButton = styled(Button)<StyledButtonProps>`
  opacity: ${(props) => (props.active ? 1 : 0.4)};
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

export const TitleListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding: 0 10px;
`;
