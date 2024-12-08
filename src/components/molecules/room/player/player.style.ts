import toRem from "@/styles/utils/toRem";
import styled, { keyframes } from "styled-components";

const SelectorList = styled.ul`
  position: absolute;
  left: 50%;
  top: 10px;
  transform: translate(-50%, -100%);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

interface ColorProps {
  $color: string;
}

const SelectorName = styled.li<ColorProps>`
  font-size: ${toRem(14)};
  font-weight: 500;
  color: ${(props) => props.$color};

  &::before {
    content: "✔";
    margin-right: 3px;
  }
`;

const Container = styled.div`
  position: relative;

  display: flex;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: transparent;
  border: none;

  transition: transform 0.5s;
`;

interface MessageListProps {
  $isChatAble: boolean;
}

const MessageList = styled.ul<MessageListProps>`
  position: absolute;
  left: 15%;
  top: 0;
  transform: translateY(-100%);
  z-index: 6;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;

  width: 120%;

  visibility: ${(props) => (props.$isChatAble ? "visible" : "hidden")};
  opacity: ${(props) => (props.$isChatAble ? 1 : 0)};

  transition: visibility 0.5s, opacity 0.5s;
`;

const messagePop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50%);
  }

  30% {
    opacity: 1;
    transform: translateY(0);
  }

  70% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateY(-50%);
    visibility: hidden;
  }
`;

const Message = styled.li<ColorProps>`
  position: relative;
  padding: 10px;
  border-radius: 5px;

  width: 100%;
  color: var(--white);
  background-color: ${(props) => props.$color};

  text-align: left;
  font-size: ${toRem(14)};
  font-weight: 700;

  word-break: break-all;

  animation: ${messagePop} 5s linear forwards;

  &:last-child:before {
    content: "";

    position: absolute;
    bottom: 0;
    left: 10px;
    transform: translateY(85%) rotate(-20deg);

    z-index: 1;

    width: 0;
    height: 0;

    border-left: 6px solid transparent;
    border-right: 6px solid transparent;

    border-top: 12px solid ${(props) => props.$color};
  }

  &:last-child:after {
    content: "";

    position: absolute;
    bottom: 0;
    left: 10px;
    transform: translateY(85%) rotate(-20deg);

    width: 0;
    height: 0;

    border-left: 6px solid transparent;
    border-right: 6px solid transparent;

    border-top: 12px solid ${(props) => props.$color};
  }

  @media (max-width: 768px) {
    padding: 5px;

    font-size: ${toRem(12)};
  }
`;

export type PlayerStyleProps = ColorProps;

const PlayerStyle = {
  Container,
  MessageList,
  Message,
  SelectorList,
  SelectorName,
};

export default PlayerStyle;
