import styled from "styled-components";

interface ItemOfListProps {
  isdone: string;
}

export const CheckBoxTitle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
`;

export const ItemOfList = styled.li<ItemOfListProps>`
  opacity: ${(props) => props.isdone};
`;

export const TitleListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
