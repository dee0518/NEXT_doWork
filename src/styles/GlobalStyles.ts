import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyles = createGlobalStyle`
  ${normalize}

  * {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
  }

  html {
    font-family: 'Poppins', 'Noto Sans KR', sans-serif;
    font-size: 0.625em;
  }

  body {
    line-height: 1.2;

    &.hide {
      overflow: hidden;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1 {
    margin: 0;
  }
`;

export default GlobalStyles;
