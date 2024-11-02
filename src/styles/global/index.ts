import * as styled from "styled-components";

const Global = styled.createGlobalStyle`
  :root {
    --background: #ffffff;
    --foreground: #171717;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background: #0a0a0a;
      --foreground: #ededed;
    }
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
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
  }
`;

export default Global;
