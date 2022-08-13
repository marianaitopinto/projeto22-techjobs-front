import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        text-decoration: none;
        border: none;
    }
    body{
        font-family: 'Open Sans', sans-serif;
        background-color: #ffffff;
        display: flex;
        justify-content: center;
    }
    button {
        cursor: pointer;
    }
`;

export default GlobalStyle;
