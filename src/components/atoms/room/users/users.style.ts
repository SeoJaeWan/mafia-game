import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  z-index: 2;

  height: 100%;
`;

const Button = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: var(--gray-background-rgba);
  border: 2px solid var(--gray-background-active-rgba);
  border-left: none;
`;

const Label = styled.span`
  display: inline-block;

  padding: 0 10px;

  font-size: ${toRem(16)};
  font-weight: 600;
`;

const Arrow = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  aspect-ratio: 1;

  background-color: var(--gray-background-active-rgba);
`;

interface IListProps {
  $height: string;
}

const List = styled.ul<IListProps>`
  position: absolute;
  top: 100%;
  left: 0;

  width: 100%;
  height: ${(props) => props.$height};
  max-height: calc(35px * 4);

  transition: height 0.3s ease-in-out;

  overflow-y: auto;
`;

const Item = styled.li`
  display: flex;
  align-items: center;

  height: 35px;

  padding: 0 10px;

  background-color: var(--gray-background-rgba);
  border-bottom: 2px solid var(--gray-background-active-rgba);
  border-right: 2px solid var(--gray-background-active-rgba);
`;

const UsersStyle = {
  Container,
  Button,
  Label,
  Arrow,
  List,
  Item,
};

export default UsersStyle;
