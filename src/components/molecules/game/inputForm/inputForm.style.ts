import toRem from "@/styles/utils/toRem";
import styled from "styled-components";

const Container = styled.form`
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: ${toRem(5)};

  width: 100%;

  padding: 0 ${toRem(10)};
`;

const EmojiButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${toRem(30)};
  height: ${toRem(30)};

  background: none;
  border: 2px solid var(--gray-background-active-rgba);
  border-radius: ${toRem(5)};

  cursor: pointer;
`;

interface IEmojiBoxProps {
  show: boolean;
}

const EmojiBox = styled.div<IEmojiBoxProps>`
  position: absolute;
  top: ${toRem(-62)};
  right: ${toRem(10)};

  display: ${(props) => (props.show ? "flex" : "none")};
  flex-wrap: wrap;
  gap: ${toRem(5)};

  width: ${toRem(200)};
  height: ${toRem(50)};

  padding: ${toRem(10)};

  border: ${toRem(3)} solid var(--gray-background-active-rgba);
  border-radius: ${toRem(5)};

  background: var(--background);

  &::before {
    content: "";

    position: absolute;
    top: 100%;
    right: ${`calc(${toRem(48)} + ${toRem(5)} + ${toRem(4.5)})`};
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
    right: ${`calc(${toRem(48)} + ${toRem(5)} + ${toRem(0.5)})`};

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
