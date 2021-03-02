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
        max-width: 800px;
        padding: 30px;
        background-color: #272D2D;
        height: 100%;
        margin-top: 100px;
        border-radius: 10px;
        box-sizing: border-box;
        box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
        flex-wrap: wrap;
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
        font-family: 'Open Sans', sans-serif;
        font-size: 15px;
        color: #272D2D;
        
    }
    .content {
        margin: 15px 0 15px 0;
        padding:5px;
        box-sizing: border-box;
        font-family: 'Open Sans', sans-serif;
        font-size: 17px;
        display: block;
        background-color: #FFF7EB;
        border-radius: 5px;
        border : none;
        color: #272D2D;
    }
    .label-item {
        color: #FFF7EB;
        font-weight: 500;
        font-size: 18px;
    }
    .populated {
        padding: 0px 0 15px 0;
    }
    h3 {
        text-align: center;
        color: #FFF7EB;
        font-weight: 500;
        font-size: 25px;
    }
    .date::-webkit-datetime-edit {
    color: transparent;
}
    .date:focus::-webkit-datetime-edit {
        color: #272D2D !important;
    }
    .button-item {
        text-align: center;
        color: #FFF7EB;
        border: 1px solid #FFF7EB;
        padding:5px 10px 5px 10px;
        border-radius: 5px;
        width: fit-content;
        font-size: 18px;
        background-color: transparent;
        font-family: 'Open Sans', sans-serif;
        font-weight: 500;
        transition: 0.3s;
        margin-left: auto;
    }
    .button-item:hover {
        background-color: #FFF7EB;
        color: #272D2D;

    }
    .additional{
        font-family: 'Open Sans', sans-serif;
        color: #FFF7EB;
        padding: 10px 10px 10px 0;
        font-size: 18px;
        font-weight: 500;
    }
    .additional:hover{
        color: #A14016;
    }
    .delete-account {
        text-align: center;
        font-family: 'Open Sans', sans-serif;
        font-size: 18px;
        font-weight: bolder;
        width: inherit;
        padding:4px;
        border-radius: 5px;
        background-color: transparent;
        border : 2px solid #9b1e1e;
        color: #9b1e1e;
        margin-top: 15px;
        transition: 0.3s;
    }
    .delete-account:hover {
        background-color:#9b1e1e;
        color: #ffd180;
    }
    .option-item{
        font-family: 'Open Sans', sans-serif;
        font-size: 18px;
        font-weight: bolder;
    }
    .option-item:hover{
        background-color: #272D2D;
        color: #FFF7EB;
    }
    .select{
        font-family: 'Open Sans', sans-serif;
        padding:0px;
        font-size: 18px;
        font-weight: bolder;
        color: #272D2D;
    }

    .custom-file-input::-webkit-file-upload-button {
    visibility: hidden;
    }
    .custom-file-input::before {
    content: 'SELECT IMAGE';
    display: inline;
    background-color: transparent;
    border: 1px solid #FFF7EB;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    font-weight: 500;
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
    font-weight: 500;
    color: #FFF7EB;
    border-radius: 5px;
    transition: 0.3s;
    }
    
    .custom-file-input:hover::before {
        background-color:#FFF7EB;
        color: #272D2D;

    }
    .img-input {
        display:none;
    }
`