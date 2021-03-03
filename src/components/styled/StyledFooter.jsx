import styled from "styled-components";

export const StyledFooter = styled.div`
footer {
    background-color: #272D2D;
    margin-top: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    flex-wrap: wrap;
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
    position:absolute;
    bottom: 0;
    height: fit-content;
    padding: 10px
}
.column {
    font-size: 12px;
}
`