import styled from "styled-components";

export const StyledHeader = styled.div`
nav {
    border-bottom : 2px solid #A14016;
    max-height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.header-container {
    margin-bottom: 25px;
    margin-top: 15px;
    margin-left: 5px;
    margin-right: 5px;
    padding-bottom: 15px;
    background-color: transparent;

}
.pic {
    width: 150px;
    display: inline;
    margin-top: 10px;
}
.logout-button {
    border : none;
    background-color: transparent;
    vertical-align: middle;
   
}
.nav-links {
    display: flex;
    justify-content: space-around;
    width: 30%;
    
}
.item {
    color : #CC883A;
    font-family: 'Staatliches', cursive;
    font-size:  24px;
}
.nav-links:hover{
    cursor: pointer;
}
.nav-links li {
    list-style: none;
}
.burger div {
    width: 25px;
    height: 3px;
    border-radius: 10px;
    background-color:#CC883A;
    margin-top : 5px;
    vertical-align: middle;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1){
        transform : ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2){
        transform : ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
        opacity : ${({ open }) => open ? 0 : 1};
    }
    &:nth-child(3){
        transform : ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
}
.burger{
    display: none;
    cursor: pointer;
}
@media screen and (max-width: 760px){
    
    .nav-links {
        transform: ${({open}) => open ? 'translateX(0)': 'translateX(100%)'};
        position: fixed;
        height: 100%;
        width: 100%;
        top:70px;
        right: 0;
        background-color: rgba(161, 64, 22, 0.95);
        display:flex;
        flex-flow: column nowrap;
        align-items: center;
        transition: transform 0.3s ease-in-out;
    }
    .burger{
        display: block
    }
}


`