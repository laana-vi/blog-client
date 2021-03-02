import styled from "styled-components";

export const StyledForm = styled.div`
display: flex;
justify-content: center;
align-items: center;
    .from-wrapper{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        max-width: 500px;
        padding: 30px;
        background: repeating-linear-gradient(
        -55deg,
        #f6ba52,
        #f6ba52 10px,
        #ffd180 10px,
        #ffd180 20px
        );
        
        border-radius: 10px;
        box-sizing: border-box;
        box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
    }
    .input-item {
        display: block;
        background-color: #FFF7EB;
        height : 30px;
        border-radius: 5px;
        border : none;
        margin: 10px 0 20px 0;
        padding: 10px;
        box-sizing: border-box;
        font-family: 'PT Sans Narrow', sans-serif;
        font-size: 15px;
    }
    .label-item {
        color: #272D2D;
        font-weight: 700;
        font-size: 15px;
    }
    h3 {
        text-align: center;
        color: #272D2D;
        font-weight: 700;
        font-size: 20px;
    }
    input[type=date]::-webkit-datetime-edit {
    color: transparent;
}
    input[type=date]:focus::-webkit-datetime-edit {
        color: #272D2D !important;
    }
    .button-item {
        text-align: center;
        color: #272D2D;
        border: 1px solid #272D2D;
        padding:4px;
        border-radius: 5px;
        width: fit-content;
        font-weight: 700;
        font-size: 15px;
        background-color: transparent;
        font-family: 'PT Sans Narrow', sans-serif;
        font-size: 15px;
        font-weight: 700;
    }
    .password-reset{
        font-family: 'PT Sans Narrow', sans-serif;
        color: #272D2D;
        padding: 10px 10px 10px 0;
        font-size: 15px;
        font-weight: 700;
    }
`