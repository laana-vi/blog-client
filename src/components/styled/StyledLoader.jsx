import styled from "styled-components";

export const StyledLoader = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 margin-top:100px;

.bouncer{
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    width: 200px;
    height: 100px;
}
.bouncer div {
    width:30px;
    height: 30px;
    border-radius: 50%;
    animation: bouncer 0.7s ease infinite alternate;
}
.bouncer div:nth-child(1){
    background-color: #FFF7EB;
}
.bouncer div:nth-child(2){
    background-color: #CC883A;
    animation-delay: 0.1s
}
.bouncer div:nth-child(3){
    background-color: #A14016;
    animation-delay: 0.2s
}
.bouncer div:nth-child(4){
    background-color: #9b1e1e;
    animation-delay: 0.3s
}

@keyframes bouncer {
    from { transform: translateY(0)}
    to {transform: translateY(-100px)}
}

`