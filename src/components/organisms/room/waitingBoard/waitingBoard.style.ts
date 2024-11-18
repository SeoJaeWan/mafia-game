import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: ${toRem(600)};
`;

const WaitingPeople = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: ${toRem(10)};

  font-size: ${toRem(20)};
`;

const Url = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: ${toRem(60)};

  border: none;
  border-radius: ${toRem(5)};
  background-color: var(--gray-background-rgba);

  margin: ${toRem(10)} 0 ${toRem(20)};

  font-size: ${toRem(30)};
  cursor: pointer;
`;

interface IButtonCoverProps {
  $isActive?: boolean;
}

const ButtonCover = styled.div<IButtonCoverProps>`
  border-radius: ${toRem(5)};

  border: ${toRem(2)} solid
    ${(props) => (props.$isActive ? "#000" : "transparent")};
`;

const WaitingBoardStyle = {
  Container,
  Box,
  WaitingPeople,
  Url,
  ButtonCover,
};

export default WaitingBoardStyle;
