import { css } from "@linaria/core";

export const globalStyle = css`
  :root {
    font-size: 62.5%;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  button,
  a {
    cursor: pointer;
  }

  body {
    width: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    max-height: none;
    margin: 0 auto;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #fffdfd;

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    button,
    span,
    strong {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }
`; 