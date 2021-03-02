import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
      margin: 0px;
      padding: 0px;
      box-sizing: border-box;
  }
  body {
    font-family: 'PT Sans Narrow', sans-serif;
      color:#FFF7EB;
      background-color:#272D2D;
      overflow-x: hidden;

  }
  a {
      text-decoration: none;
      color: #FFF7EB;
  }
  .container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

.second {
    display: flex;
    flex-direction: column;
    align-content: center;
} 
  `

//font-family: 'Orbitron', sans-serif;