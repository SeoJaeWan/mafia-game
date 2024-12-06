import * as styled from "styled-components";

const Global = styled.createGlobalStyle`
  :root {
    --background: #ffffff;
    --foreground: #171717;
    --shadow: rgba(0, 0, 0, 0.1);
    --black: #000000;
    --white: #ffffff;
    --gray: #535c68;
    --red: #e84118;
    --gray-text: #84929c;
    --gray-background-rgba: rgba(236, 241, 247, 1);
    --gray-background-active-rgba: rgba(223, 228, 234, 1);

    --day-background-night: #2d3436;
    --day-background-morning: #ffffff;

    --breakpoint-mobile: 768px;
    --breakpoint-tablet: 1024px;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
  }

  body {
    color: var(--foreground);
    background: var(--background);

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    user-select: none;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;

    font-family: var(--font-pretendard);
  }

  a {
    color: inherit;
    text-decoration: none;

    transition: transform 0.3s;

    &:active {
      transform: scale(0.9);
    }
  }

  ul,
  ol {
    list-style: none;
  }

  button {
    transition: transform 0.2s;

    &:active {
      transform: scale(0.9);
    }
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
  }
`;

export default Global;
