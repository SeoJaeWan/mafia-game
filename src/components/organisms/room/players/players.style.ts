import toRem from "@/styles/utils/toRem";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  min-height: 125px;

  background-color: var(--gray-background-active-rgba);

  @media (max-width: 1024px) {
    min-height: 100px;
    padding: 10px;
  }
`;

const Leave = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;

  width: 30px;
  height: 30px;

  background-image: url("/assets/room/close.svg");
  background-size: cover;
  background-position: center;

  &:hover {
    background-image: url("/assets/room/open.svg");
  }
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 15px;

  gap: 5px;
`;

const showItem = keyframes`
    to {
        transform: translateX(0);
        opacity: 1;
    }
`;

interface ItemProps {
  $color: string;
}

const Item = styled.li<ItemProps>`
  padding: 5px 10px 8px;

  background-color: ${(props) => props.$color};
  border-radius: 5px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);

  color: var(--white);
  font-size: ${toRem(18)};
  line-height: 1;

  opacity: 0;
  transform: translateX(20px);

  animation: ${showItem} 1s linear forwards;

  @media (max-width: 1024px) {
    font-size: ${toRem(16)};
    padding: 3px 8px 5px;
  }
`;

const PlayersStyle = {
  Container,
  Leave,
  List,
  Item,
};

export default PlayersStyle;
