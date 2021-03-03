import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
      margin: 0px;
      padding: 0px;
    
  }
  body {
      font-family: 'Open Sans', sans-serif;
      color:#FFF7EB;
      background-color:#272D2D;
      background-image: url('https://res.cloudinary.com/dpj7zvqzs/image/upload/v1614691067/media/background_ca9zr0.png');
      background-attachment: fixed;
      overflow-x: hidden;

  }
  a {
      text-decoration: none;
      color: #FFF7EB;
  }
  .container {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    
  }

.second {
    display: flex;
    flex-direction: column;
    align-content: center;
    margin-bottom:100px;
    padding: 15px;
} 
  `