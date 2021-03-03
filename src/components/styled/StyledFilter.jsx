import styled from "styled-components";

export const StyledFilter = styled.div`
    .filter {
        display: flex;
        align-content: flex-end;
        flex-direction: column;
        width: 100%;
        height: 100%;
        flex-wrap: wrap;
        margin-bottom: 50px;
    }
    .search {
        display: inline-block;
        height : 30px;
        width: 250px;
        background-color: #272D2D;
        border: none;
        border-bottom :2px solid #FFF7EB;
        margin: 10px 0 20px 0;
        padding: 10px;
        box-sizing: border-box;
        font-family: 'Open Sans', sans-serif;
        font-size: 18px;
        color: #FFF7EB;
    }
    .select{
        float: right;
        padding:0px;
        font-size: 18px;
        font-weight: 500;
        color: #272D2D;
        font-family: 'Open Sans', sans-serif;
        border-radius: 5px;
        border : none;
    }

`