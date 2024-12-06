import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;

  top: 200px;
  left: 50%;
  transform: translateX(-50%);
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 600px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 10px;
  }
`;

const WaitingPeople = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;

  font-size: ${toRem(20)};
`;

const Url = styled.button`
  display: block;

  width: 100%;

  border: none;
  border-radius: 5px;
  background-color: var(--gray-background-rgba);

  margin: 10px 0 20px;
  padding: 15px 5px;

  font-size: ${toRem(30)};
  cursor: pointer;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;

  @media (max-width: 768px) {
    font-size: ${toRem(24)};
  }
`;

interface IButtonCoverProps {
  $isActive?: boolean;
}

const ButtonCover = styled.div<IButtonCoverProps>`
  border-radius: 5px;

  border: 2px solid
    ${(props) => (props.$isActive ? "var(--black)" : "transparent")};
`;

const InviteStyle = {
  Container,
  Box,
  WaitingPeople,
  Url,
  ButtonCover,
};

export default InviteStyle;
