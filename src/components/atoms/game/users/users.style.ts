import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: ${toRem(35)};

  background-color: var(--gray-background-rgba);
  border: ${toRem(2)} solid var(--gray-background-active-rgba);
  border-left: none;
`;

const Label = styled.span`
  display: inline-block;

  padding: 0 ${toRem(10)};

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
  max-height: ${`calc(${toRem(35)} * 4)`};

  transition: height 0.3s ease-in-out;

  overflow-y: auto;
`;

const Item = styled.li`
  display: flex;
  align-items: center;

  height: ${toRem(35)};

  padding: 0 ${toRem(10)};

  background-color: var(--gray-background-rgba);
  border-bottom: ${toRem(2)} solid var(--gray-background-active-rgba);
  border-right: ${toRem(2)} solid var(--gray-background-active-rgba);
`;

const UsersStyle = {
  Button,
  Label,
  Arrow,
  List,
  Item,
};

export default UsersStyle;
