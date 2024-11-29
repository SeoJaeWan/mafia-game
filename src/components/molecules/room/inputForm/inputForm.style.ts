import styled from "styled-components";

interface IContainer {
  $isChatAble: boolean;
}

const Container = styled.form<IContainer>`
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 5px;

  width: 100%;
  height: 100%;

  padding: 0 10px;

  background-color: ${(props) =>
    props.$isChatAble
      ? "var(--gray-background)"
      : "var(--gray-background-active-rgba)"};
`;

const EmojiButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;

  background: none;
  border: 2px solid var(--gray-background-active-rgba);
  border-radius: 5px;

  cursor: pointer;
`;

interface IEmojiBoxProps {
  $show: boolean;
}

const EmojiBox = styled.div<IEmojiBoxProps>`
  position: absolute;
  top: -62px;
  right: 10px;

  display: ${(props) => (props.$show ? "flex" : "none")};
  flex-wrap: wrap;
  gap: 5px;

  width: 200px;
  height: 50px;

  padding: 10px;

  border: 3px solid var(--gray-background-active-rgba);
  border-radius: 5px;

  background: var(--background);

  &::before {
    content: "";

    position: absolute;
    top: 100%;
    right: calc(48px + 5px + 4.5px);
    z-index: 1;

    width: 0;
    height: 0;

    border-left: 9px solid transparent;
    border-right: 9px solid transparent;

    border-top: 9px solid var(--background);
  }

  &::after {
    content: "";

    position: absolute;
    top: 100%;
    right: calc(48px + 5px + 0.5px);

    width: 0;
    height: 0;

    border-left: 13px solid transparent;
    border-right: 13px solid transparent;

    border-top: 13px solid var(--gray-background-active-rgba);
  }
`;

const InputFormStyle = {
  Container,
  EmojiButton,
  EmojiBox,
};

export default InputFormStyle;
