import styled, { createGlobalStyle } from "styled-components";
import "modern-normalize";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
  width: 100vw;
  overflow-x: hidden;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}
p,
h1,
h2,
h3,
ol,
ul,
fieldset,
input,
button,
textarea {
  margin: 0;
  padding: 0;
}

ol,
ul {
  list-style: none;
}

button {
  cursor: pointer;

}

img {
  display: block;
  max-width: 100%;
}


body {
  margin: 0 ;
   font-family: 'Roboto', sans-serif;
  color: black;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

`;

export const Container = styled.div`
  @media screen and (min-width: 320px) {
    width: 100%;
    padding: 0 20px;
    margin: 90px auto;
  }

  @media screen and (min-width: 375px) {
    width: 100%;
  }

  @media screen and (min-width: 768px) {
    /* width: 768px; */
    padding: 0 32px;
    margin: 120px auto;
  }

  @media screen and (min-width: 1440px) {
    width: 1440px;
    padding: 0 60px;
  }
`;
